import React, { useState, useEffect } from 'react'
import Leagues from '../../components/Leagues/Leagues'
import SearchBar from '../../components/SearchBar/SearchBar'
import { useLeaguesFetch } from '../../hooks/useLeaguesFetch'

const SearchLeagues = () => {

    const [ isLoading, leaguesData, error ] = useLeaguesFetch('https://www.thesportsdb.com/api/v1/json/1/all_leagues.php')

    const [filteredLeagues, setFilteredLeagues] = useState([])

    useEffect(() => {
        if (leaguesData) {
            setFilteredLeagues(leaguesData)
        }
    }, [leaguesData])

    if (error) return <>Network error</>

    return (
        <>
            {
                isLoading || !leaguesData ?
                <h2>Loading leagues...</h2>
                :
                <section className='fru-section'>
                    <h2>Football Round-Up</h2>
                    <h3>Select a league</h3>
                    <SearchBar data={leaguesData} setData={setFilteredLeagues} />
                    <Leagues leagues={filteredLeagues} />
                </section>
            }
        </>
    )
}

export default SearchLeagues
