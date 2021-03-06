import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import './CalendarModal.scss'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts'
import close from '../../data/Icons/close-24px.svg'
import * as api from '../../api/index'


function CalendarModal(props) {
const loguser = JSON.parse(localStorage.getItem('profile'))
  const [user, setUser] = useState();
  const dispatch = useDispatch()

  const [inputField, setInputField] = useState({
    checked: false,
    title: props.subject,
    timestamp: null,
    schedule: [
      {
        id: uuidv4(), time: '', activity: '', checked: false,
      },

    ]
  })


  
  useEffect(async () => {
    try {
      const res = await api.getSingleUser(loguser.result._id)
      console.log(res)
      setUser(res.data)
    } catch (error) {
      console.log(error)
    }
  }, [])





  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmitHandler(e)
    const newInputFields = {
      ...inputField,
      name: user?.name, timestamp: Date.now(), image: user?.image, title: props.subject, creator: loguser?.result._id,
      schedule: inputField.schedule.map(field => {
        return field;
      })
    }
    setInputField(newInputFields)
    dispatch(createPost(newInputFields))
  };

  const handleAddFields = (e) => {
    e.preventDefault()
    const newInputFields = { ...inputField, schedule: [...inputField.schedule, { id: uuidv4(), time: '', activity: '', checked: false }] }
    setInputField({ ...newInputFields })
  }

  const handleChangeInput = (id, event) => {
    const newInputFields = {
      ...inputField, schedule: inputField.schedule.map(field => {
        if (id === field.id) {
          field[event.target.name] = event.target.value
        }
        return field;
      })
    }
    setInputField(newInputFields);
  }


  const handleRemoveFields = (id, e) => {
    e.preventDefault()
    const values = [...inputField.schedule];
    values.splice(values.findIndex(value => value.id === id), 1);
    const newInputFields = {
      ...inputField,
      schedule: values
    }
    setInputField(newInputFields);

  }


  if (!props.show) {
    return null
  }

  if (!user?.name) {
    return (
      <div>
        <h6> Please Sign In to share your schedules with others!</h6>
      </div>
    )
  }

  return (
    <>
      <section className="schedule">
        <form className="schedule-form" onSubmit={handleSubmit}>
          <img onClick={(e) => props.onSubmitHandler(e)
          } className="schedule__closer" src={close} alt="closing icon x mark" />

          <h1 className="schedule__header"> Create your Schedule</h1>

          <button className="schedule__add" onClick={handleAddFields}>+</button>
          {inputField.schedule.map((inputField, index) => (
            <div key={index} className="cinputs">
              <div>
                <TextField
                  name="time"
                  label="Time"
                  variant="filled"
                  value={inputField.time}
                  onChange={event => handleChangeInput(inputField.id, event)}
                  required

                /></div>
              <div className="cinputs__activityField">
                <TextField
                  name="activity"
                  label="Activity"
                  variant="filled"
                  value={inputField.activity}
                  onChange={event => handleChangeInput(inputField.id, event)}
                  required
                />
              </div>
              <div>
                <button className="cinputs__remove" onClick={(event) => handleRemoveFields(inputField.id, event)}>Remove</button>

              </div>
            </div>
          ))}
          <button className="schedule__submit" >Submit</button>
        </form>
      </ section>
    </>
  )
}





export default CalendarModal
