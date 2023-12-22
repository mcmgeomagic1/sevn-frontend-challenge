const escudosCores = [
    {
      teamId: "time-a",
      cor: "#FF0000"
    },
    {
      teamId: "time-b",
      cor: "#0038FF"
    },
    {
      teamId: "time-c",
      cor: "#FF9900"
    },
    {
      teamId: "time-d",
      cor: "#72CB00"
    },
    {
      teamId: "time-e",
      cor: "#00C797"
    },
    {
      teamId: "time-f",
      cor: "#0088D4"
    },
    {
      teamId: "time-g",
      cor: "#AD00FF"
    },
    {
      teamId: "time-h",
      cor: "#FF00E6"
    }
  ];
  

document.addEventListener('DOMContentLoaded', async () => {
    let currentRoundIndex = 0;
    const prevRoundBtn = document.getElementById('prevRound');
    const nextRoundBtn = document.getElementById('nextRound');
    const roundNumber = document.getElementById('roundNumber');
    const gameResultsContainer = document.getElementById('gameResultsContainer');
  
    try {
      const response = await fetch('https://sevn-pleno-esportes.deno.dev'); // Replace with your API endpoint
      const data = await response.json();
      const numRounds = data.length;
      
  
      const renderGameDetails = (round) => {
        roundNumber.textContent = `Rodada ${round.round}`;
        const gameDetailsHTML = round.games.map(game => {

        const teamAColor = escudosCores.find(team => team.teamId === game.team_home_id)?.cor ;
        const teamBColor = escudosCores.find(team => team.teamId === game.team_away_id)?.cor ;
        
        return `
          <div class="rodadas-rodadasBody-jogo">
            <div class="flex1">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40" fill="none">
                    <path d="M16 0C14.8835 1.49628 14.1602 4.31649 9.54496 5.01371C9.11253 5.07638 8.70368 5.10772 8.31056 5.10772C5.38575 5.10772 3.61671 3.51743 3.61671 3.51743L0 7.31688C0 7.31688 5.59803 9.10302 1.11646 25.1156C-1.91843 35.9577 14.5926 37.6028 16 40C17.3995 37.6028 33.9106 35.9577 30.8835 25.1156C26.4098 9.10302 32 7.31688 32 7.31688L28.3754 3.51743C28.3754 3.51743 26.6064 5.10772 23.6816 5.10772C23.2885 5.10772 22.8796 5.07638 22.4472 5.01371C17.8398 4.32432 17.1165 1.49628 15.9921 0L16 0Z" fill="url(#paint0_linear_1_28)"/>
                    <defs>
                    <linearGradient id="paint0_linear_1_28" x1="16" y1="0" x2="16" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stop-color="${teamAColor}"/>
                    <stop offset="1" stop-color="${teamAColor}" stop-opacity="0.3"/>
                    </linearGradient>
                    </defs>
                </svg>
              <span>${game.team_home_name}</span>
            </div>
            <div class="flex2">
              <span>${game.team_home_score}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M13 1L1 13" stroke="#D1D1D1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 1L13 13" stroke="#D1D1D1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
              <span>${game.team_away_score}</span>
            </div>
            <div class="flex3">
              <span>${game.team_away_name}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40" fill="none">
                <path d="M16 0C14.8835 1.49628 14.1602 4.31649 9.54496 5.01371C9.11253 5.07638 8.70368 5.10772 8.31056 5.10772C5.38575 5.10772 3.61671 3.51743 3.61671 3.51743L0 7.31688C0 7.31688 5.59803 9.10302 1.11646 25.1156C-1.91843 35.9577 14.5926 37.6028 16 40C17.3995 37.6028 33.9106 35.9577 30.8835 25.1156C26.4098 9.10302 32 7.31688 32 7.31688L28.3754 3.51743C28.3754 3.51743 26.6064 5.10772 23.6816 5.10772C23.2885 5.10772 22.8796 5.07638 22.4472 5.01371C17.8398 4.32432 17.1165 1.49628 15.9921 0L16 0Z" fill="url(#paint0_linear_1_36)"/>
                <defs>
                <linearGradient id="paint0_linear_1_36" x1="16" y1="0" x2="16" y2="40" gradientUnits="userSpaceOnUse">
                <stop stop-color="${teamBColor}"/>
                <stop offset="1" stop-color="${teamBColor}" stop-opacity="0.3"/>
                </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        `}).join('');
  
        gameResultsContainer.innerHTML = gameDetailsHTML;
      };
  
      // Initial rendering of game details
      renderGameDetails(data[currentRoundIndex]);
  
      // Event listeners for navigating between rounds
      prevRoundBtn.addEventListener('click', () => {
        if (currentRoundIndex > 0) {
          currentRoundIndex--;
          nextRoundBtn.style.cursor = "pointer"
          nextRoundBtn.style.pointerEvents = "all"
          nextRoundBtn.style.opacity = 1
          renderGameDetails(data[currentRoundIndex]);
        }
      });
  
      nextRoundBtn.addEventListener('click', () => {
        if (currentRoundIndex < numRounds -1) {
          currentRoundIndex++;
          prevRoundBtn.style.cursor = "pointer"
          prevRoundBtn.style.pointerEvents = "all"
          prevRoundBtn.style.opacity = 1
          renderGameDetails(data[currentRoundIndex]);
        }else{
            nextRoundBtn.style.cursor = "none"
            nextRoundBtn.style.pointerEvents = "none"
            nextRoundBtn.style.opacity = 0.5
        }
      });
    } catch (error) {
      console.error('Error fetching game results:', error);
      gameResultsContainer.innerHTML = '<p>Failed to fetch game results</p>';
    }
  });
  
