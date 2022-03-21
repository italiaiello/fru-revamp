import { useEffect, useState } from 'react'

export const usePlayerFetch = (url) => {

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(true)

        fetch(url)
        .then(response => response.json())
        .then(data => {
            setIsLoading(false)
            if (data.players.length) {
                setData(data.players[0])
            }
        })
        .catch(err => {
            console.log(err)
            setIsLoading(false)
            setData('Not found')
            setError(err)
        })
    }, [url])
    
    return [ isLoading, data, error ];
}
