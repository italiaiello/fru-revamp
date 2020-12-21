export const fetchTeams = (league, setTeams, setTeamDropdownOptions) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=${league}`)
        .then(response => response.json())
        .then(data => {
            setTeams(data.teams)
            const allTeams = data.teams.map(team => team.strTeam);
            setTeamDropdownOptions(allTeams);
        })
        .catch(err => {
            console.log(err)
        })
}