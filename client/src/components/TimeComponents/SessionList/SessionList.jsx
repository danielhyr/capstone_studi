import "./SessionList.scss";

function SessionList(props) {
    return (
        <div className='sessionList'>
            <h2 className='sessionList__text'>
                {`${props.sessionAmount}`} sessions, {`${props.breakAmount}`}{" "}
                breaks
            </h2>
        </div>
    );
}

export default SessionList;
