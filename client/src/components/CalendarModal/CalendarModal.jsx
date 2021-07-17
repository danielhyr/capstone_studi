 import React, {useState} from 'react'
 import TextField from '@material-ui/core/TextField'
import './CalendarModal.scss'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { createPost} from '../../actions/posts'


 function CalendarModal(props) {


    const [inputField, setInputField] = useState({
      title: props.subject,
      timestamp: null,
      schedule:[
      { id: uuidv4(), time:'', activity: '', },
  ]})
  
  const user = JSON.parse(localStorage.getItem('profile'))
   const dispatch = useDispatch() 


    const handleSubmit =  (e) => {
        e.preventDefault();
        props.onSubmitHandler(e)
        const newInputFields ={...inputField,
          name: user?.result?.name,  timestamp: Date.now(), title: props.subject,
          schedule: inputField.schedule.map(field => {
          return field;
        })}
        

        setInputField(newInputFields)
        dispatch(createPost(newInputFields))

        console.log(inputField)
        console.log(e.target.title.value)
      };

    const handleAddFields = (e) => {
        e.preventDefault()
        const newInputFields ={...inputField, schedule: [...inputField.schedule, { id: uuidv4(),  time: '', activity: ''}]}
        setInputField({...newInputFields})
      }

    const handleChangeInput = (id, event) => {
        const newInputFields = {...inputField, schedule: inputField.schedule.map(field => {
          if(id === field.id) {
            field[event.target.name] = event.target.value
          }
          return field;
        })}
        setInputField(newInputFields);
    }


    const handleRemoveFields = (id, e) => {
        e.preventDefault()
        const values  = [...inputField];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputField(values);
      }


      if(!props.show){
        return null
      }

      if(!user?.result?.name) {
        return(
          <div>
             <h6> Please Sign In to share your schedules with others!</h6>
          </div>
        )
      }

     return (
         <>        
         <section className="schedule">
             <form className="schedule-form">
             <h1 className="schedule__header"> Create your Schedule</h1>

             <button onClick={handleAddFields}>Add a new activity</button>
                 { inputField.schedule.map((inputField, index) => (
                     <div key = {index} className="inputs">
                        <div>
                        <TextField
                         name ="time"
                         label= "Time"
                         variant = "filled"
                         value = {inputField.time}
                         onChange = {event => handleChangeInput(inputField.id, event)}
                         /></div>
                         <div className="inputs__activityField">
                        <TextField
                         name ="activity"
                         label= "Activity"
                         variant = "filled"
                         value = {inputField.activity}
                         onChange = {event => handleChangeInput(inputField.id, event)}
                         />
                         </div>
                         <div>
                         <button onClick={(event) => handleRemoveFields(inputField.id, event)}>Remove</button>
                         <button onClick={(event) => handleRemoveFields(inputField.id, event)}>Check Complete</button>
                         <button onClick={(event) => handleRemoveFields(inputField.id, event)}>Start this Task</button>
                         </div>
                     </div>
                 ))}
                 <button onClick = {handleSubmit}>Submit</button>
             </form>
         </ section>
        </>
     )
 }
 




 export default CalendarModal
 