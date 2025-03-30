export const EXTENDED_CLASSIC_GAMES = [
    {
        title: 'Pac-Man',
        description: 'The iconic maze-chasing arcade game from the 80s',
        type: 'Embedded Game',
        embedCode: `
            <iframe 
                src="https://pacman.live/play.html" 
                width="100%" 
                height="500px" 
                style="border:3px solid #FFFF00;"
            ></iframe>
        `
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const gamesContainer = document.getElementById('games');
    
    EXTENDED_CLASSIC_GAMES.forEach(game => {
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

export default EXTENDED_CLASSIC_GAMES;