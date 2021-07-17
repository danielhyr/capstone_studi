import "./SessionTime.scss";

function SessionTime(props) {
    function decreaseCounter() {
        if (props.breakTime === 1) {
            return;
        }
        props.decreaseSession();
    }

    function increaseCounter() {
        if (props.breakTime === 60) {
            return;
        }
        props.increaseSession();
    }

    return (
        <section className='session'>
            <h3 className='session__title'>Coding Time!</h3>
            <button
                className='session__button--left'
                onClick={decreaseCounter}
                disabled={props.isSession === true ? "disabled" : ""}
            >
                Down
            </button>
            <p className='session__timer'>{props.sessionTime}</p>
            <button
                className='session__button--right'
                onClick={increaseCounter}
                disabled={props.isSession === true ? "disabled" : ""}
            >
                Up
            </button>
        </section>
    );
}

export default SessionTime;
