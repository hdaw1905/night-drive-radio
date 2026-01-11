let bgPlayer;
let musicPlayer;

// This MUST exist globally
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
      playsinline: 1
    },
    events: {
      onReady: function (event) {
        event.target.playVideo();   // start video
      }
    }
  });

  // Music player (hidden)
  musicPlayer = new YT.Player("music-player", {
    height: "0",
    width: "0",
    playerVars: {
      controls: 0
    }
  });
}

// Extract video ID (playlist-safe)
function extractVideoId(url) {
  try {
    const u = new URL(url);
    return u.searchParams.get("v") || u.pathname.split("/").pop();
  } catch {
    return null;
  }
}

// Called ONLY by button click
function playMusic() {
  if (!musicPlayer || !bgPlayer) {
    alert("Player not ready yet, wait 1 second.");
    return;
  }

  const url = document.getElementById("ytUrl").value.trim();
  const id = extractVideoId(url);

  if (!id) {
    alert("Invalid YouTube link");
    return;
  }

  // Play music
  musicPlayer.loadVideoById(id);
  musicPlayer.playVideo();
  musicPlayer.setVolume(50);

  // Enable background sound AFTER user interaction
  bgPlayer.unMute();
  bgPlayer.setVolume(40);
}

// Slider controls MUSIC only
function setVolume(v) {
  if (musicPlayer) {
    musicPlayer.setVolume(v);
  }
}
