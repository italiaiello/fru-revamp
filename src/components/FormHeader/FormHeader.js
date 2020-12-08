import React from 'react'
import { useHistory } from 'react-router-dom'

const FormHeader = ({ currentForm }) => {
    let history = useHistory();

    return (
        <header className="form-header">
            {
                currentForm === "SignIn" ?
                <p>Don't have an account? <span className="form-redirection" onClick={() => history.push("/register")}>Register Now</span></p>
                :
                <p>Already have an account? <span onClick={() => history.push("/sign-in")}>Sign In</span></p>
            }
        </header>
    )
}

export default FormHeader
