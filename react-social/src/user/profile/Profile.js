import React, { Component, Button } from 'react';
import './Profile.css';
import './Feed.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import AWS from 'aws-sdk';
import { PHOTO_URLS } from '../../constants';
import ReactPlayer from 'react-player';
import Sidebar from '../profile/Sidebar';
import Feed from '../profile/Feed';
import Rightbar from './Rightbar';

function myCtrl($scope, $timeout) {
  AWS.config.update({
    accessKeyId: 'AKIA6I3AYWB5IO4JYEHS',
    secretAccessKey: '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',
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

class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    const currentUser = this.props.currentUser;
    return (
      <div
        style={{
          backgroundColor: '#F8F8F8',
        }}
      >
        <div className="profile">
          <Sidebar />
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                {this.props.currentUser.imageUrl ? (
                  <div class="profileCoverImg">
                    <img
                      class="profileCoverImg"
                      src={
                        'https://icebreakeraws.s3.amazonaws.com/IceBreakerPhotos/' +
                        this.props.currentUser.id +
                        'cvrphoto'
                      }
                    />
                    <Link to="/CoverPhotoEditor">
                      <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                    </Link>
                  </div>
                ) : (
                  <div className="text-avatar">
                    <span>
                      {this.props.currentUser.name &&
                        this.props.currentUser.name[0]}
                    </span>
                  </div>
                )}
                <div className="">
                  {this.props.currentUser.imageUrl ? (
                    <div>
                      <img
                        class="profileUserImg"
                        src={
                          'https://icebreakeraws.s3.amazonaws.com/IceBreakerPhotos/' +
                          this.props.currentUser.id +
                          'Photo'
                        }
                      />
                      <Link to="/ImageEditor">
                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                      </Link>
                    </div>
                  ) : (
                    <div className="text-avatar">
                      <span>
                        {this.props.currentUser.name &&
                          this.props.currentUser.name[0]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="profileInfo">
                <h2 className="profileInfoName">
                  {' '}
                  {this.props.currentUser.name}
                </h2>
              </div>
            </div>
            <Rightbar />
            <h4 className="profile-video">My Introduction Video</h4>
            <div className="profile-video">
              {this.props.currentUser.imageUrl ? (
                <div>
                  <ReactPlayer
                    width="480px"
                    height="240px"
                    controls
                    url={
                      'https://icebreakeraws.s3.amazonaws.com/IceBreakerVideos/' +
                      this.props.currentUser.id +
                      'Video'
                    }
                  />
                </div>
              ) : (
                <div className="text-avatar">
                  <span>
                    {this.props.currentUser.name &&
                      this.props.currentUser.name[0]}
                  </span>
                </div>
              )}
            </div>
            <div className="profileRightBottom"></div>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
