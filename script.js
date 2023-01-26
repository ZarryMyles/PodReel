// Button toggler with 2 states for the before and after podreel section
let sections = [1, 0];
function switchSection(portion, section) {
  if (portion == 0 && sections[portion] != section) {
    if (section == 1) {
      sections[portion] = section;
      document.getElementById("beforePodreelSelection").style.backgroundColor =
        "white";
      document.getElementById("afterPodreelSelection").style.backgroundColor =
        "transparent";
      document.getElementById("beforePodreel").style.display = "flex";
      document.getElementById("afterPodreel").style.display = "none";

      document.getElementById("selection1").style.backgroundColor = "#FB999C";

      document.getElementById("beforePodreelSelection").style.color = "#000000";
      document.getElementById("afterPodreelSelection").style.color =
        "rgba(255,255,255,.6)";
    }
    if (section == 2) {
      sections[portion] = section;
      document.getElementById("beforePodreelSelection").style.backgroundColor =
        "transparent";
      document.getElementById("afterPodreelSelection").style.backgroundColor =
        "white";
      document.getElementById("beforePodreel").style.display = "none";
      document.getElementById("afterPodreel").style.display = "flex";

      document.getElementById("selection1").style.backgroundColor = "#77DA87";

      document.getElementById("afterPodreelSelection").style.color = "#000000";
      document.getElementById("beforePodreelSelection").style.color =
        "rgba(255,255,255,.6)";
    }
  } else if (portion == 1 && sections[portion] != section) {
    if (section == 1) {
      sections[portion] = section;
      document.getElementById("audioPodcasts").style.backgroundColor = "white";
      document.getElementById("videoPodcasts").style.backgroundColor =
        "transparent";
      document.getElementById("audioToInspire").style.display = "flex";
      document.getElementById("videoToInspire").style.display = "none";

      document.getElementById("audioPodcasts").style.color = "#000000";
      document.getElementById("videoPodcasts").style.color =
        "rgba(255,255,255,.6)";
    }
    if (section == 2) {
      sections[portion] = section;
      document.getElementById("audioPodcasts").style.backgroundColor =
        "transparent";
      document.getElementById("videoPodcasts").style.backgroundColor = "white";
      document.getElementById("audioToInspire").style.display = "none";
      document.getElementById("videoToInspire").style.display = "flex";

      document.getElementById("videoPodcasts").style.color = "#000000";
      document.getElementById("audioPodcasts").style.color =
        "rgba(255,255,255,.6)";
    }
  }
}

// Button toggler with 4 states for the share section
function switchShareSection(number) {
  // Set all buttons to inactive
  document.getElementById("shareOption1").style.backgroundColor = "transparent";
  document.getElementById("shareOption2").style.backgroundColor = "transparent";
  document.getElementById("shareOption3").style.backgroundColor = "transparent";
  document.getElementById("shareOption4").style.backgroundColor = "transparent";
  document.getElementById("shareOption1").style.color = "rgba(255,255,255,.6)";
  document.getElementById("shareOption2").style.color = "rgba(255,255,255,.6)";
  document.getElementById("shareOption3").style.color = "rgba(255,255,255,.6)";
  document.getElementById("shareOption4").style.color = "rgba(255,255,255,.6)";

  // Set the selected button to active
  document.getElementById("shareOption" + number).style.backgroundColor =
    "white";
  document.getElementById("shareOption" + number).style.color = "#000000";

  // change the video link
  if (number == 1) {
    document.getElementById("shareImage").src =
      "assets/shareSection/podcast.gif";
  }
  if (number == 2) {
    document.getElementById("shareImage").src =
      "assets/shareSection/webpage.png";
  }
  if (number == 3) {
    document.getElementById("shareImage").src =
      "assets/shareSection/social.png";
  }
  if (number == 4) {
    document.getElementById("shareImage").src =
      "assets/shareSection/transcript.png";
  }
}

