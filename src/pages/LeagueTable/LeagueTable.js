import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Dropdown from '../../components/Dropdown/Dropdown'
import Loading from '../../components/Loading/Loading'
import { useDataFetch } from '../../hooks/useDataFetch'

const LeagueTable = ({ leagueId, leagueName, setTeamId }) => {

    const [selectedSeason, setSelectedSeason] = useState('2020-2021')
    const [isLoading, data, error] = useDataFetch(`https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagueId}&s=${selectedSeason}`)

    const [leagueTable, setLeagueTable] = useState([])

    const onSeasonSelect = e => setSelectedSeason(e.target.value)


    useEffect(() => {
        if(data) {
            setLeagueTable(data.table)
        }
    }, [data])

    let history = useHistory();

    return (
        <section className="fru-section">
            {
                isLoading || !leagueTable ?
                <Loading message={"Loading league table..."} />
                :
                <>
                    <h2>{leagueName}</h2>
                    <h3>{`${selectedSeason} Season`}</h3>
                    <Dropdown dropdownOptions={["2020-2021", "2019-2020", "2018-2019", "2017-2018"]} prompt={"Select a season"} onChangeFunction={onSeasonSelect} />
                    {   
                        <article className="league-table-container">
                            <table className="league-table">
                                <thead>
                                    <tr>
                                        <th>Pos</th>
                                        <th>Team</th>
                                        <th>MP</th>
                                        <th>W</th>
                                        <th>D</th>
                                        <th>L</th>
                                        <th>GF</th>
                                        <th>GA</th>
                                        <th>GD</th>
                                        <th>Pts</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        leagueTable.map((team, index) => {
                                            const formattedTeamName = team.name.toLowerCase().split(' ').join('-')
                                            const formattedLeagueName = leagueName.toLowerCase().split(' ').join('-')
                                            return (
                                                <tr key={team.teamid} 
                                                    className="league-table-row option" 
                                                    onClick={() => history.push(`/search-competitions/${formattedLeagueName}/${formattedTeamName}/${team.teamid}`)}
                                                >
                                                    <td>{index + 1}</td>
                                                    <td>{team.name}</td>
                                                    <td>{team.played}</td>
                                                    <td>{team.win}</td>
                                                    <td>{team.draw}</td>
                                                    <td>{team.loss}</td>
                                                    <td>{team.goalsfor}</td>
                                                    <td>{team.goalsagainst}</td>
                                                    <td>{team.goalsdifference}</td>
                                                    <td>{team.total}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </article>
                        
                    }
                </>
                
            }
        </section>
    )
}

export default LeagueTable
