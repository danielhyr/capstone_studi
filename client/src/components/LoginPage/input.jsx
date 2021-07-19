import React from 'react'
import './LoginPage.scss'

function input({name, handleChange, label, type}) {
    return (
        <div className="sinput">
      <input className = "sinput__boxes" type = {type} name = {name} onChange = {handleChange} placeholder={label}/>
        </div>
    )
}

export default input
