import axios from 'axios';

import React,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import Profile from '../profile/Profile'
import './VideoEditor.css';
import { getCurrentUser } from '../../util/APIUtils';


class VideoEditor extends Component  {

	constructor(props){  
		super(props); 
		console.log("Props:");
		console.log(this.props); 
		
		this.state = {

			// Initially, no file is selected
			selectedFile: null,
			filetype: null,
			videoType: 'profile',
			
			};
			this.onFileChange = this.onFileChange.bind(this);
			this.onFileUpload = this.onFileUpload.bind(this);
	  }  


	  
	// On file select (from the pop up)
	onFileChange = event => {

	// Update the state
	this.setState({ selectedFile: event.target.files[0]});
		
	};
	
	// On file upload (click the upload button)
	onFileUpload = async () => {

	try{

	

	
	// Create an object of formData
	const formData = new FormData();
	
	// Update the formData object
	formData.append('id',this.props.currentUser.id);
	//formData.append('pictureType',this.state.pictureType);
	formData.append('file',this.state.selectedFile);
	
	// Details of the uploaded file
	console.log(this.state.selectedFile);
	
	// Request made to the backend api
	// Send formData object
	const res = await axios.post("http://localhost:8080/user/me/uploadIntroVideo", formData);
	if(res.status === 200){
			
		console.log(res);
		window.location.href = "http://localhost:3000/profile";

	}
	}
	catch(err){
		console.log(`error: `, err)
	}
	};
	
	// File content to be displayed after
	// file upload is complete
	getProfileImage = () => {
		const formData = new FormData();

		formData.append('email', this.props.currentUser.email);

		console.log(axios.get("http://localhost:8080/user/getProfilePictureByEmail", formData));
	}

	getBase64(url) {
		return axios
		  .post(url, {
			responseType: 'arraybuffer'
		  })
		  .then(response => Buffer.from(response.data, 'binary').toString('base64'))
	}

	fileData = () => {

	if (this.state.selectedFile) {
		
		return (
		<div>
			<h2>File Details:</h2>
			
			<p>File Name: {this.state.selectedFile.name}</p>

			
			<p>File Type: {this.state.selectedFile.type}</p>

			<div>
			<img src={this.props.currentUser.imageUrl} alt={this.props.currentUser.name}/>
			</div>


		</div>
		);
	} else {
		return (
		<div>
			<br />
			<h4>Select a video to add as profile video</h4>
		</div>
		);
	}
    
	};

	render() {
		if(this.state.selectedFile!=null) {
			this.state.filetype= this.state.selectedFile.name.split('.').pop()
			console.log(this.state.filetype);
			console.log(this.props.currentUser);
		  }
	return (
		<div class="container">
			<h1>
			Upload New Profile Video
			</h1>
			

			
			






			<form name="upload" method="post" action="#" enctype="multipart/form-data" accept-charset="utf-8">
		<div class="row">
			<div class="col-md-6 col-md-offset-3 center">
				<div class="btn-container">
					
					<h1 class="imgupload"><FontAwesomeIcon icon={faFileImage}></FontAwesomeIcon></h1>
					<h1 class="imgupload ok"><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></h1>
					<h1 class="imgupload stop"><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></h1>
					
					<p id="namefile">Only Videos allowed! (MP4,MOV,WMV,AVI)</p>
					
					
					
					<input type="file" class="hidefile" onChange={this.onFileChange}/>

					
					
				</div>
			</div>
		</div>
			
		<div class="row">			
			<div class="col-md-12">
				
			
				<button type="button" class="btn btn-default" id="fakebtn" onClick={this.onFileUpload} >Submit! <i class="fa fa-minus-circle"></i></button>
				
				<input type="submit" value="Submit!" class="btn btn-primary" id="submitbtn"/>
			
				
				{ /*
					
					this.state.filetype === "jpeg" || this.state.filetype === "jpg" || this.state.filetype === "png" ? (
						<button type="button" class="btn btn-default" disabled="disabled" id="fakebtn" onClick={this.onFileUpload} >Submit! <i class="fa fa-minus-circle"></i></button>
					) : (
						<input type="submit" value="Submit!" class="btn btn-primary" id="submitbtn"/>
					)
					*/
				}
				
			
			</div>
		</div>
	</form>

	



		
		</div>
	);
	}
}

export default VideoEditor;