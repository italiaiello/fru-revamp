import React, { useEffect, useState } from 'react'
import Dropdown from '../../components/Dropdown/Dropdown';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useDataFetch } from '../../hooks/useDataFetch';

const Register = () => {

    const [ isLoading, data, error ] = useDataFetch('https://www.thesportsdb.com/api/v1/json/1/all_leagues.php');

    const [leaguesData, setLeaguesData] = useState([])
    const [leagueDropdownOptions, setLeagueDropdownOptions] = useState([])
    const [teamDropdownOptions, setTeamDropdownOptions] = useState(['Manchester United', 'AC Milan', 'Real Madrid', 'Sydney FC', 'Monaco', 'Bayern'])

    useEffect(() => {
        if (data) {
            setLeaguesData(data.leagues);
            const options = data.leagues.filter(league => {
                if (league.strSport === 'Soccer') {
                    if (league.strLeague.includes('Cup') || league.strLeague.includes('Copa') || league.strLeague.includes('Trophy') || league.strLeague.includes('Champions League') || league.strLeague.includes('Coupe') || league.strLeague.includes('UEFA') || league.strLeague.includes('_') || league.strLeague.includes('Friendlies') || league.strLeague.includes('Shield') || league.strLeague === 'DFB-Pokal') {
                        return false
                    } else {
                        return true
                    }  
                }

                return false
            })
            .map(league => league.strLeague)
            .sort();
            
            setLeagueDropdownOptions(options);
        }
    }, [data])

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
                        <Dropdown dropdownOptions={leagueDropdownOptions} prompt={"Please select a league"} onChangeFunction={onLeagueChange} />
                        <Dropdown dropdownOptions={teamDropdownOptions} prompt={"Please select a team"} onChangeFunction={onTeamChange} />
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
                isLoading || !leaguesData.length ?
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
