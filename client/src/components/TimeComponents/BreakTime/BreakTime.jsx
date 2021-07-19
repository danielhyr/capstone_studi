import "./BreakTime.scss";

function BreakTime(props) {
    function decreaseCounter() {
        if (props.breakTime === 1) {
            return;
        }
        props.decreaseBreak();
    }

    function increaseCounter() {
        if (props.breakTime === 60) {
            return;
        }
        props.increaseBreak();
    }

    return (
        <section className='break'>
            <h3 className='break__title'>How long is your break going to be?</h3>
            <div className = "break-timer">
            <button
                className='break__button--left'
                onClick={decreaseCounter}
                disabled={props.isSession === true ? "disabled" : ""}
            >
                Down
            </button>
            <p className='break__timer'>{props.breakTime}</p>
            <button
                className='break__button--right'
                onClick={increaseCounter}
                disabled={props.isSession === true ? "disabled" : ""}
            >
                Up
            </button>
            </div>
        </section>
    );
}

export default BreakTime;
