import React, { useState } from 'react'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const Register = ({ isLoading, leaguesData }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    
    const [league, setLeague] = useState('')
    const [team, setTeam] = useState('')
    
    const [currentStep, setCurrentStep] = useState(0);

    const [errorMessage, setErrorMessage] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const onNameChange = e => {setName(e.target.value)}
    const onEmailChange = e => {setEmail(e.target.value); setShowErrorMessage(false)}
    const onPasswordChange = e => {setPassword(e.target.value); setShowErrorMessage(false)}
    const onConfirmedPasswordChange = e => {setConfirmedPassword(e.target.value); setShowErrorMessage(false)}
    const onLeagueChange = e => {setLeague(e.target.value); setShowErrorMessage(false)}
    const onTeamChange = e => {setTeam(e.target.value); setShowErrorMessage(false)}


    const isEmailValid = (e) => {
        e.preventDefault();
        var re = /^\S+@\S+[.][0-9a-z]+$/;
        if (re.test(email)) {
            setCurrentStep(currentStep + 1);
            console.log('valid')
        } else {
            setErrorMessage("Email is incorrect");
            setShowErrorMessage(true);
        }
        console.log("I am clicked")
    }

    const checkPasswordsMatch = (e) => {
        e.preventDefault();
        if (password === confirmedPassword) {
            setCurrentStep(currentStep + 1);
        } else {
            setErrorMessage("Passwords do not match");
            setShowErrorMessage(true);
        }
    };

    const onSubmitSignIn = (e) => {
        e.preventDefault();
        setCurrentStep(0);
    }

    const buttonFunctions = [isEmailValid, checkPasswordsMatch, onSubmitSignIn];
    const buttonNames = ['Next Step', 'Next Step', 'Register'];



    const showCurrentStep = () => {
        switch(currentStep) {
            case 0:
                return (
                    <article className="step">
                        <input className="fru-form-input" placeholder="Name" type="text" onChange={onNameChange} value={name}/>
                        <input className="fru-form-input" placeholder="Email" type="email" onChange={onEmailChange} value={email}/>
                    </article>
                )
            case 1:
                return (
                    <article className="step">
                        <input className="fru-form-input" placeholder="Password" type="password" onChange={onPasswordChange} value={password} />
                        <input className="fru-form-input" placeholder="Confirmed Password" type="password" onChange={onConfirmedPasswordChange} value={confirmedPassword} />
                    </article>
                )
            case 2:
                return (
                    <article className="step">
                        <input className="fru-form-input" name="league" placeholder="League" type="text" onChange={onLeagueChange} value={league} />
                        <input className="fru-form-input" name="team" placeholder="Team" type="text" onChange={onTeamChange} value={team} />
                    </article>
                )
            default:
                return (
                    <article className="step">
                        <p>Something went wrong. Step is unable to be shown.</p>
                    </article>
                )
        }
    }

    return (
        <section className="fru-section signin-section">
            {
                console.log(leaguesData)
            }
            {
                isLoading ?
                <h2>Loading Registration Form...</h2>
                :
                <>
                    <h2>Register for Football Round-Up</h2>
                    <form className="fru-form">
                        <h4>Step {currentStep + 1} of 3</h4>
                        {
                            showCurrentStep()
                        }
                        {
                            showErrorMessage &&
                            <ErrorMessage message={errorMessage} />
                        }
                        <button className="submit-button" onClick={buttonFunctions[currentStep]}>{buttonNames[currentStep]}</button>
                    </form>
                </>
            }
        </section>
    )
}

export default Register
