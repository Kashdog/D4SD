import path from 'path';
import fs from 'fs';
import _ from 'underscore';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, Router, Route, Switch } from 'react-router-dom'
import crypto              from 'crypto';
import nodemailer from 'nodemailer';
import passport from 'passport';
import cors  from 'cors';
import session from 'express-session';
import cookieParser  from 'cookie-parser';
import bodyParser   from 'body-parser';
const FacebookStrategy    = require('passport-facebook').Strategy;
const LocalStrategy       = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const uploadfile = require('./uploadfile');
const searchuser = require('./searchuser');


import App from '../src/App';

const PORT = process.env.PORT || 3000;
const app = express();

app.use('/api/uploadfile', uploadfile);

// Body Parser and Cookie Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/api/searchuser', searchuser);
app.use(session({
  path: "/",
  secret: "feanarocurufinweartanaroereiniongilgalad",
  saveUninitialized:true,
  resave:true,
  cookie:{secure:false, httpOnly:true, maxAge:86400000},
}));

/** PASSPORT TODO MOVE TO ANOTHER FILE */

app.use(passport.initialize());
app.use(passport.session());

/** Database configuration  */
/** TODO separate into a new file */
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'kashdog',
  host: 'localhost',
  database: 'api',
  password: 'bPCs40260$#',
  port: 5432,
})




passport.use('local-login', new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
},
async function(req, email, password, done) { // callback with email and password from our form

  // find a user whose email is the same as the forms email
  // we are checking to see if the user trying to login already exists
  await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2 AND active = true', [email, hashPassword(email, password)], (err, results) => {
    if (err) { return done(err); }
    if(results.rows.length > 0){
      const user = results.rows[0];
      //res.status(201).send(`FB User with email ${emails[0].value} logged in`);
      return done(null, user);
    }
    else{
        return done (null, false);
    }
  });

}));



// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: '211429358051-4kaq7m4rnm6dghea3bnjo4b9llhuarlq.apps.googleusercontent.com',
    clientSecret: 'onE1iuNWipz7L4kT0pn4I_p-',
    callbackURL: "https://48eda144.ngrok.io/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile.emails[0].value);
    console.log("email");
    const email = profile.emails[0].value;
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
      if (error) {
        throw error
      }
      if(results.rows.length > 0){
        const fbUser = results.rows[0];
        console.log(fbUser);
        //res.status(201).send(`FB User with email ${emails[0].value} logged in`);
        return done(null, fbUser);
      }
      else{
        pool.query('INSERT INTO users (email, active, created_on  ) VALUES ($1, true, $2)',
            [email, new Date()],
            (error, results) => {
          if (error) {
            throw error
          }
          const user = results.rows[0]
          console.log(user);
          //res.status(201).send(`FB User with email ${emails[0].value} created and logged in`);
          return done(null, user);
        })  
      }
    });
  }
));

passport.use(
  new FacebookStrategy(
    {
      clientID: '316349652559286',
      clientSecret: 'f87c7b2d0ca1a5892ebd8581d1fa5b43',
      callbackURL: 'https://48eda144.ngrok.io/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'email', 'birthday', 'friends', 'first_name', 'last_name', 'middle_name', 'gender', 'link']
    },
    async (accessToken, refreshToken, profile, done) => {
      // 2 cases
      // #1 first time login
      // #2 other times
      const { id, displayName, emails } = profile;


      pool.query('SELECT * FROM users WHERE email = $1', [emails[0].value], (error, results) => {
        if (error) {
          throw error
        }
        if(results.rows.length > 0){
          const fbUser = results.rows[0];
          console.log(fbUser);
          //res.status(201).send(`FB User with email ${emails[0].value} logged in`);
          return done(null, fbUser);
        }
        else{
          pool.query('INSERT INTO users (email, active, created_on  ) VALUES ($1, true, $2)',
              [emails[0].value,new Date()],
              (error, results) => {
            if (error) {
              throw error
            }
            const user = results.rows[0]
            console.log(user);
            //res.status(201).send(`FB User with email ${emails[0].value} created and logged in`);
            return done(null, user);
          })  
        }
      });
      
    },
  ),
);

passport.serializeUser((user, done) => {
  console.log(user.email);
  done(null, user.email);
})

passport.deserializeUser((user, done) => {
  return done(null, user);
})


var stripe = require("stripe")("sk_test_IQAVRe3EpYUULHqLCwyjK4hI");

