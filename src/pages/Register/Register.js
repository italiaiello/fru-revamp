import React, { useState } from 'react'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner'

const Register = () => {

    let history = useHistory()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    
    const [errorMessage, setErrorMessage] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onEmailChange = e => {setEmail(e.target.value); setShowErrorMessage(false)}
    const onPasswordChange = e => {setPassword(e.target.value); setShowErrorMessage(false)}
    const onConfirmedPasswordChange = e => {setConfirmedPassword(e.target.value); setShowErrorMessage(false)}
    
    const isEmailValid = (e) => {
        e.preventDefault();
        var re = /^\S+@\S+[.][0-9a-z]+$/;
        if (!re.test(email)) {
            setErrorMessage("Email is incorrect");
            setShowErrorMessage(true);
        }
    }

    const checkPasswordsMatch = (e) => {
        e.preventDefault();
        if (password !== confirmedPassword) {
            setErrorMessage("Passwords do not match");
            setShowErrorMessage(true);
        }
    }

    const onSubmitRegister = (e) => {
        e.preventDefault();
        setIsSubmitting(true)

        if (!isEmailValid || !checkPasswordsMatch) {
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            setIsSubmitting(false)
            history.push("/search-competitions")
        })
        .catch((error) => {
            console.log(error.message)
            setIsSubmitting(false)
        })
    }

    return (
        <section className="fru-section signin-section">
            <h2>Register for Football Round-Up</h2>
            <form className="fru-form">
                <article className="fru-form-field-container">
                    <label htmlFor="email">Email</label>
                    <input id="email" className="fru-form-input" placeholder="Email" type="email" onChange={onEmailChange} value={email}/>
                </article>
                <article className="fru-form-field-container">
                    <label htmlFor="password">Password</label>
                    <input id="password" className="fru-form-input" placeholder="Password" type="password" onChange={onPasswordChange} value={password} />
                </article>
                <article className="fru-form-field-container">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input className="fru-form-input" placeholder="Confirmed Password" type="password" onChange={onConfirmedPasswordChange} value={confirmedPassword} />
                </article>
                {
                    showErrorMessage &&
                    <ErrorMessage message={errorMessage} />
                }
                {
                    isSubmitting ?
                    <Spinner />
                    :
                    <button className="submit-button" onClick={onSubmitRegister}>Register</button>
                }
            </form>
        </section>
    )
}

export default Register
