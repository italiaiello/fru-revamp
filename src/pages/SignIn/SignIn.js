import React, { useState } from 'react'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const SignIn = () => {

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

    const isEmailValid = () => {
        var re = /^\S+@\S+[\.][0-9a-z]+$/;
        return re.test(email);
    }

    const onSubmitSignIn = e => {
        e.preventDefault();
        if (!isEmailValid()) {
            setShowErrorMessage(true);
        }
    }

    

    return (
        <section className="fru-section signin-section">
            <h2>Sign In</h2>
            <form className="fru-form">
                <input className="fru-form-input" placeholder="Email" type="email" onChange={onEmailChange} />
                <input className="fru-form-input" placeholder="Password" type="password" onChange={onPasswordChange} />
                <button className="submit-button" onClick={onSubmitSignIn}>Sign In</button>
            </form>
            {
                showErrorMessage &&
                <ErrorMessage />
            }
            
        </section>
    )
}

export default SignIn
