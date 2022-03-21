import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import { usePlayerFetch } from '../../hooks/usePlayerFetch'

const PlayerDetails = () => {
    
    const { playerId } = useParams()

    const [isLoading, playerDetails, error] = usePlayerFetch(`https://www.thesportsdb.com/api/v1/json/50130162/lookupplayer.php?id=${playerId}`)

    const getPlayerAge = (dateOfBirth) => new Date().getFullYear() - new Date(dateOfBirth).getFullYear()

    if (error) {
        console.log(error)
        return <>Network error</>
    }

    return (
        <section>
            {
                isLoading || !playerDetails ?
                <Loading message={"Loading player details..."} />
                :
                <article>
                    <article>
                        <figure>
                            <img src={playerDetails.strCutout} alt={playerDetails.strPlayer} />
                        </figure>
                        <p>{playerDetails.strPlayer}</p>
                    </article>
                    <article>
                        <h3>Age</h3>
                        <p>{`${getPlayerAge(playerDetails.dateBorn)}`}</p>
                    </article>
                </article>
            }
        </section>
    )
}

export default PlayerDetails