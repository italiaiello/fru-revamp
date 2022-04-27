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
        <section className="player-details">
            {
                isLoading || !playerDetails ?
                <Loading message={"Loading player details..."} />
                :
                <>
                    <article>
                        <article>
                            <figure>
                                <img src={playerDetails.strCutout} alt={playerDetails.strPlayer} />
                            </figure>
                            <p>{playerDetails.strPlayer}</p>
                        </article>
                        <article>
                            <article className="player-details__info-box">
                                <h3>Age</h3>
                                <p>{`${getPlayerAge(playerDetails.dateBorn)}`}</p>
                            </article>
                            <article className="player-details__info-box">
                                <h3>Height</h3>
                                <p>{playerDetails.strHeight}</p>
                            </article>
                            <article className="player-details__info-box">
                                <h3>Weight</h3>
                                <p>{playerDetails.strWeight}</p>
                            </article>
                            <article className="player-details__info-box">
                                <h3>Position</h3>
                                <p>{playerDetails.strPosition}</p>
                            </article>
                            <article className="player-details__info-box">
                                <h3>Preferred Foot</h3>
                                <p>{playerDetails.strSide}</p>
                            </article>
                            <article className="player-details__info-box">
                                <h3>Birth Location</h3>
                                <p>{playerDetails.strBirthLocation}</p>
                            </article>
                            <article className="player-details__info-box">
                                <h3>Agent</h3>
                                <p>{playerDetails.strAgent}</p>
                            </article>
                            <article className="player-details__info-box">
                                <h3>Wage</h3>
                                <p>{playerDetails.strWage}</p>
                            </article>
                            <article className="player-details__info-box">
                                <h3>Signing Fee</h3>
                                <p>{playerDetails.strSigning}</p>
                            </article>
                            <article className="player-details__info-box">
                                <h3>Shirt Number</h3>
                                <p>{playerDetails.strNumber}</p>
                            </article>
                            <article className="player-details__info-box">
                                <h3>Nationality</h3>
                                <p>{playerDetails.strNationality}</p>
                            </article>
                        </article>
                    </article>
                    <article className="player-details__info-box">
                        <h3>About {playerDetails.strPlayer}</h3>
                        <p>{playerDetails.strDescriptionEN}</p>
                    </article>
                </>
            }
        </section>
    )
}

export default PlayerDetails