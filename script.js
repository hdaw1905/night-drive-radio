let bgPlayer;
let musicPlayer;

// Called automatically by YouTube API
function onYouTubeIframeAPIReady() {

  // Background driving video
  bgPlayer = new YT.Player("bg-video", {
    videoId: "spJqqu2H8n4",
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: "spJqqu2H8n4",
      controls: 0,
      mute: 1,
      modestbranding: 1,
      playsinline: 1,
      showinfo: 0
    }
  });

  // Music player (hidden)
  musicPlayer = new YT.Player("music-player", {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
      controls: 0
    }
  });
}

// Extract YouTube video ID
function extractVideoId(url) {
  const regex =
    /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Load music from user link
function playMusic() {
  const url = document.getElementById("ytUrl").value;
  const videoId = extractVideoId(url);

  if (!videoId) {
    alert("❌ Invalid YouTube link");
    return;
  }

  musicPlayer.loadVideoById(videoId);
  musicPlayer.setVolume(50);
}

// Volume control
function setVolume(value) {
  if (musicPlayer) {
    musicPlayer.setVolume(value);
  }
}
