import React from 'react'
import './BubbleBoard.scss'
import { getDateList } from '../../lib/getDateList'
import { format } from 'util';
import _ from 'lodash'
import Popover from 'react-simple-popover'

export default class BubbleBoard extends React.Component {
  constructor(props){
    super(props)
    // this.onSwitchProxy = this.onSwitchProxy.bind(this)
    this.handleRegClick = this.handleRegClick.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.onMoodSelect = this.onMoodSelect.bind(this)
    this.onHandlePopupClick = this.onHandlePopupClick.bind(this)
    this.onHandlePopupClose = this.onHandlePopupClose.bind(this)
    this.onNoteInptChange = this.onNoteInptChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onLifeTimeBtn = this.onLifeTimeBtn.bind(this)
    this.onWeekBtn = this.onWeekBtn.bind(this)
    this.onMonthBtn = this.onMonthBtn.bind(this)
    this.onYearBtn = this.onYearBtn.bind(this)
    this.state = {
      isShowRegister: true,
      email: '',
      password: '',
      userId: this.props.data.currentUserId,
      userRegDate: this.props.data.currentUserRegDate,
      PastBubbleData: [],
      presentMood: 'default-color',
      isPopupOpen: false,
      note: '',
      displayRangePast: 6,
      displayRangeFuture: 1,
      bubbleSize: 'large'
    }
  }