app.post("/api/pay", function(req, res) {
    // Token is created using Checkout or Elements!
  // Get the payment token ID submitted by the form:
    console.log(req.body);
    const token = req.body.token; // Using Express
    console.log(token);

    const charge = stripe.charges.create({
      amount: req.body.amount,
      currency: 'usd',
      description: 'Example charge',
      source: 'tok_visa',
    });

    res.status(201).send(`${req.body.amount} payed`);
});



app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.post('/api/login',
  passport.authenticate('local-login'), function(req, res) {
  req.session.save(function() {
    if(req.session.passport.user){
      res.json({"status": "success"});
    }else{
      res.json({"status": "failure"});
    }
  });
                                      });

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login',
  'https://www.googleapis.com/auth/userinfo.email'] }));

  app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/flogin', passport.authenticate('facebook', { scope: ['email'] }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook'), function(req, res) {
  console.log(req.user); console.log("aneesh in polish");
  console.log(req.user.email);console.log(req.session); req.session.email = req.user.email;
  console.log(req.user.email);
  req.session.save(function() {
    if(req.session.passport.user){
      res.redirect("/");
    }else{
      res.json({"status": "failure"});
    }
  }); 
                                      });



app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'Steven', lastName: 'Dow', message: 'Did you find this easter egg?'},
  ];

  res.json(customers);
});

app.get('/api/loggedinstatus', (req, res) => {
  console.log("logged in or no");
  console.log(req.user);
  console.log(req.session.email);
  console.log(req.session);
  res.json(req.user);
  
  
});

app.post('/api/signup', (req, res) => {
  console.log(req.body.user.email);
  const email = req.body.user.email;
  const password = req.body.user.password;
  const token = hashPassword(password, email);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aneeshkashalikar@gmail.com',
      pass: 'feanarocurufinwe40260$#'
    }
  });
  var mailOptions = {
      from: 'aneeshkashalikar@gmail.com',
      to: email,
      subject: 'Activate your account on D4SD',
      html: `<p>Activate your D4SD account <a href="https://932b0b2d.ngrok.io/activation/${token}"`  + '">here</a></p>'
  };
  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
  });
  pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
    if (error) {
      throw error
    }
    if(results.rows.length > 0){
      res.status(201).send('Email already exists');
    }
    else{
      pool.query('INSERT INTO users (email, password, active, token, created_on  ) VALUES ($1, $2, false, $3, $4)',
          [email,
          hashPassword(email, password), token, new Date()],
          (error, results) => {
        if (error) {
          throw error
        }
        console.log(results);
        res.status(201).send(`User added with ID: ${results.insertId}`)
      })  
    }
  });
});

app.get('/api/activation/:token', (req, res) => {
  pool.query('SELECT * FROM users WHERE token = $1 AND active = false;', [req.params.token], (error, results) => {
      if (error) {
        throw error
      }
      if(results.rows.length > 0){
        pool.query('UPDATE users SET active = true WHERE token = $1;', [results.rows[0].token], (error, results) => {
          if (error) {
            throw error
          }
          console.log("User Account activated");
        });
        res.json([{
          message: "Your account has been activated."
        }]);
      }
      else {
        console.log("Activation Link is invalid");
        res.json([{
          message: "This activation link is inactive"
        }]);
      }
  }) 
});



function hashPassword(username, password) {
  var s = username + ':' + password;
  return crypto.createHash('sha256').update(s).digest('hex');
}


app.use(express.static('./build'));

app.get('/#_=_', (req, res) => {
  console.log("extra");
  res.redirect("/");
});

app.get('/*', (req, res) => {
  const context = {};
  console.log(req.url);
  const app = ReactDOMServer.renderToString(
  <StaticRouter location={req.url} context={context}>
    <App />
  </StaticRouter>);

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

// Socket IO

let connections = [];
let title = 'Untitled Entry';
let audience = [];

const server = app.listen(PORT);
const io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {

  socket.once('disconnect', function() {
    
    var member = _.findWhere(audience, { id: this.id });

    if(member){
      audience.splice(audience.indexOf(member),1);
      io.sockets.emit('audience', audience);
      console.log(`Left ${member.name} (${audience.length} members)`)
    }
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log("Disconnected: %s sockets remaining.", connections.length);
  });

  connections.push(socket);

  socket.on('join', function(payload) {
    var newMember = {
      id: this.id,
      name: payload.name
    };
    this.emit('joined', newMember);
    audience.push(newMember);
    io.sockets.emit('audience', audience);
    console.log(`Audience Joined: ${payload.name}`)
  });
  socket.emit('welcome', {
		title: title
  });
  
  console.log("Connected: %s sockets connected", connections.length);
});
console.log(`😎 Server is listening on port ${PORT}`);



