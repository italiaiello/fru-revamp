import React from 'react'

const Dropdown = ({ dropdownOptions, prompt, onChangeFunction }) => {

    return (
        <select className="fru-form-input dropdown" onChange={onChangeFunction}>
            <option value="nothing">{prompt}</option>
            {
                dropdownOptions.map((option) => <option key={option} value={option}>{option}</option>)
            }
        </select>
    )
}

export default Dropdown
