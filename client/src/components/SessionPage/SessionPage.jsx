import './SessionPage.scss';
import { Component } from 'react'
import SessionTime from '../TimeComponents/SessionTime/SessionTime'
import TimerTime from '../TimeComponents/TimerTime/TimerTime'
import BreakTime from '../TimeComponents/BreakTime/BreakTime'
import HeroHeader from '../HeroHeader/HeroHeader';
import HeroFooter from '../HeroFooter/HeroFooter';
import StudentsOnline from '../TimeComponents/StudentsOnline/StudentsOnline'

class SessionPage extends Component {

  state = {
    breakTime: 4,
    sessionTime: 26,
    timerMinute: 26,
    sessionList: [],
    sessionAmount: 0,
    breakAmount: 0,
    currentQuote: { author: "Jon Barson, Web Dude", content: "You better switch to a Mac." },
    educator: {
      name: "Web Sensei Jon",
      image: "http://localhost:9000/jon.png"
    },
    isSession: false,
    amountTime: 5000,
    user : JSON.parse(localStorage.getItem('profile'))
  }



  increaseBreak = () => {
    this.setState((prevState) => {
      return {
        breakTime: prevState.breakTime + 1
      }
    })
  }

  decreaseBreak = () => {
    this.setState((prevState) => {
      return {
        breakTime: prevState.breakTime - 1
      }
    })
  }

  increaseSession = () => {
    this.setState((prevState) => {
      return {
        sessionTime: prevState.sessionTime + 1,
        timerMinute: prevState.sessionTime + 1

      }
    })
  }

  decreaseSession = () => {
    this.setState((prevState) => {
      return {
        sessionTime: prevState.sessionTime - 1,
        timerMinute: prevState.sessionTime - 1

      }
    })
  }

  onUpdateTimer = () => {
    this.setState((prevState) => {
      return {
        timerMinute: prevState.timerMinute - 1
      }
    })
  }

  onToggleInterval = (isSession) => {
    if (isSession) {
      this.setState((prevState) => {
        return {
          timerMinute: this.state.sessionTime,
          breakAmount: prevState.breakAmount + 1
        }

      }
      )

    } else {
      this.setState((prevState) => {
        return {
          timerMinute: this.state.breakTime,
          sessionAmount: prevState.sessionAmount + 1

        }
      })
    }
  }

  onResetTimer = () => {
    this.setState({
      timerMinute: this.state.sessionTime
    })
  }

  onPlayStopTime = (isSession) => {
    this.setState({
      isSession: isSession
    })
  }


  onSession = (session) => {
    this.setState({
      isSession: session
    })

  }


  render() {

    return (
      <>
      <HeroHeader/>
      <div className="root">
        <h1>Timer</h1>
      <StudentsOnline isSession={this.state.isSession}/>
    
        <div className="increments">
          <SessionTime
            sessionTime={this.state.sessionTime}
            increaseSession={this.increaseSession}
            decreaseSession={this.decreaseSession}
            isSession={this.state.isSession} />
          <BreakTime
            breakTime={this.state.breakTime}
            increaseBreak={this.increaseBreak}
            decreaseBreak={this.decreaseBreak}
            isSession={this.state.isSession}
          />

        </div>
        <div className="bottom">
          <TimerTime
            onSession={this.onSession}
            isSession={this.state.isSession}
            timerMinute={this.state.timerMinute}
            breakTime={this.state.breakTime}
            onUpdateTimer={this.onUpdateTimer}
            onToggleInterval={this.onToggleInterval}
            resetTimer={this.onResetTimer}
            stopTimer={this.onPlayStopTime}
          />
        </div>
        <button className="done" onClick = {() => this.props.history.push('/')}>Done!</button>
      </div>
            <HeroFooter/>
</>
      )
  }
}

export default SessionPage