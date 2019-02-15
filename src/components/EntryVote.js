import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import "./carousel.min.css";
import Carousel from './Carousel';
import Signup from './Signup/signup';
import Facebook from './Facebook/Facebook';
import "./CarouselContainer.css";
import "./rating.css";
import $ from 'jquery';

class DefaultCarousel extends Component {

    componentDidMount(){

        let voteArray = [];
        $('.vote-site li').click( function(){
            let className = $(this).parent().attr('class').split(/\s+/);
            let rubricValue = className[1].replace("vote-","");
            if(rubricValue != "voteresult"){
                let score = $(this).html();
                localStorage.setItem(rubricValue, score);
                voteArray.push(score);
                console.log(localStorage.getItem(rubricValue));
                console.log("slide-" + rubricValue);
                console.log($('.slide-' + rubricValue));
            }
            
            if(rubricValue == 'content'){
                let avgScore = 0;
                console.log(voteArray);
                $.each(voteArray, function(value) {
                    console.log(value);
                    avgScore += parseInt(voteArray[value]);
                  });
                console.log(avgScore + "Dies ist das");
                avgScore = avgScore/voteArray.length;
                $('.slide-voteresult').html('<div class="step"><span>Voting result: </span><span>'+ avgScore + '</span></div>'); 
                $('.slide-voteresult').append('<h1>Do you want to signup now?</h1>' + ReactDOMServer.renderToString(<div><Signup></Signup><Facebook></Facebook></div>) + '<h1> Google Login</h1><a href="/auth/google"><button>Google Login</button></a>')
            }
            $('.slide-' + rubricValue).removeClass("active");
            $('.slide-' + rubricValue).next().addClass("active");

            
        }
        );
    }
    render() {
        return (
            <div>
                <div className="CarouselContainer">
                    <img src="https://media.giphy.com/media/10NI9u4qOWNdmw/giphy.gif" />
                </div>
                
                <div class="box-vote-site voting" data-opinions="[]">
    <div class="slides displayBlock">
    <div class="slide slide-design active">
<ul class="vote-site vote-design">
    <li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li>
</ul>
<div class="step">
    <span>Design</span>
    <span>1/4</span>
</div>
</div><div class="slide slide-usability">
<ul class="vote-site vote-usability">
    <li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li>
</ul>
<div class="step">
    <span>Usability</span>
    <span>2/4</span>
</div>
</div><div class="slide slide-creativity">
<ul class="vote-site vote-creativity">
    <li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li>
</ul>
<div class="step">
    <span>Creativity</span>
    <span>3/4</span>
</div>
</div><div class="slide slide-content">
<ul class="vote-site vote-content">
    <li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li>
</ul>
<div class="step">
    <span>Content</span>
    <span>4/4</span>
</div>
</div>
<div class="slide slide-voteresult">
<div class="step">
    
</div>
</div>


</div>
</div>
            </div>
        );
    }
}

export default DefaultCarousel;