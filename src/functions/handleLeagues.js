export const handleLeagues = (data) => {
    const options = data.countries.filter(league => league.idCup === "0")
    .map(league => league.strLeague)
    .sort();

    return options;
}