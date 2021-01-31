import React from 'react'
import { useHistory } from 'react-router-dom'
import Fans from '../../assets/images/fans.svg'

const Entrance = () => {

    let history = useHistory();
    
    return (
        <section className="fru-section entrance-section">
            <article className="entrance-panel">
                <article className="welcome-message">
                    <h2>Welcome to Football Round-Up!</h2>
                    <p>Stay up-to-date with the best sport in the world</p>
                </article>
                <figure className="entrance-figure">
                    <img src={Fans} alt="Fans" className="responsive-img" />
                </figure>
            </article>
            <article className="entrance-article">
                <button className="btn submit-button entrance-button option" onClick={() => history.push("/sign-in")}>Sign In</button>
                <hr className="divider"></hr>
                <p className="alternate-option entrance-option" onClick={() => history.push("/leagues")}>Continue as a Guest</p>
            </article>
        </section>
    )
}

export default Entrance
