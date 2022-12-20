import React, { useState} from "react";

const Form = ({handleSubmit}) => {
    const initialState = {
        name: '',
        phone_number: ''
    }
    const [state, setState] = useState(initialState)
    
    const submitForm = (e) => {
        e.preventDefault()
        handleSubmit(state)
        setState(initialState)
    }

    const {name, phone_number} = state
    return(
        <form onSubmit={submitForm}>
            <label htmlFor="name">Name</label>
            <input
            type="text"
            name= "name"
            id="name"
            value={name}
            onChange={(e) => setState(prev => ({
                ...prev, name: e.target.value
            }))}/>

            <label htmlFor="job">Phone Number</label>
            <input
            type="text"
            name= "phone_number"
            id="phone_number"
            value={phone_number}
            onChange={(e) => setState(prev => ({
                ...prev, phone_number: e.target.value
            }))}/>
            
            <input type="submit" value="Add Contact" />
        </form>
    )


}

export default Form