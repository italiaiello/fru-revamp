import React, { useEffect, useState } from 'react'
import Dropdown from '../../components/Dropdown/Dropdown';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { fetchTeams } from '../../functions/fetchTeams';
import { useDataFetch } from '../../hooks/useDataFetch';

const Register = () => {

    const [ data, error ] = useDataFetch('https://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?s=Soccer', "no-loading");

    const [leagues, setLeagues] = useState([])
    const [teams, setTeams] = useState([])

    const [leagueDropdownOptions, setLeagueDropdownOptions] = useState([])
    const [teamDropdownOptions, setTeamDropdownOptions] = useState([])

    const [chosenLeague, setChosenLeague] = useState('')
    const [chosenTeam, setChosenTeam] = useState('')

    useEffect(() => {
        if (data) {
            setLeagues(data.countrys);
            const options = data.countrys.map(league => league.strLeague);
            setLeagueDropdownOptions(options);
        }
    }, [data])

    useEffect(() => {
        if (chosenLeague.length) {
            fetchTeams(chosenLeague, setTeams, setTeamDropdownOptions);
        }
    }, [chosenLeague])

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    
    const [currentStep, setCurrentStep] = useState(0);

    const [errorMessage, setErrorMessage] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const onNameChange = e => {setName(e.target.value)}
    const onEmailChange = e => {setEmail(e.target.value); setShowErrorMessage(false)}
    const onPasswordChange = e => {setPassword(e.target.value); setShowErrorMessage(false)}
    const onConfirmedPasswordChange = e => {setConfirmedPassword(e.target.value); setShowErrorMessage(false)}
    const onLeagueChange = e => {setChosenLeague(e.target.value); setShowErrorMessage(false)}
    const onTeamChange = e => {setChosenTeam(e.target.value); setShowErrorMessage(false)}
    
    if (error) return <>Network error</>

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
                        {
                            teamDropdownOptions.length ?
                            <Dropdown dropdownOptions={teamDropdownOptions} prompt={"Please select a team"} onChangeFunction={onTeamChange} />
                            :
                            null
                        }
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

    const onSubmitRegister = (e) => {
        e.preventDefault();
        if (!chosenLeague.length || !chosenTeam.length) {
            setErrorMessage("Please select an option")
            setShowErrorMessage(true)
        } else {
            setCurrentStep(0);
        }
    }

    const buttonFunctions = [isEmailValid, checkPasswordsMatch, onSubmitRegister];
    const buttonNames = ['Next Step', 'Next Step', 'Register'];

    return (
        <section className="fru-section signin-section">
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
        </section>
    )
}

export default Register
