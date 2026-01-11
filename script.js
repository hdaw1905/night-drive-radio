let bgPlayer;
let musicPlayer;

function onYouTubeIframeAPIReady() {

  // Background driving video (fixed 55% volume)
  bgPlayer = new YT.Player("bg-video", {
    videoId: "spJqqu2H8n4",
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: "spJqqu2H8n4",
      controls: 0,
      mute: 1,          // required for autoplay
      playsinline: 1
    },
    events: {
      onReady: (e) => {
        e.target.unMute();     // enable sound after load
        e.target.setVolume(55); // ✅ FIXED at 55%
        e.target.playVideo();
      }
    }
  });

  // Music player (hidden)
  musicPlayer = new YT.Player("music-player", {
    height: "0",
    width: "0",
    playerVars: { controls: 0 }
  });
}

// Extract YouTube video ID
function extractVideoId(url) {
  const match = url.match(/(?:v=|\.be\/)([^&]+)/);
  return match ? match[1] : null;
}

// Play user music (after click)
function playMusic() {
  const url = document.getElementById("ytUrl").value.trim();
  const id = extractVideoId(url);

  if (!id) {
    alert("Invalid YouTube link");
    return;
  }

  musicPlayer.loadVideoById(id);
  musicPlayer.playVideo();
}

// Volume slider → MUSIC ONLY
function setVolume(v) {
  if (musicPlayer) {
    musicPlayer.setVolume(v);
  }
}
