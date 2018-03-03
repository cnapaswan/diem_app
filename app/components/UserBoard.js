import React from 'react'
import './UserBoard.scss'

export default class UserBoard extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return <div className="container__user">
      <h1>I'm user board</h1>
    </div>
  }
}
