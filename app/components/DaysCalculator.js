import React from 'react'
import './DaysCalculator.scss'
import { getCountryList, getLifeData } from '../../lib/getCountryList'
// import $ from 'jquery'

export default class DaysCalculator extends React.Component {
  constructor(props){
    super(props)
    this.handleGetdaysBtn = this.handleGetdaysBtn.bind(this)
    this.onLoginClick = this.onLoginClick.bind(this)
    this.state = {
      logindp: ''
    }
  }

  handleGetdaysBtn(){
    this.props.onButtonClick()
    this.props.onSwitch('BubbleBoard')
  }


  onLoginClick(){
    this.setState({
      logindp: 'hide'
    })
    this.props.onSwitch('LoginBoard')
  }

  render() {
    console.log(this.props)
    let { dob, country, gender } = this.props.data
    return <div className="container__dayscalculator">
      <h1> Calculate your days left </h1>

      <label className="label">origin</label>
      <select value={country}
        onChange={this.props.onCountryChange}>
        {getCountryList().sort().map(function(c, i) {
          return (<option key={i} value={c}>{c}</option>)
        })}  
      </select>
      
      <label className="label">sex</label>
      <div className="container__gender-opt">
        <a
          href="#fm" 
          id="fm"
          onClick={this.props.onGenderChange}
          data-value="female">
          ♀
        </a>
        <a 
          href="#m"
          id="m"
          onClick={this.props.onGenderChange}
          data-value="male">
          ♂
        </a>
      </div>
      
      <label className="label">date of birth</label>
      <input 
        className="datepicker"
        type="date" 
        value={dob} 
        onChange={this.props.onDobChange} />
  
      <button 
        onClick={this.handleGetdaysBtn}
        className="btn__getdays"
      >
        get days
      </button>

      <button
        className={`${this.state.logindp} btn__login`}
        onClick={this.onLoginClick}>
        Login  {this.state.logindp}
      </button>
    </div>
  }
}

