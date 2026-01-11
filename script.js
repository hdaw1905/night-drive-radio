let bgPlayer;
let musicPlayer;

function onYouTubeIframeAPIReady() {

  // Background driving video (this is the WORKING way)
  bgPlayer = new YT.Player("bg-video", {
    videoId: "spJqqu2H8n4",
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: "spJqqu2H8n4",
      controls: 0,
      mute: 1,
      playsinline: 1
    }
  });

  // Music player
  musicPlayer = new YT.Player("music-player", {
    height: "0",
    width: "0",
    playerVars: { controls: 0 }
  });
}

// Extract ID
function extractVideoId(url) {
  const m = url.match(/(?:v=|\.be\/)([^&]+)/);
  return m ? m[1] : null;
}

function playMusic() {
  const url = document.getElementById("ytUrl").value;
  const id = extractVideoId(url);

  if (!id) {
    alert("Invalid YouTube link");
    return;
  }

  // Music
  musicPlayer.loadVideoById(id);
  musicPlayer.playVideo();

  // Enable background sound AFTER click
  bgPlayer.unMute();

  setVolume(50);
}

// ONE slider → BOTH players
function setVolume(v) {
  musicPlayer.setVolume(v);

  // background quieter (car ambience)
  bgPlayer.setVolume(Math.max(5, v * 0.25));
}
