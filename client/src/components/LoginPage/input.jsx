import React from 'react'

function input({name, handleChange, label, type}) {
    return (
        <div>
        <label htmlFor={name}>{label}</label>
      <input type = {type} name = {name} onChange = {handleChange}/>
        </div>
    )
}

export default input
