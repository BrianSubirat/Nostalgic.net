// This file will help manage the growing complexity of game scripts

export const ADDITIONAL_GAMES = [
    {
        title: 'Space Invaders',
        description: 'The classic arcade shooting game',
        type: 'Embedded Game',
        embedCode: `
            <iframe 
                src="https://spaceinvaders.viperfish.com.au/" 
                width="100%" 
                height="500px" 
                style="border:3px solid #00FF00; background-color: black;"
            ></iframe>
        `
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const gamesContainer = document.getElementById('games');
    
    ADDITIONAL_GAMES.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.className = 'game-item';
        gameElement.innerHTML = `
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            ${game.embedCode}
        `;
        gamesContainer.appendChild(gameElement);
    });
});

export default ADDITIONAL_GAMES;