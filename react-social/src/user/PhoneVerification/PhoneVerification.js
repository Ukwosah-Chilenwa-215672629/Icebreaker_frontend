import React, { Component, useCallback, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './PhoneVerification.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import Dropzone from 'react-dropzone'


// function Basic(props) {
// 	const onDrop = useCallback((acceptedFiles) => {
// 		console.log(acceptedFiles)
// 		this.setState({selectedFile: acceptedFiles[0]})
// 	}, [])

// 	const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop, maxFiles:1});
	
// 	const files = acceptedFiles.map(file => (
// 	  <li key={file.path}>
// 		{file.path} - {file.size} bytes
// 	  </li>
// 	));
  
// 	return (
// 	  <section className="container">
// 		<div class="col-md-6 col-md-offset-3 center">
// 			<div class="btn-container">
// 				<div {...getRootProps({className: 'dropzone'})}>
// 					<h1 class="imgupload"><FontAwesomeIcon icon={faFileImage}></FontAwesomeIcon></h1>
// 					<h1 class="imgupload ok"><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></h1>
// 					<h1 class="imgupload stop"><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></h1>
						
// 					<p id="namefile">Only pics allowed! (jpg,jpeg,png)</p>	
// 					<input {...getInputProps()} />
// 					<p>Drag 'n' drop some files here, or click to select files</p>
// 					<aside>
// 					<h4>Files</h4>
// 					<ul>{files}</ul>
// 					</aside>
// 				</div>
// 			</div>
// 		</div>
// 	  </section>
// 	);
//   }

class PhoneVerification extends Component {

  constructor(props){  
		super(props); 
		console.log("Props:");
		console.log(this.props); 
		
		this.state = {

			// Initially, no file is selected
			selectedFile: null,
			filetype: null,
			pictureType: 'profile',
			
			};
			
			this.onFileUpload = this.onFileUpload.bind(this);
      		this.onFileChange = this.onFileChange.bind(this);
	  } 
    
  
    displayPhotoItem = () =>{
    
        // axios call to server
        console.log(this.props.currentUser.id)
        const userId = { id: this.props.currentUser.id }
		
		const {res} = axios.get("http://localhost:8080/user/me/requestVerification", {
            params: {
              id: this.props.currentUser.id
            }
          }).then(res => {
            
            console.log(res)
          })
		
		
     
      }

      onFileChange = event => {

        // Update the state
        this.setState({ selectedFile: event.target.files[0]});
          
        };
        

    onFileUpload = () => {
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
		axios.post("http://localhost:8080/user/me/uploadVerifyPhoto", formData);
	};

  render() {
    return (
      <div>
          Phone Verification System

                
           
			<form name="upload" method="post" action="#" enctype="multipart/form-data" accept-charset="utf-8">
		<div class="row">
			<section className="container">
			<div class="col-md-6 col-md-offset-3 center">
				<div class="btn-container">
					<Dropzone onDrop={acceptedFiles => this.setState({ selectedFile: acceptedFiles[0]})}>
						{({ getRootProps, getInputProps }) => (
							<section>
								<div {...getRootProps()}>
								<h1 class="imgupload"><FontAwesomeIcon icon={faFileImage}></FontAwesomeIcon></h1>
								<h1 class="imgupload ok"><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></h1>
								<h1 class="imgupload stop"><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></h1>
								<p id="namefile">Only pics allowed! (jpg,jpeg,png)</p>
								<input {...getInputProps()} />
								<p>Drag 'n' drop some files here, or click to select files</p>
								</div>
							</section>
						)}
					</Dropzone>
				</div>
			</div>
		</section>
		{/*
			<Basic/>

			<div class="col-md-6 col-md-offset-3 center">
				<div class="btn-container">
					<h1 class="imgupload"><FontAwesomeIcon icon={faFileImage}></FontAwesomeIcon></h1>
					<h1 class="imgupload ok"><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></h1>
					<h1 class="imgupload stop"><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></h1>
					
					<p id="namefile">Only pics allowed! (jpg,jpeg,png)</p>	
					
					<input type="file" class="hidefile" onChange={this.onFileChange} accept="image/png, image/jpeg, image/jpg"/>
					
				</div>
			</div>
		 */}

		 
		</div>
			
		<div class="row">			
			<div class="col-md-6 col-md-offset-3 center">
				
			
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


                
                <div class="col-md-6 col-md-offset-3 center"> 
                  <button onClick={this.displayPhotoItem} className="btn-style">
                   
                    <span className="text-colour"> Display PhotoItem  </span>
                  </button>
				</div> 
                

        
    </div>
    );
  }
}

export default PhoneVerification;
