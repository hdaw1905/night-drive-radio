let backgroundPlayer;
let musicPlayer;
let isPlayerReady = false;
let isMusicPlayerReady = false;

const BACKGROUND_VIDEO_ID = 'spJqqu2H8n4';
const BACKGROUND_VOLUME = 40;
const STORAGE_KEY = 'nightDriveLastUrl';

window.onYouTubeIframeAPIReady = function() {
    backgroundPlayer = new YT.Player('background-player', {
        videoId: BACKGROUND_VIDEO_ID,
        playerVars: {
            autoplay: 1,
            controls: 0,
            mute: 1,
            loop: 1,
            playlist: BACKGROUND_VIDEO_ID,
            playsinline: 1,
            rel: 0,
            showinfo: 0,
            modestbranding: 1,
            iv_load_policy: 3
        },
        events: {
            onReady: onBackgroundPlayerReady,
            onStateChange: onBackgroundStateChange
        }
    });

    musicPlayer = new YT.Player('music-player', {
        playerVars: {
            autoplay: 0,
            controls: 0,
            playsinline: 1
        },
        events: {
            onReady: onMusicPlayerReady
        }
    });
};

function onBackgroundPlayerReady(event) {
    isPlayerReady = true;
    event.target.setVolume(0);
    event.target.playVideo();
}

function onBackgroundStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING && isPlayerReady) {
        event.target.setVolume(BACKGROUND_VOLUME);
    }
}

function onMusicPlayerReady() {
    isMusicPlayerReady = true;
    loadLastUrl();
}

function extractVideoId(url) {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
        /youtube\.com\/embed\/([^&\s]+)/,
        /youtube\.com\/v\/([^&\s]+)/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
        return url.trim();
    }

    return null;
}

function playMusic() {
    if (!isMusicPlayerReady) {
        alert('Player is still loading. Please wait a moment.');
        return;
    }

    const urlInput = document.getElementById('youtube-url');
    const url = urlInput.value.trim();

    if (!url) {
        alert('Please paste a YouTube URL');
        return;
    }

    const videoId = extractVideoId(url);

    if (!videoId) {
        alert('Invalid YouTube URL. Please try again.');
        return;
    }

    try {
        musicPlayer.loadVideoById(videoId);
        musicPlayer.playVideo();

        const volumeSlider = document.getElementById('volume-slider');
        musicPlayer.setVolume(parseInt(volumeSlider.value));

        saveLastUrl(url);
    } catch (error) {
        console.error('Error playing video:', error);
        alert('Error playing video. Please try another URL.');
    }
}

function updateMusicVolume(volume) {
    if (isMusicPlayerReady) {
        musicPlayer.setVolume(parseInt(volume));
    }
}

function saveLastUrl(url) {
    try {
        localStorage.setItem(STORAGE_KEY, url);
    } catch (error) {
        console.error('Could not save to localStorage:', error);
    }
}

function loadLastUrl() {
    try {
        const lastUrl = localStorage.getItem(STORAGE_KEY);
        if (lastUrl) {
            document.getElementById('youtube-url').value = lastUrl;
        }
    } catch (error) {
        console.error('Could not load from localStorage:', error);
    }
}

function togglePlayer() {
    const playerUI = document.getElementById('player-ui');
    const toggleBtn = document.getElementById('toggle-player-btn');

    if (playerUI.classList.contains('hidden')) {
        playerUI.classList.remove('hidden');
        toggleBtn.textContent = 'Hide Player';
    } else {
        playerUI.classList.add('hidden');
        toggleBtn.textContent = 'Show Player';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.getElementById('play-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeValue = document.getElementById('volume-value');
    const toggleBtn = document.getElementById('toggle-player-btn');
    const urlInput = document.getElementById('youtube-url');

    playBtn.addEventListener('click', playMusic);

    urlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            playMusic();
        }
    });

    volumeSlider.addEventListener('input', function() {
        const volume = this.value;
        volumeValue.textContent = volume + '%';
        updateMusicVolume(volume);
    });

    toggleBtn.addEventListener('click', togglePlayer);
});
