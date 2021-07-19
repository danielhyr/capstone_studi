import axios from 'axios'
import { useState, useEffect } from 'react'
import './ProfileModal.scss'
import FileBase from 'react-file-base64';

function ProfileModal({show, setShow, id, user, setUser}) {

  const  [postData, setPostData] = useState()

  const [userData, setUserData] = useState()


    console.log("modal", user)
    const onClick = async (e) => {  
            e.preventDefault()
        try {
            console.log(postData.selectedFile)
            const newData = {name: e.target.name.value, email: e.target.email.value, about: e.target.about.value, interests: e.target.interests.value, image: postData.selectedFile}
            console.log(newData)
            const res = await axios.patch(`/users/update/${id}`, newData)
            setUserData(res.data)
            setUser(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setUserData(user)
        setPostData({selectedFile: user?.image})
    }, [user])

    if (show) {
        return (
            <section className="profModal">
                <form className="profModal-form" onSubmit = {onClick}>
                    <input className="profModal__input"
                    placeholder = {userData?.name}
                    defaultValue = {userData?.name}
                    name = "name"
                    />
                    <input className="profModal__input"
                    placeholder = {userData?.email}
                    defaultValue = {userData?.email}
                    name = "email"
                    />
                    <input className="profModal__input"
                     placeholder = {userData?.about}
                     name = "about"
                     defaultValue={userData?.about}
                    />
                    <input className="profModal__input"
                     placeholder = {userData?.interests}
                     name = "interests"
                     defaultValue = {userData?.interests}

                    />
                            <div className="fileinput"><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({selectedFile: base64 })}  /></div>

                    <button >Confirm</button>
                    <button onClick = {() => setShow(false)}>Close</button>
                </form>
            </section>
        )
    } else {
        return null
    }

   
}

export default ProfileModal
