// import React from "react";
// import axios from "axios";

// const axios = require('axios');
// origin = "http://localhost:8080";

// axios.post('/user/me/createInterest', {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

//   async handleChange = event => {
//     await this.setState({ [event.target.name]: event.target.value });
// } 


// handleSubmit = e => {
//     e.preventDefault();
//     const data = {
//             name: this.state.name
//       };
//     axios({
//       method: "post",
//       url: `http://localhost:8080/teams`,
//       data
//     })
//       .then(res => {
//         this.setState({
//            name: '',
//         }); 
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }