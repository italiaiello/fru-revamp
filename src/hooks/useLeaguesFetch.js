import { useEffect, useState } from 'react'

export const useLeaguesFetch = (url) => {

    const [isLoading, setIsLoading] = useState(false);
    const [leaguesData, setLeaguesData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(true)

        fetch(url)
        .then(response => response.json())
        .then(data => {
            const filteredData = data.leagues.filter(league => league.strSport === 'Soccer' && !league.strLeague.includes('_'))
            console.log(filteredData)
            setLeaguesData(filteredData)
            setIsLoading(false)
        })
        .catch(err => {
            console.log(err)
            setError(err)
            setIsLoading(false)
        })

    }, [url])
    
    return [ isLoading, leaguesData, error ];
}
