export function createGameElement(game) {
    const gameElement = document.createElement('div');
    gameElement.className = 'game-item';
    gameElement.innerHTML = `
        <h3>${game.title}</h3>
        <p>${game.description}</p>
        ${game.embedCode}
    `;
    return gameElement;
}

export function initializeGamesSection(games, containerId) {
    const gamesContainer = document.getElementById(containerId);
    
    if (!gamesContainer) {
        console.error(`Games container with ID ${containerId} not found`);
        return;
    }

    games.forEach(game => {
        const gameElement = createGameElement(game);
        gamesContainer.appendChild(gameElement);
    });
}

