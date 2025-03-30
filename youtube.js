import config from '../config.js';

class YouTubeNostalgia {
    static NOSTALGIA_VIDEOS = [
        {
            title: 'Keyboard Cat',
            description: 'The legendary internet meme of a cat "playing" an keyboard',
            videoId: 'J---aiyznGQ'
        },
        {
            title: 'Evolution of Dance',
            description: 'Judson Laipply\'s viral dance performance showcasing dance moves through the decades',
            videoId: 'dMH0bHeiRNg'
        },
        {
            title: 'Charlie Bit My Finger',
            description: 'The classic viral video of two young brothers that became an internet sensation',
            videoId: 'wusGIl3v044'
        },
        {
            title: 'OK Go - Here It Goes Again',
            description: 'The viral music video featuring an incredible treadmill dance routine',
            videoId: 'dTAAsCNK7RA'
        }
    ];

    static async fetchNostalgicVideos() {
        // For now, we'll use the pre-defined list
        // In a real implementation, you'd use the YouTube API
        return this.NOSTALGIA_VIDEOS;
    }

    static embedVideos(videos, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        videos.forEach(video => {
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
            container.appendChild(videoWrapper);
        });
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const videos = await YouTubeNostalgia.fetchNostalgicVideos();
    YouTubeNostalgia.embedVideos(videos, 'youtube');
});

export default YouTubeNostalgia;