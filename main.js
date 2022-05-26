const selectLeague = document.querySelector('#select-league');
const season = document.querySelector('#season');
const btn = document.querySelector('#btn')

btn.addEventListener('click', getStandings);

async function getStandings(e) {
    e.preventDefault();
    document.querySelector('tbody').innerHTML = ''
    const leagueID = selectLeague.selectedOptions[0].getAttribute('id');

    const standingsResponse = await fetch(`https://api-football-standings.azharimm.site/leagues/${leagueID}/standings?season=${+season.value}&sort=asc`);
    

    const standings = await standingsResponse.json();

    displayStandingsToUI(standings.data.standings)
}

function displayStandingsToUI(standings) {
    standings.forEach(item => {
        document.querySelector('tbody').innerHTML += `
        <tr class="team"> 
             <td>${item.team.name}</td> 
             <td>${item.stats[3].value}</td> 
             <td>${item.stats[0].value}</td> 
             <td>${item.stats[2].value}</td> 
             <td>${item.stats[1].value}</td> 
             <td>${item.stats[9].value}</td> 
             <td>${item.stats[6].value}</td> 
        </tr>
    `;
    });
}



