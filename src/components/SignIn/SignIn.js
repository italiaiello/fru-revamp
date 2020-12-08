import React from 'react'

const SignIn = () => {
    return (
        <section className="fru-section signin-section">
            <h2>Sign In</h2>
            <form className="fru-form">
                <input className="fru-form-input" placeholder="Email" type="email" />
                <input className="fru-form-input" placeholder="Password" type="password" />
                <button type="submit" className="signin-button">Sign In</button>
            </form>
        </section>
    )
}

export default SignIn
