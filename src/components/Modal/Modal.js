import React from 'react'

const Modal = ({ toggleModal }) => {

    return (
        <section className="modal-container">
            <article className="modal">
                <h2>Stadium Info</h2>
                <p>Add stuff here</p>
                <button onClick={() => toggleModal(false)}>X</button>
            </article>
        </section>
    )
}

export default Modal
