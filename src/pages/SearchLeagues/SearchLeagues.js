import React, { useState, useEffect } from 'react'
import Leagues from '../../components/Leagues/Leagues'
import Loading from '../../components/Loading/Loading'
import SearchBar from '../../components/SearchBar/SearchBar'
import { useLeaguesFetch } from '../../hooks/useLeaguesFetch'

const SearchLeagues = ({ setSelectedLeagueDetails }) => {

    const [ isLoading, leaguesData, error ] = useLeaguesFetch('https://www.thesportsdb.com/api/v1/json/1/all_leagues.php')

    const [filteredLeagues, setFilteredLeagues] = useState([])

    useEffect(() => {
        let isMounted = true
        if (leaguesData && isMounted) {
            setFilteredLeagues(leaguesData)
        }

        return function cleanup() {
            isMounted = false
        }
    }, [leaguesData])

    if (error) return <>Network error</>

    return (
        <>
            {
                isLoading || !leaguesData 
                ?
                <Loading message="Loading leagues..." />
                :
                <section className='fru-section'>
                    <h2>Football Round-Up</h2>
                    <h3>Select a league</h3>
                    <SearchBar data={leaguesData} setData={setFilteredLeagues} />
                    <Leagues leagues={filteredLeagues} setSelectedLeagueDetails={setSelectedLeagueDetails} />
                </section>
            }
        </>
    )
}

export default SearchLeagues
