export const MARIO_GAMES = [
    {
        title: 'Super Mario (GBA)',
        description: 'Classic Super Mario Bros. from the Game Boy Advance era',
        type: 'Emulated Game',
        embedCode: `
            <iframe 
                src="https://d3rtzzzsiu7gdr.cloudfront.net/files/supermario-gba/index.html" 
                width="100%" 
                height="500px" 
                style="border:3px solid #FF00FF;"
            ></iframe>
        `
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const gamesContainer = document.getElementById('games');
    
    MARIO_GAMES.forEach(game => {
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

export default MARIO_GAMES;