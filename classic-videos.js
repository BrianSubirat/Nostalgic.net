export const ADDITIONAL_NOSTALGIA_VIDEOS = [
    {
        title: 'Rick Astley - Never Gonna Give You Up',
        description: 'The iconic Rickroll video that became a massive internet meme',
        videoId: 'dQw4w9WgXcQ'
    },
    {
        title: 'EPIC FAIL Compilation',
        description: 'Classic early 2000s viral compilation of hilarious fail moments',
        videoId: 'kG-4cU3_RL0'
    },
    {
        title: 'David After Dentist',
        description: 'The viral video of a young boy hilariously recovering from anesthesia',
        videoId: 'txqiwrbYGrs'
    }
];

document.addEventListener('DOMContentLoaded', async () => {
    const youtubeContainer = document.getElementById('youtube');
    if (!youtubeContainer) return;

    ADDITIONAL_NOSTALGIA_VIDEOS.forEach(video => {
        const videoWrapper = document.createElement('div');
        videoWrapper.className = 'nostalgic-video';
        videoWrapper.innerHTML = `
            <h3>${video.title}</h3>
            <iframe 
                class="retro-video" 
                src="https://www.youtube.com/embed/${video.videoId}" 
                frameborder="0" 
                allowfullscreen
            ></iframe>
            <p>${video.description}</p>
        `;
        youtubeContainer.appendChild(videoWrapper);
    });
});

export default ADDITIONAL_NOSTALGIA_VIDEOS;