import { useState } from 'react'
import CalendarModal from '../CalendarModal/CalendarModal';
import './InitialForm.scss'

function InitialForm() {

    const [show, setShow] = useState(false)
    const [subject, setSubject] = useState("asdf")

    const onSubmitHandler = (e) => {
        e.preventDefault()
        setShow(true)
        setSubject(e.target.create.value)
        e.target.create.value = ""
    }

    const onCloseHandler = (e) => {
        e.preventDefault()
        setShow(false)
    }

    return (
        <>
            <form className="standup" onSubmit={onSubmitHandler}>
                <div className="standup-type">
                    <textarea className="standup__field" name="create" required placeholder="What did you do yesterday, what will you do today, and what are your blockers?"></textarea>
                    <button className="standup__button">Start</button>
                </div>
            </form>
            <CalendarModal show={show} onSubmitHandler={onCloseHandler} subject={subject} />
        </>
    )
}

export default InitialForm
