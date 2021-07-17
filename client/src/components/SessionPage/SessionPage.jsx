import './SessionPage.scss';
import { Component } from 'react'
import SessionTime from '../TimeComponents/SessionTime/SessionTime'
import TimerTime from '../TimeComponents/TimerTime/TimerTime'
import BreakTime from '../TimeComponents/BreakTime/BreakTime'
import SessionList from '../TimeComponents/SessionList/SessionList'
import DisplayQuotes from '../TimeComponents/DisplayQuotes/DisplayQuotes';
import HeroHeader from '../HeroHeader/HeroHeader';
import HeroFooter from '../HeroFooter/HeroFooter';

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

  // currens session

  onSession = (session) => {
    this.setState({
      isSession: session
    })

  }

  // Faces

 

  componentDidUpdate(prevProps, prevState) {

    if (this.state.timerMinute === this.state.sessionTime && this.state.currentQuote.author === "Jon Barson, Web Dude" && this.state.isSession === true) {
    

      console.log("hello")
    }
  }

  render() {

    return (
      <>
      <HeroHeader/>
      <div className="root">
        <div className="Educators">
          <div>
          <h1 className="root__h1">You are in Session for </h1>
          <SessionList sessionAmount={this.state.sessionAmount} breakAmount={this.state.breakAmount} />
          </div>

        </div>
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
      </div>
            <HeroFooter/>
</>
      )
  }
}

export default SessionPage