// Animation for the stars
const { TweenMax, _ } = window;
/**
 * Utility function for returning a random integer in a given range
 * @param {Int} max
 * @param {Int} min
 */
const randomInRange = (max, min) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const ACTIVE_PROBABILITY = 0;
const BASE_SIZE = 1;
const VELOCITY_INC = 1.11;
const VELOCITY_INIT_INC = 1.025;
const JUMP_VELOCITY_INC = 1.25;
const JUMP_SIZE_INC = 1.15;
const SIZE_INC = 1.01;
const RAD = Math.PI / 180;
const WARP_COLORS = [
  [197, 239, 247],
  [25, 181, 254],
  [77, 5, 232],
  [165, 55, 253],
  [255, 255, 255],
];
/**
 * Class for storing the particle metadata
 * position, size, length, speed etc.
 */
class Star {
  STATE = {
    alpha: Math.random(),
    angle: randomInRange(0, 360) * RAD,
  };
  reset = () => {
    const angle = randomInRange(0, 360) * (Math.PI / 180);
    const vX = Math.cos(angle);
    const vY = Math.sin(angle);
    const travelled =
      Math.random() > 0.5
        ? Math.random() *
            Math.max(
              window.innerWidth,
              document.getElementById("container").offsetHeight
            ) +
          Math.random() * (window.innerWidth * 0.24)
        : Math.random() * (window.innerWidth * 0.25);
    this.STATE = {
      ...this.STATE,
      iX: undefined,
      iY: undefined,
      active: travelled ? true : false,
      x: Math.floor(vX * travelled) + window.innerWidth / 2,
      vX,
      y:
        Math.floor(vY * travelled) +
        document.getElementById("container").offsetHeight / 2,
      vY,
      size: BASE_SIZE,
    };
  };
  constructor() {
    this.reset();
  }
}

const generateStarPool = (size) => new Array(size).fill().map(() => new Star());

