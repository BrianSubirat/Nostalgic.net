export const INTERNET_RELICS = [
    {
        type: 'meme',
        title: 'Dancing Baby',
        description: 'The first viral internet meme from the late 90s',
        mediaUrl: 'https://giphy.com/embed/3o6Zt4HU9uwXmXSAuI',
        year: 1996
    },
    {
        type: 'website',
        title: 'Space Jam Official Website',
        description: 'The iconic, unchanged 1996 Space Jam movie website',
        link: 'https://www.spacejam.com/1996/',
        year: 1996
    },
    {
        type: 'sound',
        title: 'AOL Dial-up Sound',
        description: 'The iconic internet connection sound',
        embedCode: '<audio controls><source src="https://soundbible.com/grab.php?id=1497&type=mp3" type="audio/mpeg"></audio>',
        year: 1990
    },
    {
        type: 'viral-video',
        title: 'Star Wars Kid',
        description: 'One of the earliest viral video memes that became a global internet phenomenon',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/HPPj6viIBmU" title="Star Wars Kid Original Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        year: 2002
    },
    {
        type: 'meme',
        title: 'Numa Numa Guy',
        description: 'The viral internet sensation of Gary Brolsma lip-syncing to a Romanian pop song',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/KmtzQCSh6xk" frameborder="0" allowfullscreen></iframe>',
        year: 2004
    },
    {
        type: 'website',
        title: 'Geocities',
        description: 'The legendary web hosting service that defined early personal web design',
        link: 'https://www.cameronsworld.net/',
        year: 1994
    },
    {
        type: 'social-media',
        title: 'Myspace',
        description: 'The groundbreaking social networking site that defined early 2000s online social interaction',
        link: 'https://myspace.com/',
        year: 2003
    },
    {
        type: 'meme',
        title: 'Nyan Cat',
        description: 'The viral animated cat with a Pop-Tart body flying through space with a rainbow trail',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/wZZ7oFLyd1U" frameborder="0" allowfullscreen></iframe>',
        year: 2011
    },
    {
        type: 'internet-phenomenon',
        title: 'Keyboard Cat',
        description: 'The iconic meme of a cat seemingly "playing" a keyboard',
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/J---aiyznGQ" frameborder="0" allowfullscreen></iframe>',
        year: 2007
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const relicsContainer = document.getElementById('relics');
    
    INTERNET_RELICS.forEach(relic => {
        const relicElement = document.createElement('div');
        relicElement.className = 'relic-item';
        relicElement.innerHTML = `
            <h3>${relic.title} (${relic.year})</h3>
            <p>${relic.description}</p>
            ${relic.mediaUrl ? `<iframe src="${relic.mediaUrl}" width="100%" height="200" frameborder="0"></iframe>` : ''}
            ${relic.embedCode || ''}
            ${relic.link ? `<a href="${relic.link}" target="_blank">Visit Website</a>` : ''}
            ${relic.audioUrl ? `<iframe src="${relic.audioUrl}" width="100%" height="100" frameborder="0"></iframe>` : ''}
        `;
        relicsContainer.appendChild(relicElement);
    });
});

export default INTERNET_RELICS;