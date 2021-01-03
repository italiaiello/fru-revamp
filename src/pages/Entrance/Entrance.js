import React from 'react'
import { useHistory } from 'react-router-dom'
import Fans from '../../assets/images/fans.svg'

const Entrance = () => {

    let history = useHistory();
    
    return (
        <section className="fru-section entrance-section">
            <figure className="entrance-figure">
                <img src={Fans} alt="Fans" className="responsive-img" />
            </figure>
            <article className="entrance-article">
                <article id="welcome-message">
                    <h2>Welcome to Football Round-Up!</h2>
                    <h3>Stay up-to-date on the best sport in the world</h3>
                </article>
                <button className="btn submit-button entrance-button option" onClick={() => history.push("/sign-in")}>Sign In</button>
                <hr className="divider"></hr>
                <p className="alternate-option" onClick={() => history.push("/leagues")}>Continue as a Guest</p>
            </article>
        </section>
    )
}

export default Entrance
