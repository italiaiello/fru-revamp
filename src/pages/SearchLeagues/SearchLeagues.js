import React, { useState, useEffect } from 'react'
import Leagues from '../../components/Leagues/Leagues'
import Loading from '../../components/Loading/Loading'
import SearchBar from '../../components/SearchBar/SearchBar'
import { useLeaguesFetch } from '../../hooks/useLeaguesFetch'

const SearchLeagues = ({ setSelectedLeague, setSelectedLeagueDetails }) => {

    const [ isLoading, leaguesData, error ] = useLeaguesFetch('https://www.thesportsdb.com/api/v1/json/1/all_leagues.php')

    const [filteredLeagues, setFilteredLeagues] = useState([])

    const [selectedLeague, setSelectedLeague] = useState('cheese')
    const [selectedLeagueDetails, setSelectedLeagueDetails] = useState({})

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
                    <Switch>
                        <Route exact path={path}>
                            <h2>Football Round-Up</h2>
                            <h3>Select a league</h3>
                            <SearchBar data={leaguesData} setData={setFilteredLeagues} />
                            <Leagues leagues={filteredLeagues} setSelectedLeague={setSelectedLeague} setSelectedLeagueDetails={setSelectedLeagueDetails} />
                        </Route>
                        <Route path={`/search-competitions/${selectedLeague}`}>
                            <LeagueTable leagueId={selectedLeagueDetails.idLeague} leagueName={selectedLeagueDetails.strLeague} />
                        </Route>
                    </Switch>
                    
                </section>
            }
        </>
    )
}

export default SearchLeagues
