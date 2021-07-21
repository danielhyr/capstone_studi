import { useState, useEffect } from 'react';
import './EditModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { updatePost } from '../../actions/posts'
import { v4 as uuidv4 } from 'uuid';
import close from '../../data/Icons/close-24px.svg'

function EditModal(props) {
    const thisPost = useSelector(state => state.posts).filter(post => props.id === post._id)

    const [inputField, setInputField] = useState(null)


    const dispatch = useDispatch()

    useEffect(() => {
        setInputField(thisPost[0])
    }, [props.id])


    const onClose = (e) => {

        props.onCloseHandler(e)
    }


    const handleAddFields = (e) => {
        e.preventDefault()
        const newInputFields = { ...inputField, schedule: [...inputField.schedule, { id: uuidv4(), time: '', activity: '' }] }
        setInputField({ ...newInputFields })
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

    const handleChangeInput = (id, event) => {
        if (inputField.title === null) {
            const newInputFields = {
                ...thisPost[0], schedule: inputField.schedule.map(field => {

                    if (id === field.id) {
                        field[event.target.name] = event.target.value
                    }
                    return field;
                })
            }
            setInputField(newInputFields);
        } else {
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

    }

    const handleChangeTitle = (id, event) => {

        if (inputField.title === null) {
            const newInputFields = {
                ...thisPost[0], schedule: thisPost[0].schedule,
                title: event.target.value
            }

            setInputField(newInputFields);
        }
        else {
            const newInputFields = {
                ...inputField, schedule: inputField.schedule,
                title: event.target.value
            }

            setInputField(newInputFields);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();


        dispatch(updatePost(props.id, inputField))
    }

  
    if (!props.show) {
        return null
    } else if (!thisPost) {
        return null
    } else if (!inputField) {
        return null
    }
    return (

        <section className="edit">

            <form className="edit-form" onSubmit={handleSubmit}>
                <img onClick={onClose} className="edit__closer" src={close} alt="closing icon x mark" />
                <div className="edit-standup">
                    <h1>Edit Your Standup</h1>
                    <input className="edit__title" onChange={event => handleChangeTitle(inputField.id, event)} name="title" placeholder={inputField.title}></input>
                </div>
                <button className="edit__add" onClick={handleAddFields}>+ Add</button>
                {inputField.schedule.map(schedule => {
                    return (
                        <div className="editSchedule">
                            <div className="editSchedule-element">
                                <label className="editSchedule__label" htmlFor="time">Time</label>
                                <input className="editSchedule__input" value={inputField.time} name="time" placeholder={schedule.time} onChange={event => handleChangeInput(schedule.id, event)} ></input>

                            </div>
                            <div className="editSchedule-element">
                                <label className="editSchedule__label" htmlFor="activity">Activity</label>
                                <input className="editSchedule__input" value={inputField.activity} name="activity" placeholder={schedule.activity} onChange={event => handleChangeInput(schedule.id, event)}></input>
                            </div>
                            <button className = "editSchedule__remove"onClick={(event) => handleRemoveFields(schedule.id, event)}>X</button>
                        </div>
                    )
                })}
                <div>
                    <button className = "editSchedule__submit"type="submit">Submit</button>
                </div>

            </form>
        </section>
    )
}

export default EditModal
