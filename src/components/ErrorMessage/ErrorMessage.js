import React from 'react'
import Error from '../../assets/icons/error.svg'

const ErrorMessage = ({ message }) => {
    return (
        <article className="error-message">
            <figure className="error-figure">
                <img src={Error} alt="Error icon" />
            </figure>
            <p>{message}</p>
        </article>
    )
}

export default ErrorMessage
