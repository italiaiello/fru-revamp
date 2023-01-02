import React, { useState } from 'react'

const SearchBar = ({ data, setData }) => {

    const [search, setSearch] = useState('')

    const filterData = currentValue => {
        const filteredData = data.filter(datum => datum.strLeague.toLowerCase().includes(currentValue.toLowerCase()))
        setData(filteredData)
    }

    const onSearchChange = e => {
        const { value } = e.target
        setSearch(value)
        filterData(value)
    }

    return (
        <article className="search-bar">
            <input className="fru-form-input search-bar-input" placeholder="Search competitions..." type="text" onChange={onSearchChange} value={search} />
        </article>
    )
}

export default SearchBar
