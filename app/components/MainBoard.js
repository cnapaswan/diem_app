import React from 'react'
import './MainBoard.scss'
import DaysCalculator from './DaysCalculator'
import BubbleBoard from './BubbleBoard'
import UserBoard from './UserBoard'
import LoginBoard from './LoginBoard'
import { calculateDaysLeft } from '../../lib/calculateDaysLeft'
// import { BrowserRouter, Route, Switch } from 'react-router-dom'

export default class MainBoard extends React.Component {
  constructor(props){
    super(props)
    this.onSwitch = this.onSwitch.bind(this)
    this.setIsLoading = this.setIsLoading.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateDob = this.updateDob.bind(this)
    this.updateGender = this.updateGender.bind(this)
    this.updateDaysLeft = this.updateDaysLeft.bind(this)
    this.updateUserData = this.updateUserData.bind(this)
    this.updateLoggedInUser = this.updateLoggedInUser.bind(this)
    this.onLogOutBtn = this.onLogOutBtn.bind(this)
    this.state = {
      view: "DaysCalculator",
      isLoading: false,
      dob: '',
      country: 'Afghanistan',
      gender: 'female',
      daysLeft: '',
      email:'',
      password:'',
      currentUser: null,
      currentUserId: '',
      currentUserRegDate: ''
    }
  }

  onSwitch(board){
    console.log("SWITCHING TO ", board)
    this.setState({
      view: board
    })
  }

  setIsLoading(status) {
    this.setState({
      isLoading: status
    })
  }

  updateDob(event) {
    console.log(event.target)
    this.setState({
      dob: event.target.value
    })
  }

  updateCountry(event){
    this.setState({
      country: event.target.value
    })
  }

  updateGender(event){
    this.setState({
      gender: event.target.dataset.value
    })
    console.log(event.target.value)
  }

  updateDaysLeft(){
    let { country, gender, dob } = this.state
    console.log(country, gender, dob)
    this.setState({
      daysLeft: calculateDaysLeft(country, gender, dob)
    })
    console.log(this.state.daysLeft)
  }

  updateUserData(email,password){
    this.setState({
      email: email,
      password: password
    })
  }

  updateLoggedInUser(userobj){
   this.setState({
      currentUser: userobj,
      currentUserId: userobj.id,
      currentUserRegDate: userobj.regdate,
      daysLeft: calculateDaysLeft(userobj.country, userobj.gender, userobj.dob)
    })
  }

  renderPage() {
    switch (this.state.view) {
      case 'DaysCalculator':
        return <DaysCalculator
                  data={this.state}
                  onSwitch={this.onSwitch}  
                  onDobChange={this.updateDob} 
                  onCountryChange={this.updateCountry}
                  onGenderChange={this.updateGender}
                  onButtonClick={this.updateDaysLeft}
                   />
      case 'BubbleBoard':
        return <BubbleBoard onSwitch={this.onSwitch}
                  data={this.state}
                  onRegBtnClick={this.updateUserData} />
      case 'UserBoard':
        return <UserBoard />
      case 'LoginBoard':
        return <LoginBoard 
                  onSwitch={this.onSwitch}
                  setUser={this.updateLoggedInUser} />
      default:
        return <DaysCalculator />
    }
  }

  onLogOutBtn(){
    this.setState({
      currentUser: null,
      view: 'DaysCalculator'
    })
  }

  renderLogout(){
    if (this.state.currentUser !== null){
      return <button
              className="btn__logout"
              onClick={this.onLogOutBtn}> log out </button>
    }

  }

  render() {
    return <div className="container__mainboard">
      {this.renderPage()}
      {this.renderLogout()}
    </div>
  }
}

