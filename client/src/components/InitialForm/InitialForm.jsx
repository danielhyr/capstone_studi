import {useState} from 'react'
import CalendarModal from '../CalendarModal/CalendarModal';

function InitialForm(props) {

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
        <form className="input" onSubmit = {onSubmitHandler}>
        Do you feel motivated today(random array of string questions pull from backend every time)?
        <textarea className="input__field" name="create" required></textarea>
        <button >Start</button>
        
    </form>
    <CalendarModal show = {show} onSubmitHandler = {onCloseHandler} subject = {subject}/>
    </>
    )
}

export default InitialForm
