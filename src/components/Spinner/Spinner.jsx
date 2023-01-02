import React from 'react'
import SpinnerImg from '../../assets/icons/spinner.gif'

const Spinner = () => {
  return (
    <figure className="spinner">
        <img src={SpinnerImg} alt="Spinner" className="responsive-img"/>
    </figure>
  )
}

export default Spinner