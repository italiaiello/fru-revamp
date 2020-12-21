export const handleLeagues = (data) => {
    const options = data.countrys.filter(league => {
        if (league.strSport === 'Soccer') {
            if (league.strLeague.includes('Cup') || league.strLeague.includes('Copa') || league.strLeague.includes('Coppa') || league.strLeague.includes('Trophy') || league.strLeague.includes('Champions League') || league.strLeague.includes('Coupe') || league.strLeague.includes('UEFA') || league.strLeague.includes('_') || league.strLeague.includes('Friendlies') || league.strLeague.includes('Shield') || league.strLeague === 'DFB-Pokal') {
                return false
            } else {
                return true
            }  
        }
        return false
    })
    .map(league => league.strLeague)
    .sort();

    return options;
}