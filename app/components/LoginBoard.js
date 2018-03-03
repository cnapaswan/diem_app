import React from 'react'
import './LoginBoard.scss'

export default class LoginBoard extends React.Component {
  constructor(props){
    super(props)
    this.onLoginClick = this.onLoginClick.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.state={
      email: '',
      password: ''
    }
  }

  updateEmail(event){
    this.setState({
      email: event.target.value
    })
  }

  updatePassword(event){
    this.setState({
      password: event.target.value
    })
  }


  onLoginClick(){ 
    console.log("you clicked login btn")
    this.checkAuthenDb()
  }

  checkAuthenDb(){
    let localDomain = 'http://localhost:3000/login'
    let hostedDomain = 'not available yet'
    let data = {
      email: this.state.email,
      password: this.state.password
    }
    fetch(localDomain, {
      body: JSON.stringify(data), 
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(resJson => {
      if (resJson.status === "success"){
      console.log('Success:', resJson)
      this.props.setUser(resJson.user)
      this.props.onSwitch("BubbleBoard")
      } else {
        console.log(resJson.status)
      }
    })    
  }

  

  render(){
    return <div className="container__login">
      <h1>Hi, log in here</h1>
  
      <div className="container_login-input">
        <label className="label">Email</label>
        <input 
          type="text"
          onChange={this.updateEmail} />
        <label className="label">Password</label>
        <input 
          type="password"
          onChange={this.updatePassword} />
      </div>

      <button 
        onClick={this.onLoginClick}
        className="logtoserver">Log in</button>
    </div>
  }
}
