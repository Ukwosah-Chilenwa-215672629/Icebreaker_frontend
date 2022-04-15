import React, { Component, Button } from 'react';
import './Feed.css';

import AWS from 'aws-sdk';

function myCtrl($scope, $timeout) {
  AWS.config.update({
   
  });
  AWS.config.region = 'us-east-1';

  var bucket = new AWS.S3({ params: { Bucket: 'icebreakeraws' } });

  bucket.getObject({ Key: 'giphy.gif' }, function (err, file) {
    $timeout(function () {
      $scope.s3url = 'data:image/jpeg;base64,' + encode(file.Body);
    }, 1);
  });
}
function encode(data) {
  var str = data.reduce(function (a, b) {
    return a + String.fromCharCode(b);
  }, '');
  return btoa(str).replace(/.{76}(?=.)/g, '$&\n');
}

class Feed extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    const currentUser = this.props.currentUser.currentUser;
    return (
      <div className="feed">
        <div className="feedWrapper">
          <h3>My Introduction Video</h3>
        </div>
      </div>
    );
  }

}
export default Feed;
