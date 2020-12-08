import React from 'react'
import Error from '../../assets/icons/error.svg'

const ErrorMessage = () => {
    return (
        <article className="error-message">
            <figure className="error-figure">
                <img src={Error} alt="Error icon" />
            </figure>
            <p>Please fill in the fields correctly</p>
        </article>
    )
}

export default ErrorMessage
