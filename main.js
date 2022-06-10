const selectLeague = document.querySelector('#select-league');
const season = document.querySelector('#season');
const btn = document.querySelector('#btn');
const errorMessage = document.querySelector('#error-message');
const standingsWrapper = document.querySelector('#standings-wrapper');

btn.addEventListener('click', getStandings);

async function getStandings(e) {
    e.preventDefault();
    document.querySelector('tbody').innerHTML = '';

    if(selectLeague.value !== '' && season.value !== '') {
        const leagueID = selectLeague.selectedOptions[0].getAttribute('id');

       const standingsResponse = await fetch(`https://api-football-standings.azharimm.site/leagues/${leagueID}/standings?season=${+season.value}&sort=asc`);

       const standings = await standingsResponse.json();

       displayStandingsToUI(standings)
    } else {
        errorMessage.style.display = 'block';
        
        clearMessage();
    }

    
}

function displayStandingsToUI(standings) {

    document.querySelector('#standings-title').innerHTML = `
        <p>${standings.data.name}</p>
        <p>${standings.data.seasonDisplay}</p>
    `;

    standings.data.standings.forEach((item,index) => {

        
        document.querySelector('tbody').innerHTML += `
        <tr class="team"> 
             <td>
                <span class= 'position'>${index + 1}</span>
                <img class= 'logo' src='${item.team.logos[0].href}' >
                
                ${item.team.name}
             </td> 
             <td>${item.stats[3].value}</td> 
             <td class="not-in-mobile">${item.stats[0].value}</td> 
             <td class="not-in-mobile">${item.stats[2].value}</td> 
             <td class="not-in-mobile">${item.stats[1].value}</td> 
             <td>${item.stats[9].value}</td> 
             <td>${item.stats[6].value}</td> 
        </tr>
    `;
        
    });

    document.querySelector('#standings').style.display = 'block'
}


function clearMessage() {
    setTimeout(() => errorMessage.remove(),2000)
}


window.addEventListener('click', e => e.target == standingsWrapper ? standings.style.display = 'none' : false)
