import React from 'react'
import Leagues from '../../components/Leagues/Leagues'
import { useDataFetch } from '../../hooks/useDataFetch'

const SearchLeagues = () => {

    const [ isLoading, data, error ] = useDataFetch('https://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?s=Soccer')

    if (error) return <>Network error</>

    return (
        <>
            {
                isLoading || !data ?
                <h2>Loading leagues...</h2>
                :
                <section className='fru-section'>
                    <h2>Football Round-Up</h2>
                    <h3>Select a league</h3>
                    <Leagues leagues={data.countrys} />
                </section>
            }
        </>
    )
}

export default SearchLeagues
