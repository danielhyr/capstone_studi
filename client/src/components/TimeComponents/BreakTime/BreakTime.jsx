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
            <h3 className='break__title'>Let's take a Break!</h3>
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
        </section>
    );
}

export default BreakTime;
