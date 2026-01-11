let bgPlayer;
let musicPlayer;

// YouTube API ready
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
        event.target.playVideo();
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

// Extract YouTube video ID (playlist-safe)
function extractVideoId(url) {
  try {
    const u = new URL(url);
    return u.searchParams.get("v") || u.pathname.split("/").pop();
  } catch {
    return null;
  }
}

// Play music (user click)
function playMusic() {
  if (!musicPlayer || !bgPlayer) {
    alert("Player loading… try again in a moment.");
    return;
  }

  const url = document.getElementById("ytUrl").value.trim();
  const id = extractVideoId(url);

  if (!id) {
    alert("Invalid YouTube link");
    return;
  }

  // 💾 Save last song
  localStorage.setItem("lastSongUrl", url);

  musicPlayer.loadVideoById(id);
  musicPlayer.playVideo();
  musicPlayer.setVolume(50);

  // Background ambience
  bgPlayer.unMute();
  bgPlayer.setVolume(40);
}

// Volume slider → music only
function setVolume(v) {
  if (musicPlayer) {
    musicPlayer.setVolume(v);
  }
}

// 🕹️ Hide / Show player
function togglePlayer() {
  const controls = document.querySelector(".controls");
  controls.classList.toggle("hidden");
}

// Restore last song on load
window.addEventListener("load", () => {
  const lastSong = localStorage.getItem("lastSongUrl");
  if (lastSong) {
    document.getElementById("ytUrl").value = lastSong;
  }
});
