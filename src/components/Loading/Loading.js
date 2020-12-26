import React from 'react'
import LoadingIcon from '../../assets/icons/loading.svg'

const Loading = ({ message }) => {
    return (
        <article>
            <h2>{message}</h2>
            <figure>
                <img src={LoadingIcon} alt="Animated loading bars" />
            </figure>
        </article>
    )
}

export default Loading
