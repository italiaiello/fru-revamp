import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Spinner from '../../components/Spinner/Spinner';

const SignIn = () => {

    let history = useHistory()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false)

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
        setIsSubmitting(true)
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            setIsSubmitting(false)
            history.push("/search-competitions")
        })
        .catch((error) => {
            console.log(error.message)
            setIsSubmitting(false)
        });
    }

    

    return (
        <section className="fru-section signin-section">
            <h2>Football Round-Up</h2>
            <form className="fru-form">
                <article className="fru-form-field-container">
                    <label htmlFor="email">Email</label>
                    <input id="email" className="fru-form-input" placeholder="Email" type="email" onChange={onEmailChange} />
                </article>
                <article className="fru-form-field-container">
                    <label htmlFor="password">Password</label>
                    <input id="password" className="fru-form-input" placeholder="Password" type="password" onChange={onPasswordChange} />
                </article>
                {
                    showErrorMessage &&
                    <ErrorMessage message={"Email or password is incorrect"} />
                }
                {
                    isSubmitting ?
                    <Spinner />
                    :
                    <button className="submit-button" onClick={onSubmitSignIn}>Sign In</button>
                }
            </form>
        </section>
    )
}

export default SignIn
