import { useEffect, useState } from 'react'

export const useDataFetch = (url, toggleLoading) => {

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState();
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(true)

        fetch(url)
        .then(response => response.json())
        .then(data => {
            setIsLoading(false)
            setData(data)
        })
        .catch(err => {
            console.log(err)
            setIsLoading(false)
            setData('Not found')
            setError(err)
        })
    }, [url])

    if (toggleLoading === 'no-loading') {
        return [ data, error ]
    }
    
    return [ isLoading, data, error ];
}