  componentDidMount() {
    this.getFilledBubbleJson()
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
  postToDb(){
    let {dob, country, gender} = this.props.data
    let localDomain = 'http://localhost:3000/users/new'
    let hostedDomain = 'https://diem-api.herokuapp.com/users/new'
    let data = {
      email: this.state.email,
      password: this.state.password,
      dob: dob,
      gender: gender,
      country: country
    }
    fetch(hostedDomain, {
      body: JSON.stringify(data), 
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => console.log('Success:', response));
  }

  handleRegClick(){
    let { email, password } = this.state
    this.props.onRegBtnClick(email,password)
    this.props.onSwitch('LoginBoard')
    this.postToDb()
  }

  getFilledBubbleJson(){
    console.log('userId', this.state.userId)
    let localDomain = 'http://localhost:3000/bubbles'
    let hostedDomain = 'https://diem-api.herokuapp.com/bubbles'
    let PastBubbleData = {id: this.state.userId}
      fetch(hostedDomain + '?id=' + this.state.userId)
        .then(res => res.json()) 
        .then(res => this.setState({ PastBubbleData: res }))
  }



  onMoodSelect(event){
    console.log("this.state.presentMood", this.state.presentMood)
    console.log(event)
    this.setState({
      presentMood: event.currentTarget.textContent
    })
  }

  // jw - 1
  onHandlePopupClick(e) {
    this.setState({ isPopupOpen: !this.state.open })
  }

  // jw - 2
  onHandlePopupClose(e) {
    console.log(this.refs)
    this.setState({ isPopupOpen: false })
  }

  onNoteInptChange(e){
    this.setState({
      note: e.target.value
    })
  }

  onSubmit(){
    let { presentMood, note } = this.state
    let localDomain = 'http://localhost:3000/bubble/new'
    let hostedDomain = 'https://diem-api.herokuapp.com/bubble/new'
    let today = new Date()
    let data = {
      fulldate: today,
      day: today.getDate(),
      month: today.getMonth()+1,
      year: today.getFullYear(),
      mood: this.state.presentMood,
      note: this.state.note,
      user_id: this.state.userId
    }
    fetch(hostedDomain, {
      body: JSON.stringify(data), 
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response =>{
        console.log('Success:', response)
        this.setState({
          isPopupOpen: false
        })
      });

  }

  renderRegisterBoard(){
    if (this.props.data.currentUser === null){
      return <div className="container__registerboard">
        <h1>register</h1>
        <div className="container_login-input">
          <label>E-mail</label>
          <input type = "text"
            onChange={this.updateEmail}/>
          <label>Password</label>
          <input type = "text"
            onChange={this.updatePassword}/>
        </div>
        <button
          className="logtoserver"
          onClick={this.handleRegClick}
        > Register </button>
      </div>
      }
    return null
  }

  renderPastBubbles(daysLimit){
    //get user regdate from data and formatted to pass in as startDate
    let defaultUserRegDate = this.state.userRegDate.split("T")
    let userRegDate = defaultUserRegDate[0]
    let regDateArr = userRegDate.split("-")
    let startDate = new Date(regDateArr[0], regDateArr[1]-1, regDateArr[2])
    //get the end date - yesterday of user present
    let yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    let datesList = getDateList(startDate,yesterday)
    let pastBubble = this.state.PastBubbleData
    
    var bubbleRows = []

    if (daysLimit == null) {
      daysLimit = datesList.length
    }
    let startingPoint = datesList.length - daysLimit

    startingPoint = startingPoint < 0 ? 0 : startingPoint
    
    for (let i = startingPoint ; i < datesList.length ; i++) {
      let defaultDate = []
      defaultDate.push(datesList[i].getFullYear())
      defaultDate.push(("0" + (datesList[i].getMonth()+1)).slice(-2)) 
      defaultDate.push(("0" + datesList[i].getDate()).slice(-2))

      let formattedDate = defaultDate.join("-")

      let matchFound = false;
      for(let j = 0 ; j < pastBubble.length ; j++){
        
        if(formattedDate === pastBubble[j].fulldate){
          console.log(formattedDate)
          console.log(pastBubble[j].fulldate)
          console.log("found matched bubble")
          bubbleRows.push(<div
                            key={i}
                            className={`${pastBubble[j].mood} bubble bubble__past`}
                            day={datesList[i].getDate()} 
                            month={datesList[i].getMonth()}
                            year={datesList[i].getFullYear()}
                            mood={pastBubble[j].mood}
                            note={pastBubble[j].note}
                          />)
          
          matchFound = true
          continue
        } 
      }
      if (!matchFound) {
        bubbleRows.push(<div 
                          key={i}
                          className="bubble bubble__missed--cross  bubble__past"
                          day={datesList[i].getDate()} 
                          month={datesList[i].getMonth()}
                          year={datesList[i].getFullYear()}
                          mood="none"
                          note="none"
                        />)
      }
    }
    return bubbleRows
  }

  renderPresentBubble(){
    var popstyle = {width: '130%'}
    return (
      <div>
        <div
          onClick={this.onHandlePopupClick}   
          className={`${this.state.presentMood} bubble `}
          mood={this.state.presentMood}
          note="none"
          ref="anchor"
        >
        </div>
        <Popover
          style={popstyle}
          placement='bottom'
          show={this.state.isPopupOpen}
          onHide={this.onHandlePopupClose}
          target={this.refs.anchor}
          container={this}
        >
          <div className="container__mood-opt">
            <div className="happy" onClick={this.onMoodSelect}><span>happy</span></div>
            <div className="peaceful" onClick={this.onMoodSelect}><span>peaceful</span></div>
            <div className="love" onClick={this.onMoodSelect}><span>love</span></div>
            <div className="magical" onClick={this.onMoodSelect}><span>magical</span></div>
            <div className="bored" onClick={this.onMoodSelect}><span>bored</span></div>
            <div className="sad" onClick={this.onMoodSelect}><span>sad</span></div>
            <div className="angry" onClick={this.onMoodSelect}><span>angry</span></div>
            <div className="headache" onClick={this.onMoodSelect}><span>headache</span></div>
            <div className="fear" onClick={this.onMoodSelect}><span>fear</span></div>
          </div>

          <div className="container__note-ipt">
            <label className="label__note">note</label>
            <input
              className="input__note" 
              type="text"
              onChange={this.onNoteInptChange} />
            <button
              onClick={this.onSubmit}>submit</button>
          </div>
        </Popover>
      </div>
      
    )
  }

  renderFutureBubbles(days) {
    let bubbleRows = []
    let daysLeft
    if (days != null){
      daysLeft = days
    } else {
      daysLeft = this.props.data.daysLeft
    }
    for(let i = 0; i < daysLeft ; i++){
      bubbleRows.push(<div 
                        key={i}
                        className="bubble bubble__future"
                      />)
    }
    return bubbleRows
  }

  onLifeTimeBtn(){this.setState({displayRangePast: null, displayRangeFuture: null, bubbleSize: 'small'})}
  onWeekBtn(){this.setState({displayRangePast: 6, displayRangeFuture: 0, bubbleSize: 'large'})}
  onMonthBtn(){this.setState({displayRangePast: 29, displayRangeFuture: 0, bubbleSize: 'large'})}
  onYearBtn(){this.setState({displayRangePast: 364, displayRangeFuture: 0, bubbleSize: 'small'})}

  render(){

    return <div className="container__bubbleboard">
      {this.renderRegisterBoard()}
      <nav className="nav__display-option">
        <a 
           onClick={this.onLifeTimeBtn}>life</a>
        <a onClick={this.onWeekBtn}>week</a>
        <a onClick={this.onMonthBtn}>month</a>
        <a onClick={this.onYearBtn}>year</a>
      </nav>
      <div className={`container__bubble--flex ${this.state.bubbleSize}`}>
        {this.renderPastBubbles(this.state.displayRangePast)}
        {this.renderPresentBubble()}
        {this.renderFutureBubbles(this.state.displayRangeFuture)}
      </div>
    </div>
  }
}