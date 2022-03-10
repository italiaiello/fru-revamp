import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const SignIn = () => {

    let history = useHistory()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const onEmailChange = e => {
        setEmail(e.target.value);
        setShowErrorMessage(false);
    }

    const onPasswordChange = e => {
        setPassword(e.target.value);
        setShowErrorMessage(false);
    }

    const onSubmitSignIn = e => {
        e.preventDefault();
        history.push("/search-competitions")
        
    }

    

    return (
        <section className="fru-section signin-section">
            <h2>Football Round-Up</h2>
            <form className="fru-form">
                <input className="fru-form-input" placeholder="Email" type="email" onChange={onEmailChange} />
                <input className="fru-form-input" placeholder="Password" type="password" onChange={onPasswordChange} />
                {
                    showErrorMessage &&
                    <ErrorMessage message={"Email or password is incorrect"} />
                }
                <button className="submit-button" onClick={onSubmitSignIn}>Sign In</button>
            </form>
        </section>
    )
}

export default SignIn
