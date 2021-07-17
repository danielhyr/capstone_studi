import { useState, useEffect } from 'react';
import './EditModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { updatePost } from '../../actions/posts'
import { v4 as uuidv4 } from 'uuid';

function EditModal(props) {
    const thisPost = useSelector(state => state.posts).filter(post => props.id === post._id)

    const [inputField, setInputField] = useState({
        title: null,
        timestamp: null,
        schedule:[
        { id: 234, time: "null", activity: "null", },
    ]})


    useEffect(() => {
        setInputField(thisPost[0])
        console.log(thisPost)
    }, [props.id])

    const dispatch = useDispatch()

    const newPost = (e) => {
        //    const id =   props.id
        //   const post =  posts.filter(post => id === post._id)
        console.log(thisPost)
        props.onCloseHandler(e)
    }

    const handleChangeInput = (id, event) => {
        console.log(inputField)   
        console.log(event.target.value)

    
        if(inputField.title === null) {
        const newInputFields = {...thisPost[0], schedule: inputField.schedule.map(field => {
            console.log(field)
            console.log(event.target.name)
            console.log(id)
        
            field[event.target.name] = event.target.value
            return field;
        })}
        console.log(newInputFields)
        setInputField(newInputFields);
    } else {
        const newInputFields = {...inputField, schedule: inputField.schedule.map(field => {
            console.log(field)
            console.log(event.target.name)
            console.log(id)
        
            field[event.target.name] = event.target.value
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
                <label htmlFor="title">title</label>
                <input onChange = {event => handleChangeTitle(inputField.id, event)} name = "title" placeholder={thisPost[0].title}></input>
                {thisPost[0].schedule.map(schedule => {
                    return (
                        <div>
                        <label htmlFor="time">time</label>
                        <input value = {inputField.time} name = "time" placeholder={schedule.time}  onChange = {event => handleChangeInput(inputField.id, event)} ></input>

                        <label htmlFor="activity">activity</label>
                        <input value = {inputField.activity} name = "activity" placeholder={schedule.activity}  onChange = {event => handleChangeInput(inputField.id, event)}></input>
                        </div>
                    )
                })}

                <p>{thisPost[0].title}</p>
                <button type = "submit">Submit</button>
                <button onClick={newPost}>Close</button>
            </form>
        </section>
    )
}

export default EditModal
