import React from 'react'
import { useHistoryUpdate } from '../../ThemeContext'

const FormHeader = ({ currentForm }) => {

    const updateHistory = useHistoryUpdate()

    return (
        <header className="form-header">
            {
                currentForm === "SignIn" ?
                <p>Don't have an account? <span className="form-redirection" onClick={() => updateHistory("/register")}>Register Now</span></p>
                :
                <p>Already have an account? <span className="form-redirection" onClick={() => updateHistory("/sign-in")}>Sign In</span></p>
            }
        </header>
    )
}

export default FormHeader
