import React, { useEffect, useState } from 'react'
import { useDataFetch } from '../../hooks/useDataFetch';
import Loading from '../Loading/Loading';
import './TeamPlayersAndManager.scss'

const TeamPlayersAndManager = ({ teamId }) => {

    const [isLoading, players, error] = useDataFetch(`https://www.thesportsdb.com/api/v1/json/50130162/lookup_all_players.php?id=${teamId}`)

    const [manager, setManager] = useState(null)
    const [goalkeepers, setGoalkeepers] = useState([])
    const [defenders, setDefenders] = useState([])
    const [midfielders, setMidfielders] = useState([])
    const [forwards, setForwards] = useState([])

    useEffect(() => {
        if (players && players.player) {
            setManager(players.player.filter(player => player.strPosition.toLowerCase() === "manager"))
            setGoalkeepers(players.player.filter(player => player.strPosition.toLowerCase() === "goalkeeper"))
            setDefenders(players.player.filter(player => player.strPosition.toLowerCase() === "defender" || player.strPosition.toLowerCase() === "centre back" || player.strPosition.toLowerCase() === "full-back"))
            setMidfielders(players.player.filter(player => player.strPosition.toLowerCase() === "midfielder" || player.strPosition.toLowerCase() === "winger"))
            setForwards(players.player.filter(player => player.strPosition.toLowerCase() === "forward"))
        }

    }, [players])

    if (error) {
        console.log(error)
        return <>Network error</>
    }

    const getExistingImage = (thumb, cutout, render) => {

        console.log(thumb, cutout, render)

        if (cutout) {
            return cutout
        } else if (thumb) {
            return thumb
        } else if (render) {
            return render
        } else {
            return null
        }
    }

    return (
        <section className="player-section">
            {
                isLoading ?
                <Loading message={"Loading players..."} />
                :
                <>
                    {
                        manager && manager.length &&
                        <article>
                            <h2>Manager</h2>
                            <article className="player-section__player-card-container">
                                <article className="player-section__player-card-container--player-card">
                                    {
                                        getExistingImage(manager[0].strThumb, manager[0].strCutout, manager[0].strRender) !== null &&
                                        <figure>
                                            <img src={getExistingImage(manager[0].strThumb, manager[0].strCutout, manager[0].strRender)} alt={manager[0].strPlayer} />
                                        </figure>
                                    }
                                    <p>{manager[0].strPlayer}</p>
                                </article>
                            </article>
                        </article>
                    }

                    <section>
                        <article>
                            <h2>Goalkeepers</h2>
                            <article className="player-section__player-card-container">
                                {
                                    goalkeepers.map(keeper => (
                                        <article className="player-section__player-card-container--player-card">
                                            {
                                                getExistingImage(keeper.strThumb, keeper.strCutout, keeper.strRender) !== null &&
                                                <figure>
                                                    <img src={getExistingImage(keeper.strThumb, keeper.strCutout, keeper.strRender)} alt={keeper.strPlayer} alt={keeper.strPlayer} />
                                                </figure>
                                            }
                                            <p>{keeper.strPlayer}</p>
                                        </article>
                                    ))
                                }
                            </article>
                        </article>
                        <article>
                            <h2>Defenders</h2>
                            <article className="player-section__player-card-container">
                                {
                                    defenders.map(defender => (
                                        <article className="player-section__player-card-container--player-card">
                                            {
                                                getExistingImage(defender.strThumb, defender.strCutout, defender.strRender) !== null &&
                                                <figure>
                                                    <img src={getExistingImage(defender.strThumb, defender.strCutout, defender.strRender)} alt={defender.strPlayer} />
                                                </figure>
                                            }
                                            <p>{defender.strPlayer}</p>
                                        </article>
                                    ))
                                }
                            </article>
                        </article>
                        <article>
                            <h2>Midfielders</h2>
                            <article className="player-section__player-card-container">
                                {
                                    midfielders.map(midfielder => (
                                        <article className="player-section__player-card-container--player-card">
                                            {
                                                getExistingImage(midfielder.strThumb, midfielder.strCutout, midfielder.strRender) !== null &&
                                                <figure>
                                                    <img src={getExistingImage(midfielder.strThumb, midfielder.strCutout, midfielder.strRender)} alt={midfielder.strPlayer} />
                                                </figure>
                                            }
                                            <p>{midfielder.strPlayer}</p>
                                        </article>
                                    ))
                                }
                            </article>
                        </article>
                        <article>
                            <h2>Forwards</h2>
                            <article className="player-section__player-card-container">
                                {
                                    forwards.map(forward => (
                                        <article className="player-section__player-card-container--player-card">
                                            {
                                                getExistingImage(forward.strThumb, forward.strCutout, forward.strRender) !== null &&
                                                <figure>
                                                    <img src={getExistingImage(forward.strThumb, forward.strCutout, forward.strRender)} alt={forward.strPlayer} />
                                                </figure>
                                            }
                                            <p>{forward.strPlayer}</p>
                                        </article>
                                    ))
                                }
                            </article>
                        </article>
                    </section>
                </>
            }
        </section>
    )
}

export default TeamPlayersAndManager