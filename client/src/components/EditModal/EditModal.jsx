import { useState, useEffect } from 'react';
import './EditModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { updatePost } from '../../actions/posts'
import { v4 as uuidv4 } from 'uuid';

function EditModal(props) {
    const thisPost = useSelector(state => state.posts).filter(post => props.id === post._id)

    const [inputField, setInputField] = useState(null)


    const dispatch = useDispatch()

    useEffect(() => {
        setInputField(thisPost[0])
    }, [props.id])


    const newPost = (e) => {
        //    const id =   props.id
        //   const post =  posts.filter(post => id === post._id)
        console.log(thisPost)
        props.onCloseHandler(e)
    }


    const handleAddFields = (e) => {
        e.preventDefault()
        const newInputFields ={...inputField, schedule: [...inputField.schedule, { id: uuidv4(),  time: '', activity: ''}]}
        setInputField({...newInputFields})
      }

      const handleRemoveFields = (id, e) => {
        e.preventDefault()
        const values  = [...inputField.schedule];
        values.splice(values.findIndex(value => value.id === id), 1);
        const newInputFields = {...inputField, 
        schedule: values}
        setInputField(newInputFields);
      }

    const handleChangeInput = (id, event) => {
        console.log(inputField)   
        console.log(event.target.value)

    
        if(inputField.title === null) {
        const newInputFields = {...thisPost[0], schedule: inputField.schedule.map(field => {
            console.log(field)
            console.log(event.target.name)
            console.log(id)
            if(id === field.id) {
                field[event.target.name] = event.target.value
              }
              return field;
        })}
        console.log(newInputFields)
        setInputField(newInputFields);
    } else {
        const newInputFields = {...inputField, schedule: inputField.schedule.map(field => {
            console.log(field.id)

            console.log(event.target.name)
            console.log(id)
            if(id === field.id) {
                field[event.target.name] = event.target.value
              }
              return field;
        })}
        console.log(newInputFields)
        setInputField(newInputFields);
    }
    
    }

    const handleChangeTitle = (id, event) => {
        console.log(inputField)
        console.log(event.target.value)

        if(inputField.title === null) {  const newInputFields = {...thisPost[0], schedule: thisPost[0].schedule,
            title: event.target.value
        }

        setInputField(newInputFields);
    }
        else {
            const newInputFields = {...inputField, schedule: inputField.schedule,
                title: event.target.value
            }
    
            setInputField(newInputFields);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.title)
        console.log(props.id)
        
        dispatch(updatePost(props.id, inputField))
    }

    const handleComplete = (e) => {
        console.log(e)
    }

    if (!props.show) {
        return null
    }  else  if (!thisPost) {
        return null
    } else if (!inputField) {
        return null
    }
    return (

        <section className="edit">
            <form className="edit-form" onSubmit = {handleSubmit}>
                <label htmlFor="title">Your Standup</label>
                <input onChange = {event => handleChangeTitle(inputField.id, event)} name = "title" placeholder={inputField.title}></input>
                {inputField.schedule.map(schedule => {
                    return (
                        <div>
                        <label htmlFor="time">time</label>
                        <input value = {inputField.time} name = "time" placeholder={schedule.time}  onChange = {event => handleChangeInput(schedule.id, event)} ></input>

                        <label htmlFor="activity">activity</label>
                        <input value = {inputField.activity} name = "activity" placeholder={schedule.activity}  onChange = {event => handleChangeInput(schedule.id, event)}></input>
                        <button onClick={(event) => handleRemoveFields(schedule.id, event)}>Remove</button>
                        <input type="checkbox" onClick={handleComplete}/>
                        </div>
                    )
                })}

                <p>{thisPost[0].title}</p>
                <button type = "submit">Submit</button>
                <button onClick={newPost}>Close</button>
                <button onClick = {handleAddFields}>Add</button>
            </form>
        </section>
    )
}

export default EditModal
