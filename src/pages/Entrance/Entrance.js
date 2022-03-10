import React from 'react'
import { useHistory } from 'react-router-dom'
import Fans from '../../assets/images/fans.svg'

const Entrance = () => {

    let history = useHistory()
    
    return (
        <section className="fru-section entrance-section">
            <article className="entrance-message">
                <figure className="entrance-figure">
                    <img src={Fans} alt="Fans" className="responsive-img" />
                </figure>
            </article>
            <article className="entrance-article">
                <article className="welcome-message">
                    <h2>Welcome to Football Round-Up!</h2>
                    <p>Stay up-to-date with the best sport in the world</p>
                </article>
                <article className="entrance-buttons">
                    <button className="btn entrance-button option" onClick={() => history.push("/sign-in")}>Sign In</button>
                    <button className="btn alternate-button entrance-button option" onClick={() => history.push("/register")}>Register</button>
                </article>
                <hr className="divider"></hr>
                <p className="alternate-option entrance-option" onClick={() => history.push("/leagues")}>Continue as a Guest</p>
            </article>
        </section>
    )
}

export default Entrance
