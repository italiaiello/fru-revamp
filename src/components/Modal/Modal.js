import React from 'react'

const Modal = ({ toggleModal, teamDetails }) => {

    return (
        <section className="modal-container">
            <article className="modal">
                <article className="modal-heading">
                    <h2>{`About ${teamDetails.strTeam}'s Stadium`}</h2>
                    <button className="modal-close" onClick={() => toggleModal(false)}>X</button>
                </article>
                <article className="stadium-details">
                    <figure className="stadium-img">
                        <img src={`${teamDetails.strStadiumThumb}/preview`} alt={`${teamDetails.strTeam}'s Stadium`} className="responsive-img" />
                    </figure>
                    <p className="stadium-description">{teamDetails.strStadiumDescription}</p>
                </article>
            </article>
        </section>
    )
}

export default Modal
