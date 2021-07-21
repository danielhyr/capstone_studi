import { useState, useEffect } from 'react'
import './ProfileModal.scss'
import FileBase from 'react-file-base64';
import close from '../../data/Icons/close-24px.svg'
import * as api from '../../api/index'

function ProfileModal({ show, setShow, id, user, setUser }) {

    const [postData, setPostData] = useState()

    const [userData, setUserData] = useState()


    const onClick = async (e) => {
        e.preventDefault()
        try {
            const newData = { name: e.target.name.value, email: e.target.email.value, about: e.target.about.value, interests: e.target.interests.value, image: postData.selectedFile }
            const res = await api.updateuser(id, newData)
            setUserData(res.data)
            setUser(res.data)
            setShow(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setUserData(user)
        setPostData({ selectedFile: user?.image })
    }, [user])

    if (show) {
        return (
            <section className="profModal">

                <form className="profModal-form" onSubmit={onClick}>
                    <img src={close} alt="closing icon x mark" className="profModal__close" onClick={() => setShow(false)}/>
                    <h1>Edit Profile</h1>
                    <input className="profModal__input"
                        placeholder="Your Name"
                        defaultValue={userData?.name}
                        name="name"
                    />
                    <input className="profModal__input"
                        placeholder="Your Email"
                        defaultValue={userData?.email}
                        name="email"
                    />
                    <input className="profModal__input"
                        placeholder= "About You"
                        name="about"
                        defaultValue={userData?.about}
                    />
                    <input className="profModal__input"
                        placeholder= "Your Interests"
                        name="interests"
                        defaultValue={userData?.interests}

                    />
                    <div className="fileinput">
                        <p>Change profile picture</p>
                        <FileBase className = "profModal__upload"type="file" multiple={false} onDone={({ base64 }) => setPostData({ selectedFile: base64 })} /></div>

                    <button className="profModal__submit" type="submit">Confirm</button>
                </form>
            </section>
        )
    } else {
        return null
    }


}

export default ProfileModal
