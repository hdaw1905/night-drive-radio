let bgPlayer;
let musicPlayer;
let apiReady = false;

// YouTube API ready
function onYouTubeIframeAPIReady() {
  apiReady = true;

  // Background video (MUTED autoplay allowed)
  bgPlayer = new YT.Player("bg-video", {
    width: "100%",
    height: "100%",
    videoId: "spJqqu2H8n4",
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: "spJqqu2H8n4",
      controls: 0,
      mute: 1,
      modestbranding: 1,
      playsinline: 1,
      rel: 0
    },
    events: {
      onReady: (e) => {
        e.target.playVideo(); // force start
      }
    }
  });

  // Music player (hidden, waits for click)
  musicPlayer = new YT.Player("music-player", {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 0,
      controls: 0
    }
  });
}

// Extract video ID safely
function extractVideoId(url) {
  const match = url.match(
    /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&]+)/i
  );
  return match ? match[1] : null;
}

// USER CLICK = AUDIO ALLOWED
function playMusic() {
  if (!apiReady || !musicPlayer) {
    alert("Player not ready yet, wait 1 second and try again.");
    return;
  }

  const url = document.getElementById("ytUrl").value.trim();
  const videoId = extractVideoId(url);

  if (!videoId) {
    alert("❌ Please paste a valid YouTube link");
    return;
  }

  musicPlayer.loadVideoById(videoId);
  musicPlayer.playVideo();   // REQUIRED
  musicPlayer.setVolume(50);
}

// Volume slider
function setVolume(value) {
  if (musicPlayer) {
    musicPlayer.setVolume(value);
  }
}
