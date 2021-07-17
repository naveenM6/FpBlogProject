import {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import ReactFileReader from 'react-file-reader';

import Header from '../Header'

import './index.css'

const fileTypes = ["json"];

export default class Upload extends Component {
  state = {errMsg: "", showErrorMsg: false,jsonData:[]}

  enteringDatabase = async () =>{
     const {jsonData} = this.state;
     for(let i=0; i<=jsonData.length; i++){
       console.log(jsonData[i]);
       const url = "http://localhost:3000/"
       const options = {
          headers:{
            "content-type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            id: jsonData[i].id,
            userId : jsonData[i].userId,
            title : jsonData[i].title,
            body : jsonData[i].body,
          })
       }
       const response = await fetch(url, options);
       console.log(response)
     }
  }

  handleFiles = files => {
    if (files && files[0]) 
    {
      const extension = files[0].name.split('.').pop().toLowerCase(),
          isSuccess = fileTypes.indexOf(extension) > -1;

      if (isSuccess) {
          const reader = new FileReader();
          reader.onload =  () => {
            const parsedData = JSON.parse(reader.result);
            this.setState({jsonData: parsedData})
            this.enteringDatabase()
          }
          reader.readAsText(files[0]);
      }
      else { 
        this.setState({errMsg: "Upload json File", showErrorMsg: true})
      }
   }
 }
        
    render(){
        const {showErrorMsg,errMsg} = this.state

        const jwtToken = Cookies.get('jwt_token')
        if (jwtToken === undefined) {
          return <Redirect to="/login" />
        }

        return (
            <div className="upload-container">
                <Header/>
                <div className="upload-sub-container">
                    <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.json'}>
                        <button className='btn'>Upload</button>
                    </ReactFileReader>
                    {showErrorMsg && <p className="error-message">*{errMsg}</p>}
                </div>
            </div>
        )
    }
}