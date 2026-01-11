let bgPlayer;
let musicPlayer;
let apiReady = false;

// YouTube API ready
function onYouTubeIframeAPIReady() {
  apiReady = true;

  // Background driving video
  bgPlayer = new YT.Player("bg-video", {
    width: "100%",
    height: "100%",
    videoId: "spJqqu2H8n4",
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: "spJqqu2H8n4",
      controls: 0,
      modestbranding: 1,
      playsinline: 1,
      rel: 0
    },
    events: {
      onReady: (e) => {
        e.target.mute();       // allow autoplay
        e.target.playVideo(); // FORCE PLAY
        e.target.setVolume(20); // low ambient volume
      }
    }
  });

  // Music player (hidden)
  musicPlayer = new YT.Player("music-player", {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 0,
      controls: 0
    }
  });
}

// Extract video ID
function extractVideoId(url) {
  const match = url.match(
    /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&]+)/i
  );
  return match ? match[1] : null;
}

// User clicks Play → audio allowed
function playMusic() {
  if (!apiReady) {
    alert("Player loading… try again in 1 second.");
    return;
  }

  const url = document.getElementById("ytUrl").value.trim();
  const videoId = extractVideoId(url);

  if (!videoId) {
    alert("❌ Invalid YouTube link");
    return;
  }

  // Start music
  musicPlayer.loadVideoById(videoId);
  musicPlayer.playVideo();
  musicPlayer.setVolume(50);

  // Unmute background after interaction
  bgPlayer.unMute();
  bgPlayer.setVolume(20);
}

// ONE volume slider controls BOTH
function setVolume(value) {
  if (musicPlayer) {
    musicPlayer.setVolume(value);
  }

  if (bgPlayer) {
    // background always quieter (car ambience)
    bgPlayer.setVolume(Math.max(5, value * 0.3));
  }
}
