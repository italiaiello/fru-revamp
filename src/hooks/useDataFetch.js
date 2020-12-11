import { useEffect, useState } from 'react'

export const useDataFetch = (url) => {

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(url)
                const json = await response.json()
                setData(json)
            } catch(error) {
                setError(error)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [url])

    return { isLoading, data, error };
}
