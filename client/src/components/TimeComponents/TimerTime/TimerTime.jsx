import { Component } from "react";
import "./TimerTime.scss";
// import axios from "axios";

class TimerTime extends Component {
    state = {
        isSession: true,
        timerSecond: 0,
        intervalId: 0,
    };

    sessionDisplay = () => {
        if (this.state.isSession === true) {
            return "Coding Hard";
        } else {
            return "Breaking Hard";
        }
    };

    timerDisplay = () => {
        if (this.state.timerSecond === 0) {
            return "00";
        } else if (this.state.timerSecond < 10) {
            return "0" + this.state.timerSecond;
        } else {
            return this.state.timerSecond;
        }
    };

 
 
    decreaseTimer = () => {
        switch (this.state.timerSecond) {
            case 0:
                if (this.props.timerMinute === 0) {
                    if (this.state.isSession) {
                        this.setState({
                            isSession: false,
                        });
                        this.props.onSession(this.state.isSession)
                        this.props.onToggleInterval(this.state.isSession);
                    } else {
                        this.setState({
                            isSession: true,
                        });
                        this.props.onSession(this.state.isSession)
                        this.props.onToggleInterval(this.state.isSession);
                    }
                } else {
                    this.props.onUpdateTimer();
                    this.setState({
                        timerSecond: 59,
                    });
                }
                break;
            default:
                this.setState((prevState) => {
                    return {
                        timerSecond: prevState.timerSecond - 1,
                    };
                });
        }
    };

    startPlay = () => {
        let intervalId = setInterval(this.decreaseTimer, 1000)
        this.props.stopTimer(true)
        this.setState({
            intervalId: intervalId
        })
    }


    stopTimer = () => {
        clearInterval(this.state.intervalId);
        this.props.stopTimer(false);
        this.props.onSession(false)

    };

    resetTimer = () => {
        this.stopTimer();
        this.props.resetTimer();
        this.setState({
            timerSecond: 0,
            isSession: true,
        });
    };

    render() {
        return (
            <section className='timer'>
                <h4 className='timer__title'>{this.sessionDisplay()}</h4>
                <div className='timer__time'>
                    <span className='timer__time--text'>
                        {this.props.timerMinute}
                    </span>
                    <span className='timer__time--text'>:</span>
                    <span className='timer__time--text'>
                        {this.timerDisplay()}
                    </span>
                    <span className='timer__time--text'>{}</span>
                </div>
                <div className='timer__button-container'>
                    <button className='timer__button' onClick={this.startPlay} disabled={this.props.isSession === true ? "disabled" : ""}>
                        Start Your Session
                    </button>
                    <button className='timer__button' onClick={this.stopTimer}>
                        Get Some Rest...
                    </button>
                    <button className='timer__button' onClick={this.resetTimer}>
                        Refresh Timer
                    </button>
                </div>
            </section>
        );
    }
}

export default TimerTime;