// Class for the actual app
// Not too much happens in here
// Initiate the drawing process and listen for user interactions 👍
class JumpToHyperspace {
  STATE = {
    stars: generateStarPool(300),
    bgAlpha: 0,
    sizeInc: SIZE_INC,
    velocity: VELOCITY_INC,
  };
  canvas = document.createElement("canvas");
  context = this.canvas.getContext("2d");
  constructor() {
    this.bind();
    this.setup();
    document.getElementById("background").appendChild(this.canvas);
    this.render();
  }
  render = () => {
    const {
      STATE: { bgAlpha, velocity, sizeInc, initiating, jumping, stars },
      context,
      render,
    } = this;
    // Clear the canvas
    context.clearRect(
      0,
      0,
      window.innerWidth,
      document.getElementById("container").offsetHeight
    );
    if (bgAlpha > 0) {
      context.fillStyle = `rgba(31, 58, 157, ${bgAlpha})`;
      context.fillRect(
        0,
        0,
        window.innerWidth,
        document.getElementById("container").offsetHeight
      );
    }
    // 1. Shall we add a new star
    const nonActive = stars.filter((s) => !s.STATE.active);
    if (!initiating && nonActive.length > 0) {
      // Introduce a star
      nonActive[0].STATE.active = true;
    }
    // 2. Update the stars and draw them.
    for (const star of stars.filter((s) => s.STATE.active)) {
      const { active, x, y, iX, iY, iVX, iVY, size, vX, vY } = star.STATE;
      // Check if the star needs deactivating
      if (
        ((iX || x) < 0 ||
          (iX || x) > window.innerWidth ||
          (iY || y) < 0 ||
          (iY || y) > document.getElementById("container").offsetHeight) &&
        active &&
        !initiating
      ) {
        star.reset(true);
      } else if (active) {
        const newIX = initiating ? iX : iX + iVX;
        const newIY = initiating ? iY : iY + iVY;
        const newX = x + vX;
        const newY = y + vY;
        // Just need to work out if it overtakes the original line that's all
        const caught =
          (vX < 0 && newIX < x) ||
          (vX > 0 && newIX > x) ||
          (vY < 0 && newIY < y) ||
          (vY > 0 && newIY > y);
        star.STATE = {
          ...star.STATE,
          iX: caught ? undefined : newIX,
          iY: caught ? undefined : newIY,
          iVX: caught ? undefined : iVX * VELOCITY_INIT_INC,
          iVY: caught ? undefined : iVY * VELOCITY_INIT_INC,
          x: newX,
          vX: star.STATE.vX * velocity,
          y: newY,
          vY: star.STATE.vY * velocity,
          size: initiating ? size : size * (iX || iY ? SIZE_INC : sizeInc),
        };
        let color = `rgba(255, 255, 255, ${star.STATE.alpha})`;
        if (jumping) {
          const [r, g, b] = WARP_COLORS[randomInRange(0, WARP_COLORS.length)];
          color = `rgba(${r}, ${g}, ${b}, ${star.STATE.alpha})`;
        }
        context.strokeStyle = color;
        context.lineWidth = size;
        context.beginPath();
        context.moveTo(star.STATE.iX || x, star.STATE.iY || y);
        context.lineTo(star.STATE.x, star.STATE.y);
        context.stroke();
      }
    }
    requestAnimationFrame(render);
  };
  initiate = () => {
    if (this.STATE.jumping || this.STATE.initiating) return;
    this.STATE = {
      ...this.STATE,
      initiating: true,
      initiateTimestamp: new Date().getTime(),
    };
    TweenMax.to(this.STATE, 0.25, {
      velocity: VELOCITY_INIT_INC,
      bgAlpha: 0.3,
    });
    // When we initiate, stop the XY origin from moving so that we draw
    // longer lines until the jump
    for (const star of this.STATE.stars.filter((s) => s.STATE.active)) {
      star.STATE = {
        ...star.STATE,
        iX: star.STATE.x,
        iY: star.STATE.y,
        iVX: star.STATE.vX,
        iVY: star.STATE.vY,
      };
    }
  };
  jump = () => {
    this.STATE = {
      ...this.STATE,
      bgAlpha: 0,
      jumping: true,
    };
    TweenMax.to(this.STATE, 0.25, {
      velocity: JUMP_VELOCITY_INC,
      bgAlpha: 0.75,
      sizeInc: JUMP_SIZE_INC,
    });
    setTimeout(() => {
      this.STATE = {
        ...this.STATE,
        jumping: false,
      };
      TweenMax.to(this.STATE, 0.25, {
        bgAlpha: 0,
        velocity: VELOCITY_INC,
        sizeInc: SIZE_INC,
      });
    }, 2500);
  };
  enter = () => {
    if (this.STATE.jumping) return;
    const { initiateTimestamp } = this.STATE;
    this.STATE = {
      ...this.STATE,
      initiating: false,
      initiateTimestamp: undefined,
    };
    if (new Date().getTime() - initiateTimestamp > 600) {
      this.jump();
    } else {
      TweenMax.to(this.STATE, 0.25, { velocity: VELOCITY_INC, bgAlpha: 0 });
    }
  };
  bind = () => {
    this.canvas.addEventListener("mousedown", this.initiate);
    this.canvas.addEventListener("touchstart", this.initiate);
    this.canvas.addEventListener("mouseup", this.enter);
    this.canvas.addEventListener("touchend", this.enter);
  };
  setup = () => {
    this.context.lineCap = "round";
    this.canvas.height = document.getElementById("container").offsetHeight;
    this.canvas.width = window.innerWidth;
  };
  reset = () => {
    this.STATE = {
      ...this.STATE,
      stars: generateStarPool(300),
    };
    this.setup();
  };
}
window.myJump = new JumpToHyperspace();
window.addEventListener(
  "resize",
  function () {
    window.setTimeout(function () {
      window.myJump.reset();
    }, 500);
  },
  250
);
