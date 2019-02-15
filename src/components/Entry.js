import React from 'react';
import './Entry.css';

class Entry extends React.Component {
    componentDidMount(){
        let link = document.createElement("link");
        link.href = "//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css";
        link.rel = "stylesheet";
        document.head.appendChild(link);
        

    }
    render(){
        return(<div><div class="panel panel-default">
        <div class="panel-heading"><strong>Upload Submission</strong> for entry</div>
        <div class="panel-body">
          <h4>Select files from your computer</h4>
          <form action="" method="post"  id="js-upload-form">
            <div class="form-inline">
              <div class="form-group">
                <input type="file" name="files[]" id="js-upload-files" multiple></input>
              </div>
              <button type="submit" class="btn btn-sm btn-primary" id="js-upload-submit">Upload files</button>
            </div>
          </form>

          <h4>Or drag and drop files below</h4>
          <div class="upload-drop-zone" id="drop-zone">
            Just drag and drop files here
          </div>

          <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
              <span class="sr-only">60% Complete</span>
            </div>
          </div>

          <div class="js-upload-finished">
            <h3>Processed files</h3>
            <div class="list-group">
            </div>
          </div>
        </div>
        
      </div>
      </div>);
    }
}

export default Entry;