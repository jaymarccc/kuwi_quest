// ==========================
// KUWI QUEST MAIN SCRIPT (fixed)
// ==========================

/* Elements */
const scene = document.getElementById('scene');
const welcome = document.getElementById('welcome');
const startBtn = document.getElementById('startBtn');
const fullscreenBtn = document.getElementById('fullscreen-btn');

scene.style.backgroundImage = "url('images/1.png')";

// Maintain 1920x1080 scaling
function resizeScene() {
  const scaleX = window.innerWidth / 1920;
  const scaleY = window.innerHeight / 1080;
  const scale = Math.min(scaleX, scaleY);
  scene.style.transform = `translate(-50%, -50%) scale(${scale})`;
}
window.addEventListener('resize', resizeScene);
resizeScene();

// --- Step 1: Start Game ---
startBtn.addEventListener('click', async () => {
  try {
    await document.documentElement.requestFullscreen();
  } catch (err) {
    console.warn('Fullscreen request failed:', err);
  }
  welcome.style.opacity = '0';
  setTimeout(() => (welcome.style.display = 'none'), 500);
  document.body.addEventListener('click', showFirstStoryPage, { once: true });
});

// --- Step 2: First story page (go to 69 per your flow) ---
function showFirstStoryPage() {
  goToScene(2);
}

// --- Universal Scene Transition ---
function changeScene(imagePath, callback = null) {
  scene.classList.add('fade-out');
  setTimeout(() => {
    scene.style.backgroundImage = `url('${imagePath}')`;
    scene.classList.remove('fade-out');
    scene.classList.add('fade-in');
    if (callback) callback();
    setTimeout(() => scene.classList.remove('fade-in'), 600);
  }, 400);
}

// --- Main Scene Navigator ---
let currentScene = 0;
function goToScene(sceneNumber) {
  currentScene = sceneNumber;
  removeSceneButtons();

  const imagePath = sceneNumber === 1 ? `images/1.png` : `new_images/${sceneNumber}.png`;
  const prevImage = sceneNumber - 1 === 1 ? `images/1.png` : `new_images/${sceneNumber - 1}.png`;
  const nextImage = `new_images/${sceneNumber + 1}.png`;

  changeScene(imagePath, () => {
    // handle scenes
    if (sceneNumber === 2) {
      createNextButton(nextImage);
    } else if (sceneNumber >= 3 && sceneNumber <= 9) {
      createPrevNextButtons(prevImage, nextImage);
    } else if (sceneNumber === 10) {
      createXYButtons(prevImage, nextImage);
    } else if (sceneNumber === 11) {
      createPrevNextButtons(prevImage, nextImage);
    } else if (sceneNumber === 12) {
      // video scene
      removeSceneButtons();
      scene.innerHTML = '';
      const video = document.createElement('video');
      video.src = 'new_images/KUWI QUEST.mp4';
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      Object.assign(video.style, {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        top: '0',
        left: '0',
        opacity: '0',
        transition: 'opacity 0.5s ease'
      });
      scene.appendChild(video);
      requestAnimationFrame(() => (video.style.opacity = '1'));
      const nextScene = () => {
        video.style.opacity = '0';
        setTimeout(() => {
          video.remove();
          goToScene(13);
        }, 500);
      };
      video.addEventListener('ended', nextScene);
      setTimeout(nextScene, 3000);
    } else if (sceneNumber === 13) {
      changeScene('new_images/13.png', () => {
        createTopLeftButtons();
        createTopRightButtons();
        createCharacterCardsGrid();
        createBottomLeftButtons();
        createLockinCard();
      });
    } else if (sceneNumber === 14) {
      changeScene('new_images/14.png', () => {
        createHomeButton();
      });
    } else if (sceneNumber === 16) {
      changeScene('new_images/16.png', () => {
        createHomeButton();
      });
    } else if (sceneNumber === 18) {
      changeScene('new_images/18.png', () => {
        createHomeButton();
        createPlayButton(19);
      });
    } else if (sceneNumber === 19) {
      changeScene('new_images/19.png', () => {
        createPrevNextButtons(prevImage, nextImage);
      });
    } else if (sceneNumber === 20) {
      changeScene('new_images/20.png', () => {
        createPrevNextButtons(prevImage, nextImage);
      });
    } else if (sceneNumber === 21) {
      changeScene('new_images/21.png', () => {
        createPrevNextButtons(prevImage, nextImage);
      });
    } else if (sceneNumber === 22) {
      changeScene('new_images/22.png', () => {
        createPrevNextButtons(prevImage, nextImage);
      });
    } else if (sceneNumber === 23) {
      changeScene('new_images/23.png', () => {
        createPrevNextButtons(prevImage, nextImage);
      });
    } else if (sceneNumber === 24) {
      changeScene('new_images/24.png', () => {
        createOOButton(25);
        createHindiButton();
      });
    } else if (sceneNumber === 25) {
      changeScene('new_images/25.png', () => {
        createPrevNextButtons(prevImage, nextImage);
      });
    } else if (sceneNumber === 26) {
      changeScene('new_images/26.png', () => {
        createCrosswordInputs();
      });
    } else if (sceneNumber === 39) {
      changeScene('new_images/39.png', () => {
        createHomeButton();
        createPlayButton(40);
      });
    } else if (sceneNumber >= 40 && sceneNumber <= 44) {
      createPrevNextButtons(prevImage, nextImage);
    }  else if (sceneNumber === 45) {
      changeScene('new_images/45.png', () => {
        createOOButton(46);
        createHindiButton();
      });
    } else if (sceneNumber === 46) {
      createPrevNextButtons(prevImage, nextImage);
    } 
    
    
else if (sceneNumber === 47) {
  // === Scene 47: Drag & Drop Sentence Builder (fixed button handlers) ===

  // ensure scene background is set (optiona

  // Create game container
  const gameContainer = document.createElement("div");
  Object.assign(gameContainer.style, {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "40px",
    zIndex: "999",                    // very high so clicks reach buttons
    fontFamily: "'Marykate', cursive",
    pointerEvents: "auto"             // ensure it accepts pointer events
  });

  // Words (draggable) and correct answer (separate)
  const words = ["ako", "Tumahi", "bagong", "ng", "para", "damit", "sayo."];
  const correctAnswer = ["Tumahi", "ako", "ng", "bagong", "damit", "para", "sayo."];

  // Shuffle copy for presenting to player
  const shuffled = words
    .map(w => ({ w, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(o => o.w);

  // Words container
  const wordsContainer = document.createElement("div");
  Object.assign(wordsContainer.style, {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    pointerEvents: "auto"
  });

  // Create draggable boxes (use full 500x500 image size)
  shuffled.forEach(word => {
    const box = document.createElement("div");
    box.textContent = word;
    Object.assign(box.style, {
      backgroundImage: "url('new_images/box_placeholder.png')",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "150px",
      height: "150px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2em",
      fontWeight: "600",
      color: "#3b2b1b",
      cursor: "grab",
      userSelect: "none",
      textShadow: "2px 2px 3px rgba(0,0,0,0.25)",
      fontFamily: "'Marykate', cursive",
      backgroundColor: "transparent",
      pointerEvents: "auto"
    });

    box.draggable = true;
    box.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", word);
      box.style.opacity = "0.5";
    });
    box.addEventListener("dragend", e => {
      box.style.opacity = "1";
    });

    wordsContainer.appendChild(box);
  });

  // Drop zone (slots)
  const dropZone = document.createElement("div");
  Object.assign(dropZone.style, {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "15px",
    padding: "20px",
    pointerEvents: "auto"
  });

  // create one slot per correctAnswer entry
  correctAnswer.forEach(() => {
    const slot = document.createElement("div");
    slot.textContent = ""; // initially empty
    Object.assign(slot.style, {
      backgroundImage: "url('new_images/box_placeholder.png')",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "150px",
      height: "150px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      fontSize: "2em",
      color: "#3b2b1b",
      fontFamily: "'Marykate', cursive",
      backgroundColor: "transparent",
      pointerEvents: "auto"
    });

    slot.addEventListener("dragover", e => {
      e.preventDefault();
    });

    slot.addEventListener("drop", e => {
      e.preventDefault();
      const word = e.dataTransfer.getData("text/plain");
      // Allow drop only if slot empty
      if (!slot.textContent.trim()) {
        slot.textContent = word;
        // hide the dragged original
        const draggedOriginal = [...wordsContainer.children].find(c => c.textContent === word && c.style.visibility !== "hidden");
        if (draggedOriginal) draggedOriginal.style.visibility = "hidden";
      }
    });

    dropZone.appendChild(slot);
  });

  // Submit (I-submit) button
  const submitButton = document.createElement("button");
  submitButton.textContent = 'I-submit';
  Object.assign(submitButton.style, {
    padding: '14px 30px',
    fontSize: '1.3em',
    fontWeight: '600',
    border: 'none',
    borderRadius: '10px',
    backgroundColor: '#f5e0ab',
    color: '#000',
    cursor: 'pointer',
    marginTop: '25px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s ease, filter 0.2s ease',
    fontFamily: "'Marykate', cursive",
    pointerEvents: "auto"
  });

  // Use onclick and goToScene (not loadScene) — goToScene is what your code uses
submitButton.onclick = () => {
  const sentence = Array.from(dropZone.children)
    .map(c => c.textContent.trim())
    .filter(t => t !== "")
    .join(' ');

  // 🧹 remove buttons before scene change
  submitButton.remove();
  redoButton.remove();
wordsContainer.remove();
  dropZone.remove();

  // proceed to next scene
  if (sentence === correctAnswer.join(' ')) {
    goToScene(48);
  } else {
    goToScene(56);
  }
};


  // Redo / Ulitin button
  const redoButton = document.createElement("button");
  redoButton.textContent = 'Ulitin';
  Object.assign(redoButton.style, {
    padding: '14px 30px',
    fontSize: '1.3em',
    fontWeight: '600',
    border: 'none',
    borderRadius: '10px',
    backgroundColor: '#f5e0ab',
    color: '#000',
    cursor: 'pointer',
    marginTop: '25px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s ease, filter 0.2s ease',
    fontFamily: "'Marykate', cursive",
    pointerEvents: "auto"
  });

  // Reset by reloading the same scene via goToScene (will rebuild the scene)
  redoButton.onclick = () => {
    // remove this gameContainer first to avoid duplicates
    gameContainer.remove();
    // call goToScene(47) which will re-enter this block
    goToScene(47);
  };

  // Append in sensible order, then add Prev/Next buttons last so they don't steal z-order
  gameContainer.appendChild(wordsContainer);
  gameContainer.appendChild(dropZone);

  const controls = document.createElement("div");
  controls.style.display = "flex";
  controls.style.gap = "12px";
  controls.style.justifyContent = "center";
  controls.appendChild(submitButton);
  controls.appendChild(redoButton);

  gameContainer.appendChild(controls);

  scene.appendChild(gameContainer);
}

else if (sceneNumber === 56) {
      changeScene('new_images/56.png', () => {
        removeSceneButtons()
        createPrevButton(46);
      });
    }
    else if (sceneNumber === 48) {
      changeScene('new_images/48.png', () => {
        removeSceneButtons()
        createNextButton(49);
      });
    }
else if (sceneNumber === 49) {
    changeScene('new_images//47.png', () => {
  // === Scene 47: Drag & Drop Sentence Builder (fixed button handlers) ===

  // ensure scene background is set (optiona

  // Create game container
  const gameContainer = document.createElement("div");
  Object.assign(gameContainer.style, {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "40px",
    zIndex: "999",                    // very high so clicks reach buttons
    fontFamily: "'Marykate', cursive",
    pointerEvents: "auto"             // ensure it accepts pointer events
  });

  // Words (draggable) and correct answer (separate)
  const words = ["Gusto", "mo", "sukatin", "bang", "ito?"];
  const correctAnswer = ["Gusto", "mo", "bang", "sukatin", "ito?"];

  // Shuffle copy for presenting to player
  const shuffled = words
    .map(w => ({ w, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(o => o.w);

  // Words container
  const wordsContainer = document.createElement("div");
  Object.assign(wordsContainer.style, {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    pointerEvents: "auto"
  });

  // Create draggable boxes (use full 500x500 image size)
  shuffled.forEach(word => {
    const box = document.createElement("div");
    box.textContent = word;
    Object.assign(box.style, {
      backgroundImage: "url('new_images/box_placeholder.png')",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "150px",
      height: "150px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2em",
      fontWeight: "600",
      color: "#3b2b1b",
      cursor: "grab",
      userSelect: "none",
      textShadow: "2px 2px 3px rgba(0,0,0,0.25)",
      fontFamily: "'Marykate', cursive",
      backgroundColor: "transparent",
      pointerEvents: "auto"
    });

    box.draggable = true;
    box.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", word);
      box.style.opacity = "0.5";
    });
    box.addEventListener("dragend", e => {
      box.style.opacity = "1";
    });

    wordsContainer.appendChild(box);
  });

  // Drop zone (slots)
  const dropZone = document.createElement("div");
  Object.assign(dropZone.style, {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "15px",
    padding: "20px",
    pointerEvents: "auto"
  });

  // create one slot per correctAnswer entry
  correctAnswer.forEach(() => {
    const slot = document.createElement("div");
    slot.textContent = ""; // initially empty
    Object.assign(slot.style, {
      backgroundImage: "url('new_images/box_placeholder.png')",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "150px",
      height: "150px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      fontSize: "2em",
      color: "#3b2b1b",
      fontFamily: "'Marykate', cursive",
      backgroundColor: "transparent",
      pointerEvents: "auto"
    });

    slot.addEventListener("dragover", e => {
      e.preventDefault();
    });

    slot.addEventListener("drop", e => {
      e.preventDefault();
      const word = e.dataTransfer.getData("text/plain");
      // Allow drop only if slot empty
      if (!slot.textContent.trim()) {
        slot.textContent = word;
        // hide the dragged original
        const draggedOriginal = [...wordsContainer.children].find(c => c.textContent === word && c.style.visibility !== "hidden");
        if (draggedOriginal) draggedOriginal.style.visibility = "hidden";
      }
    });

    dropZone.appendChild(slot);
  });

  // Submit (I-submit) button
  const submitButton = document.createElement("button");
  submitButton.textContent = 'I-submit';
  Object.assign(submitButton.style, {
    padding: '14px 30px',
    fontSize: '1.3em',
    fontWeight: '600',
    border: 'none',
    borderRadius: '10px',
    backgroundColor: '#f5e0ab',
    color: '#000',
    cursor: 'pointer',
    marginTop: '25px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s ease, filter 0.2s ease',
    fontFamily: "'Marykate', cursive",
    pointerEvents: "auto"
  });

  // Use onclick and goToScene (not loadScene) — goToScene is what your code uses
submitButton.onclick = () => {
  // 🧩 Normalize both player sentence and correct answer for fair comparison
  const sentence = Array.from(dropZone.children)
    .map(c => c.textContent.trim())
    .filter(t => t !== "")
    .join(' ')
    .toLowerCase()
    .replace(/\s+/g, ' ');

  const correct = correctAnswer.join(' ')
    .toLowerCase()
    .replace(/\s+/g, ' ');

  // 🧹 Clean up — remove buttons, words, and placeholders before transition
  submitButton.remove();
  redoButton.remove();
  wordsContainer.remove();
  dropZone.remove();

  // 🟢 Go to correct or incorrect scene
  if (sentence === correct) {
    goToScene(50);
  } else {
    goToScene(56);
  }
};


  // Redo / Ulitin button
  const redoButton = document.createElement("button");
  redoButton.textContent = 'Ulitin';
  Object.assign(redoButton.style, {
    padding: '14px 30px',
    fontSize: '1.3em',
    fontWeight: '600',
    border: 'none',
    borderRadius: '10px',
    backgroundColor: '#f5e0ab',
    color: '#000',
    cursor: 'pointer',
    marginTop: '25px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s ease, filter 0.2s ease',
    fontFamily: "'Marykate', cursive",
    pointerEvents: "auto"
  });

  // Reset by reloading the same scene via goToScene (will rebuild the scene)
  redoButton.onclick = () => {
    // remove this gameContainer first to avoid duplicates
    gameContainer.remove();
    // call goToScene(47) which will re-enter this block
    goToScene(47);
  };

  // Append in sensible order, then add Prev/Next buttons last so they don't steal z-order
  gameContainer.appendChild(wordsContainer);
  gameContainer.appendChild(dropZone);

  const controls = document.createElement("div");
  controls.style.display = "flex";
  controls.style.gap = "12px";
  controls.style.justifyContent = "center";
  controls.appendChild(submitButton);
  controls.appendChild(redoButton);

  gameContainer.appendChild(controls);

  scene.appendChild(gameContainer);
  });
} else if (sceneNumber === 50) {
      changeScene('new_images/50.png', () => {
        removeSceneButtons();
        createNextButton(55);
      });
    } 

    else if (sceneNumber === 55) {
      changeScene('new_images/60.png', () => {
        removeSceneButtons()
        createHomeButton();
      });
    } 





    
    else if (sceneNumber === 60) {
      changeScene('new_images/60.png', () => {
        createHomeButton();
        createPlayButton(61);
      });
    } else if (sceneNumber >= 61 && sceneNumber <= 66) {
      createPrevNextButtons(prevImage, nextImage);
    } else if (sceneNumber === 67) {
      changeScene('new_images/67.png', () => {
        createOOButton(68);
        createHindiButton();
      });
    } else if (sceneNumber === 68) {
      createPrevNextButtons(prevImage, nextImage);
    } else if (sceneNumber === 69) {
      changeScene("new_images/69.png", () => {
        createHintButton(79);
        createColorButtons("yellow", 70, 78);
      });
    } else if (sceneNumber === 70) {
      changeScene("new_images/70.png", () => {
        createNextButton(nextImage);
      });
    } else if (sceneNumber === 71) {
      changeScene("new_images/71.png", () => {
        createHintButton(79);
        createColorButtons("red", 72, 78);
      });
    } else if (sceneNumber === 72) {
      changeScene("new_images/72.png", () => {
        createNextButton(nextImage);
      });
    } else if (sceneNumber === 73) {
      changeScene("new_images/73.png", () => {
        createHintButton(79);
        createColorButtons("yellow", 74, 78);
      });
    } else if (sceneNumber === 74) {
      changeScene("new_images/74.png", () => {
        createNextButton(nextImage);
      });
    } else if (sceneNumber === 75) {
      changeScene("new_images/75.png", () => {
        createHintButton(79);
        createColorButtons("blue", 76, 78);
      });
    } else if (sceneNumber === 76) {
      changeScene("new_images/76.png", () => {
        createNextButton(nextImage);
      });
    } else if (sceneNumber === 77) {
      changeScene("new_images/77.png", () => {
        createHomeButton();
      });
    } else if (sceneNumber === 78) {
      changeScene("new_images/78.png", () => {
        createPrevButton(68); // Wrong → retry
      });
    } else if (sceneNumber === 79) {
      changeScene("new_images/79.png", () => {
        createPrevButton(68); // Hint → back
      });
    } else if (sceneNumber === 82) {
      changeScene('new_images/82.png', () => {
        createHomeButton();
        createPlayButton(83);
      });
    } else if (sceneNumber >= 83 && sceneNumber <= 87) {
      createPrevNextButtons(prevImage, nextImage);
    } else if (sceneNumber === 88) {
      changeScene('new_images/88.png', () => {
        createOOButton(89);
        createHindiButton();
      });
    } else if (sceneNumber === 89) {
      createPrevNextButtons(prevImage, nextImage);
    } else if (sceneNumber === 90) {
      changeScene('new_images/90.png', () => {
        removeSceneButtons();
        createHintButton(104);
        createFirstButtons("firstB", 91, 103);
      });
    } else if (sceneNumber === 91) {
      changeScene('new_images/91.png', () => {
        removeSceneButtons();
        createNextButton(nextImage);
      });
    } else if (sceneNumber === 92) {
      changeScene('new_images/92.png', () => {
        removeSceneButtons();
        createNextButton(nextImage);
      });
    } else if (sceneNumber === 93) {
      changeScene('new_images/93.png', () => {
        removeSceneButtons();
        createHintButton(104);
        createThirdButtons("thirdA", 94, 103);
      }); 
    } else if (sceneNumber === 94) {
      changeScene('new_images/94.png', () => {
        removeSceneButtons();
        createNextButton(nextImage);
      });
    } else if (sceneNumber === 95) {
      changeScene('new_images/95.png', () => {
        removeSceneButtons();
        createNextButton(nextImage);
      });
      } else if (sceneNumber === 96) {
      changeScene('new_images/96.png', () => {
        removeSceneButtons();
        createHintButton(104);
        createSecondButtons("secondA", 97, 103);
      });
      } else if (sceneNumber === 97) {
      changeScene('new_images/97.png', () => {
        removeSceneButtons();
        createNextButton(nextImage);
      });
      } else if (sceneNumber === 98) {
      changeScene('new_images/98.png', () => {
        removeSceneButtons();
        createNextButton(102)
      });
      } else if (sceneNumber === 102) {
      changeScene('new_images/102.png', () => {
        removeSceneButtons();
        createHomeButton();
      });
    } else if (sceneNumber === 103) {
      changeScene('new_images/103.png', () => {
        removeSceneButtons();
        createPrevButton(89);
      });
    } else if (sceneNumber === 104) {
      changeScene('new_images/104.png', () => {
        removeSceneButtons();
        createPrevButton(90);
      });
    } else if (sceneNumber === 107) {
      changeScene('new_images/107.png', () => {
        removeSceneButtons();
        createHomeButton();
        createPlayButton(108);
      });
    } else if (sceneNumber >= 108 && sceneNumber <= 112) {
      createPrevNextButtons(prevImage, nextImage);
    } else if (sceneNumber === 113) {
      changeScene('new_images/113.png', () => {
        createOOButton(114);
        createHindiButton();
      });
    } else if (sceneNumber >= 114 && sceneNumber <= 115) {
      createPrevNextButtons(prevImage, nextImage);
    } else if (sceneNumber === 116) {
      changeScene('new_images/116.png', () => {
        removeSceneButtons()
        createKaraButton(119);
        createRabbinButton(117);
        createKurtButton(119);
        createHintButton(120)
      });
    } else if (sceneNumber === 117) {
      changeScene('new_images/117.png', () => {
        removeSceneButtons();
        createNextButton(118);
      });
    } else if (sceneNumber === 118) {
      changeScene('new_images/118.png', () => {
        removeSceneButtons();
        createNextButton(121);
      });
    } else if (sceneNumber === 119) {
      changeScene('new_images/119.png', () => {
        removeSceneButtons();
        createPrevButton(116);
      });
    }  else if (sceneNumber === 120) {
      changeScene('new_images/120.png', () => {
        removeSceneButtons()
        createPrevButton(114)

      });
    } else if (sceneNumber === 121) {
      changeScene('new_images/121.png', () => {
        removeSceneButtons()
        createKaraButton(119);
        createMayaButton(122);
        createKurtButton(119);
        createHintButton(120);
      });
    } else if (sceneNumber === 122) {
      changeScene('new_images/122.png', () => {
        removeSceneButtons();
        createNextButton(123);
      });
    } else if (sceneNumber === 123) {
      changeScene('new_images/123.png', () => {
        removeSceneButtons();
        createNextButton(125);
      });
    } else if (sceneNumber === 124) {
      changeScene('new_images/124.png', () => {
        removeSceneButtons();
        createPrevButton(121);
      });
    } else if (sceneNumber === 125) {
      changeScene('new_images/125.png', () => {
        removeSceneButtons();
        createKurtButton(126);
        createMayaButton(128);
        createKaraButton(128);
        createHintButton(120);
      });
    } else if (sceneNumber === 126) {
      changeScene('new_images/126.png', () => {
        removeSceneButtons();
        createNextButton(127);
      });
    } else if (sceneNumber === 127) {
      changeScene('new_images/127.png', () => {
        removeSceneButtons();
        createNextButton(133);
      });
    } else if (sceneNumber === 133) {
      changeScene('new_images/133.png', () => {
        removeSceneButtons();
         createNextButton(134);
      });
    } 

   else if (sceneNumber === 134) {
  // Make the scene look exactly like the first page
  scene.style.backgroundImage = "url('new_images/134.png')";

  removeSceneButtons();

  // Ensure welcome overlay is hidden (if it's still present)
  if (welcome && welcome.style.display !== 'none') {
    welcome.style.opacity = '0';
    setTimeout(() => { welcome.style.display = 'none'; }, 300);
  }

  // Ensure scene is accepting pointer events and shows pointer
  scene.style.pointerEvents = 'auto';
  scene.style.cursor = 'pointer';

  // Remove any previously attached click on scene so we don't double-bind
  scene.onclick = null;

  // Create a full-screen clickable overlay DIV appended to scene.
  // This avoids possible interference from other siblings and makes behavior consistent.
  const fullClickArea = document.createElement('div');
  Object.assign(fullClickArea.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '100',               // above background but below fullscreen UI
    background: 'transparent',
    cursor: 'pointer',
    pointerEvents: 'auto'
  });

  // Debug: report clicks/pointerdowns to console to help diagnose blocking
  fullClickArea.addEventListener('pointerdown', (e) => {
    console.log('[scene134] pointerdown at', e.clientX, e.clientY, 'target=', e.target);
  });

  // Use once:true so handler runs once and then removes itself
  fullClickArea.addEventListener('click', (e) => {
    console.log('[scene134] full screen clicked — going to scene 2');
    // remove overlay immediately
    if (fullClickArea.parentNode) fullClickArea.parentNode.removeChild(fullClickArea);

    // Make sure fullscreen button remains clickable after overlay removal
    if (fullscreenBtn) {
      fullscreenBtn.style.zIndex = '9999';
      fullscreenBtn.style.pointerEvents = 'auto';
    }

    // Navigate to first scene (change 2 to your actual first scene if different)
    goToScene(135);
  }, { once: true });

  // Append overlay after a brief delay to avoid race conditions
  setTimeout(() => {
    // append under the fullscreen button but above the scene background
    scene.appendChild(fullClickArea);

    // Ensure fullscreen button is above everything
    if (fullscreenBtn) {
      fullscreenBtn.style.zIndex = '9999';
      fullscreenBtn.style.pointerEvents = 'auto';
    } else {
      console.warn('[scene134] fullscreen-btn not found');
    }

    console.log('[scene134] fullClickArea appended');
  }, 30);
}


else if (sceneNumber === 135) {
  // Make the scene look exactly like the first page
  scene.style.backgroundImage = "url('new_images/135.png')";

  removeSceneButtons();

  // Ensure welcome overlay is hidden (if it's still present)
  if (welcome && welcome.style.display !== 'none') {
    welcome.style.opacity = '0';
    setTimeout(() => { welcome.style.display = 'none'; }, 300);
  }

  // Ensure scene is accepting pointer events and shows pointer
  scene.style.pointerEvents = 'auto';
  scene.style.cursor = 'pointer';

  // Remove any previously attached click on scene so we don't double-bind
  scene.onclick = null;

  // Create a full-screen clickable overlay DIV appended to scene.
  // This avoids possible interference from other siblings and makes behavior consistent.
  const fullClickArea = document.createElement('div');
  Object.assign(fullClickArea.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '100',               // above background but below fullscreen UI
    background: 'transparent',
    cursor: 'pointer',
    pointerEvents: 'auto'
  });

  // Debug: report clicks/pointerdowns to console to help diagnose blocking
  fullClickArea.addEventListener('pointerdown', (e) => {
    console.log('[scene135] pointerdown at', e.clientX, e.clientY, 'target=', e.target);
  });

  // Use once:true so handler runs once and then removes itself
  fullClickArea.addEventListener('click', (e) => {
    console.log('[scene135] full screen clicked — going to scene 2');
    // remove overlay immediately
    if (fullClickArea.parentNode) fullClickArea.parentNode.removeChild(fullClickArea);

    // Make sure fullscreen button remains clickable after overlay removal
    if (fullscreenBtn) {
      fullscreenBtn.style.zIndex = '9999';
      fullscreenBtn.style.pointerEvents = 'auto';
    }

    // Navigate to first scene (change 2 to your actual first scene if different)
    goToScene(136);
  }, { once: true });

  // Append overlay after a brief delay to avoid race conditions
  setTimeout(() => {
    // append under the fullscreen button but above the scene background
    scene.appendChild(fullClickArea);

    // Ensure fullscreen button is above everything
    if (fullscreenBtn) {
      fullscreenBtn.style.zIndex = '9999';
      fullscreenBtn.style.pointerEvents = 'auto';
    } else {
      console.warn('[scene135] fullscreen-btn not found');
    }

    console.log('[scene135] fullClickArea appended');
  }, 30);
}

    else if (sceneNumber === 136) {
  // Make the scene look exactly like the first page
  scene.style.backgroundImage = "url('new_images/136.png')";

  removeSceneButtons();

  // Ensure welcome overlay is hidden (if it's still present)
  if (welcome && welcome.style.display !== 'none') {
    welcome.style.opacity = '0';
    setTimeout(() => { welcome.style.display = 'none'; }, 300);
  }

  // Ensure scene is accepting pointer events and shows pointer
  scene.style.pointerEvents = 'auto';
  scene.style.cursor = 'pointer';

  // Remove any previously attached click on scene so we don't double-bind
  scene.onclick = null;

  // Create a full-screen clickable overlay DIV appended to scene.
  // This avoids possible interference from other siblings and makes behavior consistent.
  const fullClickArea = document.createElement('div');
  Object.assign(fullClickArea.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '100',               // above background but below fullscreen UI
    background: 'transparent',
    cursor: 'pointer',
    pointerEvents: 'auto'
  });

  // Debug: report clicks/pointerdowns to console to help diagnose blocking
  fullClickArea.addEventListener('pointerdown', (e) => {
    console.log('[scene136] pointerdown at', e.clientX, e.clientY, 'target=', e.target);
  });

  // Use once:true so handler runs once and then removes itself
  fullClickArea.addEventListener('click', (e) => {
    console.log('[scene136] full screen clicked — going to scene 2');
    // remove overlay immediately
    if (fullClickArea.parentNode) fullClickArea.parentNode.removeChild(fullClickArea);

    // Make sure fullscreen button remains clickable after overlay removal
    if (fullscreenBtn) {
      fullscreenBtn.style.zIndex = '9999';
      fullscreenBtn.style.pointerEvents = 'auto';
    }

    // Navigate to first scene (change 2 to your actual first scene if different)
    goToScene(137);
  }, { once: true });

  // Append overlay after a brief delay to avoid race conditions
  setTimeout(() => {
    // append under the fullscreen button but above the scene background
    scene.appendChild(fullClickArea);

    // Ensure fullscreen button is above everything
    if (fullscreenBtn) {
      fullscreenBtn.style.zIndex = '9999';
      fullscreenBtn.style.pointerEvents = 'auto';
    } else {
      console.warn('[scene136] fullscreen-btn not found');
    }

    console.log('[scene136] fullClickArea appended');
  }, 30);
}

       else if (sceneNumber === 137) {
  // Make the scene look exactly like the first page
  scene.style.backgroundImage = "url('new_images/137.png')";

  removeSceneButtons();

  // Ensure welcome overlay is hidden (if it's still present)
  if (welcome && welcome.style.display !== 'none') {
    welcome.style.opacity = '0';
    setTimeout(() => { welcome.style.display = 'none'; }, 300);
  }

  // Ensure scene is accepting pointer events and shows pointer
  scene.style.pointerEvents = 'auto';
  scene.style.cursor = 'pointer';

  // Remove any previously attached click on scene so we don't double-bind
  scene.onclick = null;

  // Create a full-screen clickable overlay DIV appended to scene.
  // This avoids possible interference from other siblings and makes behavior consistent.
  const fullClickArea = document.createElement('div');
  Object.assign(fullClickArea.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '100',               // above background but below fullscreen UI
    background: 'transparent',
    cursor: 'pointer',
    pointerEvents: 'auto'
  });

  // Debug: report clicks/pointerdowns to console to help diagnose blocking
  fullClickArea.addEventListener('pointerdown', (e) => {
    console.log('[scene137] pointerdown at', e.clientX, e.clientY, 'target=', e.target);
  });

  // Use once:true so handler runs once and then removes itself
  fullClickArea.addEventListener('click', (e) => {
    console.log('[scene137] full screen clicked — going to scene 2');
    // remove overlay immediately
    if (fullClickArea.parentNode) fullClickArea.parentNode.removeChild(fullClickArea);

    // Make sure fullscreen button remains clickable after overlay removal
    if (fullscreenBtn) {
      fullscreenBtn.style.zIndex = '9999';
      fullscreenBtn.style.pointerEvents = 'auto';
    }

    // Navigate to first scene (change 2 to your actual first scene if different)
    goToScene(1);
  }, { once: true });

  // Append overlay after a brief delay to avoid race conditions
  setTimeout(() => {
    // append under the fullscreen button but above the scene background
    scene.appendChild(fullClickArea);

    // Ensure fullscreen button is above everything
    if (fullscreenBtn) {
      fullscreenBtn.style.zIndex = '9999';
      fullscreenBtn.style.pointerEvents = 'auto';
    } else {
      console.warn('[scene137] fullscreen-btn not found');
    }

    console.log('[scene137] fullClickArea appended');
  }, 30);
}



    

    


    





  });
}
// 🏠 Home Button
function createHomeButton() {
  const existingHomeBtn = document.querySelector('.home-button');
  if (existingHomeBtn) existingHomeBtn.remove();

  const homeBtn = document.createElement('img');
  homeBtn.src = 'new_images/home_button.png';
  homeBtn.alt = 'Home';
  homeBtn.classList.add('home-button');
  scene.appendChild(homeBtn);

  homeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    homeBtn.remove();
    goToScene(13);
  });

  window.addEventListener(
    'sceneChange',
    () => {
      homeBtn.remove();
    },
    { once: true }
  );
}

// --- Create Next Button ---
// NOTE: Do NOT call removeSceneButtons() here (goToScene already does)
function createNextButton(target = null) {
  const nextBtn = document.createElement('img');
  nextBtn.src = 'images/nextbutton-removebg-preview.png';
  nextBtn.alt = 'Next';
  nextBtn.classList.add('next-button');
  scene.appendChild(nextBtn);

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    if (typeof target === 'number') {
      // If a specific scene number is provided
      goToScene(target);
    } else if (typeof target === 'string') {
      // If an image path like 'new_images/70.png' is provided
      const nextSceneNum = getSceneNumberFromPath(target);
      goToScene(nextSceneNum);
    } else {
      // Default fallback: go to next numeric scene
      goToScene(currentScene + 1);
    }
  });
}

// --- Create Prev Button ---
// Accepts either an image path or a direct target scene number
function createPrevButton(target = null) {
  const prevBtn = document.createElement('img');
  prevBtn.src = 'new_images/previous_button.png';
  prevBtn.alt = 'Previous';
  prevBtn.classList.add('prev-button');
  scene.appendChild(prevBtn);

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (typeof target === 'number') {
      goToScene(target);
    } else if (typeof target === 'string') {
      const prevSceneNum = getSceneNumberFromPath(target);
      goToScene(prevSceneNum);
    } else {
      // fallback: go to previous numeric scene if possible
      goToScene(Math.max(1, currentScene - 1));
    }
  });
}

// --- Create Prev + Next Buttons ---
function createPrevNextButtons(prevImage, nextImage) {
  const prevBtn = document.createElement('img');
  prevBtn.src = 'new_images/previous_button.png';
  prevBtn.alt = 'Previous';
  prevBtn.classList.add('prev-button');

  const nextBtn = document.createElement('img');
  nextBtn.src = 'images/nextbutton-removebg-preview.png';
  nextBtn.alt = 'Next';
  nextBtn.classList.add('next-button');

  scene.appendChild(prevBtn);
  scene.appendChild(nextBtn);

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const prevSceneNum = getSceneNumberFromPath(prevImage);
    goToScene(prevSceneNum);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const nextSceneNum = getSceneNumberFromPath(nextImage);
    goToScene(nextSceneNum);
  });
}

// --- Create X and Y Buttons for Page 10 ---
function createXYButtons(prevImage, nextImage) {
  const xBtn = document.createElement('img');
  xBtn.src = 'new_images/x_button-removebg-preview.png';
  xBtn.alt = 'X';
  xBtn.classList.add('prev-button');

  const yBtn = document.createElement('img');
  yBtn.src = 'new_images/y_button-removebg-preview.png';
  yBtn.alt = 'Y';
  yBtn.classList.add('next-button');

  scene.appendChild(xBtn);
  scene.appendChild(yBtn);

  xBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const prevSceneNum = getSceneNumberFromPath(prevImage);
    goToScene(prevSceneNum);
  });

  yBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const nextSceneNum = getSceneNumberFromPath(nextImage);
    goToScene(nextSceneNum);
  });
}

// --- Top-left / top-right / etc (unchanged) ---
function createTopLeftButtons() {
  const container = document.createElement('div');
  container.classList.add('top-left-buttons');

  const buttons = [
    { src: 'new_images/hint_button.png', alt: 'Hint' },
    { src: 'new_images/sound_button.png', alt: 'Sound' },
    { src: 'new_images/diamond_button.png', alt: 'Diamond' },
    { src: 'new_images/coin_button.png', alt: 'Coin' },
    { src: 'new_images/mail_button.png', alt: 'Mail' },
  ];

  buttons.forEach(b => {
    const img = document.createElement('img');
    img.src = b.src;
    img.alt = b.alt;
    if (b.alt === 'Hint') {
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        goToScene(14);
      });
    }
    container.appendChild(img);
  });

  scene.appendChild(container);
}

function createTopRightButtons() {
  const container = document.createElement('div');
  container.classList.add('top-right-buttons');

  const buttons = [
    { src: 'new_images/settings_button.png', alt: 'Settings' },
    { src: 'new_images/download_button.png', alt: 'Download' },
    { src: 'new_images/menu_button.png', alt: 'Menu' },
    { src: 'new_images/add_button.png', alt: 'Add' },
    { src: 'new_images/trash_button.png', alt: 'Trash' },
  ];

  buttons.forEach(b => {
    const img = document.createElement('img');
    img.src = b.src;
    img.alt = b.alt;
    container.appendChild(img);
  });

  scene.appendChild(container);
}

function createCharacterCardsGrid() {
  const container = document.createElement('div');
  container.classList.add('character-cards-grid');

  const cards = [
    { src: 'new_images/choices_mimi.png', alt: 'Mimi', lockin: 'lockin_mimi.png', key: 'mimi' },
    { src: 'new_images/choices_loladaldy.png', alt: 'Loladaldy', lockin: 'lockin_loladaldy.png', key: 'loladaldy' },
    { src: 'new_images/choices_komi.png', alt: 'Komi', lockin: 'lockin_komi.png', key: 'komi' },
    { src: 'new_images/choices_kikopalak.png', alt: 'Kikopalak', lockin: 'lockin_kikopalak.png', key: 'kikopalak' },
    { src: 'new_images/choices_bibobalita.png', alt: 'Bibobalita', lockin: 'lockin_bibobalita.png', key: 'bibobalita' },
  ];

  cards.forEach(c => {
    const img = document.createElement('img');
    img.src = c.src;
    img.alt = c.alt;
    img.dataset.lockin = c.lockin;
    img.dataset.key = c.key;
    img.addEventListener('click', () => updateLockinCard(img));
    container.appendChild(img);
  });

  scene.appendChild(container);
}

function createBottomLeftButtons() {
  const container = document.createElement('div');
  container.classList.add('bottom-left-buttons');

  const buttons = [
    { src: 'new_images/share_button.png', alt: 'Share' },
    { src: 'new_images/crow_button.png', alt: 'Crown' },
    { src: 'new_images/trophy_button.png', alt: 'Trophy' },
  ];

  buttons.forEach(b => {
    const img = document.createElement('img');
    img.src = b.src;
    img.alt = b.alt;
    container.appendChild(img);
  });

  scene.appendChild(container);
}

function createLockinCard() {
  const existing = document.getElementById('lockin-card');
  if (existing) existing.remove();

  const lockin = document.createElement('img');
  lockin.id = 'lockin-card';
  lockin.classList.add('lockin-card');
  lockin.src = 'new_images/lockin_kuwi.png';
  lockin.alt = 'Lock-in Character';
  lockin.dataset.selected = 'kuwi';
  scene.appendChild(lockin);

  lockin.addEventListener('click', (e) => {
    e.stopPropagation();
    const selected = lockin.dataset.selected;
    const redirectMap = {
      kuwi: 16,
      mimi: 18,
      loladaldy: 39,
      komi: 60,
      kikopalak: 82,
      bibobalita: 107,
    };
    if (redirectMap[selected]) goToScene(redirectMap[selected]);
  });
}

function updateLockinCard(selectedImg) {
  const lockin = document.getElementById('lockin-card');
  if (!lockin) return;

  document.querySelectorAll('.character-cards-grid img').forEach(c => {
    c.style.filter = '';
    c.style.opacity = '';
  });

  selectedImg.style.filter = 'grayscale(70%) brightness(0.8)';
  selectedImg.style.opacity = '0.9';
  lockin.src = `new_images/${selectedImg.dataset.lockin}`;
  lockin.dataset.selected = selectedImg.dataset.key;
  lockin.classList.add('fade-in');
  setTimeout(() => lockin.classList.remove('fade-in'), 400);
}

// --------------------------
// Remove scene buttons (called only from goToScene)
// --------------------------
function removeSceneButtons() {
  const buttons = document.querySelectorAll(
    '.next-button, .prev-button, .top-left-buttons, .top-right-buttons, .character-cards-grid, .bottom-left-buttons, .lockin-card, .home-button, .play-button, .oo-button, .hindi-button, .yellow-button, .blue-button, .red-button, .myhint-button, .firstA-button, .firstB-button,.firstC-button, .secondA-button, .secondB-button, .secondC-button, .thirdA-button, .thirdB-button, .thirdC-button, .kara-button, .rabbin-button, .maya-button, .kurt-button'
  );

  buttons.forEach(btn => {
    // if a container (like top-left-buttons), remove children gently
    if (btn.classList.contains('top-left-buttons') || btn.classList.contains('top-right-buttons') || btn.classList.contains('character-cards-grid') || btn.classList.contains('bottom-left-buttons')) {
      btn.style.transition = 'opacity 0.4s ease';
      btn.style.opacity = '0';
      setTimeout(() => btn.remove(), 400);
    } else {
      btn.style.transition = 'opacity 0.4s ease';
      btn.style.opacity = '0';
      setTimeout(() => btn.remove(), 400);
    }
  });

  // Note: we DO NOT remove .myhint-button here; hint button is scene-managed and created per scene
}

// --- Helper: extract scene number from filename ---
function getSceneNumberFromPath(path) {
  const match = path.match(/(\d+)\.png$/);
  return match ? parseInt(match[1], 10) : null;
}

// 🎮 Fullscreen Toggle
fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) enterFullscreen();
  else exitFullscreen();
});
function enterFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) elem.requestFullscreen();
  else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
  else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
}
function exitFullscreen() {
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  else if (document.msExitFullscreen) document.msExitFullscreen();
}

// --- Reusable Play Button Creator ---
function createPlayButton(targetSceneNumber) {
  const existingPlayBtn = document.querySelector('.play-button');
  if (existingPlayBtn) existingPlayBtn.remove();

  const playBtn = document.createElement('img');
  playBtn.src = 'new_images/play_button.png';
  playBtn.alt = 'Play';
  playBtn.classList.add('play-button');

  playBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    playBtn.remove();
    if (targetSceneNumber) goToScene(targetSceneNumber);
  });

  scene.appendChild(playBtn);
}

// --- OO / Hindi Buttons ---
function createOOButton(nextSceneNumber) {
  let container = document.querySelector('.button-group');
  if (!container) {
    container = document.createElement('div');
    container.classList.add('button-group');
    scene.appendChild(container);
  }
  const existingOO = document.querySelector('.oo-button');
  if (existingOO) existingOO.remove();

  const ooBtn = document.createElement('img');
  ooBtn.src = 'new_images/oo_button.png';
  ooBtn.alt = 'OO';
  ooBtn.classList.add('oo-button');

  ooBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    ooBtn.remove();
    goToScene(nextSceneNumber);
  });

  container.appendChild(ooBtn);
}

function createHindiButton() {
  let container = document.querySelector('.button-group');
  if (!container) {
    container = document.createElement('div');
    container.classList.add('button-group');
    scene.appendChild(container);
  }

  const existingHindi = document.querySelector('.hindi-button');
  if (existingHindi) existingHindi.remove();

  const hindiBtn = document.createElement('img');
  hindiBtn.src = 'new_images/hindi_button.png';
  hindiBtn.alt = 'Hindi';
  hindiBtn.classList.add('hindi-button');

  hindiBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    hindiBtn.remove();
    goToScene(13);
  });

  container.appendChild(hindiBtn);
}

// --- Create Crossword Inputs (kept same) ---
function createCrosswordInputs() {
  const existingGrid = document.querySelector('.crossword-grid');
  if (existingGrid) existingGrid.remove();

  const gridContainer = document.createElement('div');
  gridContainer.classList.add('crossword-grid');
  scene.appendChild(gridContainer);

  const boxLayout = [
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
  ];

  const cols = Math.max(...boxLayout.map(row => row.length));
  const boxSize = 90;
  const gap = 20;
  const startX = 50;
  const rowTops = [10, 10, 10, 10];

  boxLayout.forEach((row, rIdx) => {
    const top = rowTops[rIdx];
    row.forEach((cell, cIdx) => {
      if (cell === 1) {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.classList.add('crossword-input');

        const left = startX + cIdx * (boxSize + gap);

        Object.assign(input.style, {
          position: 'absolute',
          top: `${top}px`,
          left: `${left}px`,
          width: `${boxSize}px`,
          height: `${boxSize}px`,
          textAlign: 'center',
          fontSize: '1.5em',
          background: 'transparent',
          border: '2px solid #000',
          outline: 'none',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          cursor: 'text',
        });

        gridContainer.appendChild(input);
      }
    });
  });
}

// --------------------------
// Reusable 3-Color Button Quiz
// --------------------------
function createColorButtons(correctColor, correctScene, wrongScene) {
  const buttons = [
    { color: "blue", src: "new_images/blue_button.png", className: "blue-button" },
    { color: "yellow", src: "new_images/yellow_button.png", className: "yellow-button" },
    { color: "red", src: "new_images/red_button.png", className: "red-button" },
  ];

  buttons.forEach((btn, index) => {
    const img = document.createElement("img");
    img.src = btn.src;
    img.alt = `${btn.color} button`;
    img.classList.add(btn.className);
    // ensure color buttons are below hint
    img.style.zIndex = 100;
    scene.appendChild(img);

    img.addEventListener("click", (e) => {
      e.stopPropagation();
      if (btn.color === correctColor) {
        goToScene(correctScene);
      } else {
        goToScene(wrongScene);
      }
    });
  });
}

// Try Again (not used if you prefer Prev reuse)
function createTryAgainButton(previousScene) {
  const btn = document.createElement("img");
  btn.src = 'new_images/previous_button.png';
  btn.alt = "Try Again";
  btn.classList.add("try-again-button");
  scene.appendChild(btn);

  btn.addEventListener("click", () => {
    goToScene(previousScene);
  });
}

// --- Hint button (scene-managed, appended to scene) ---
function createHintButton(targetSceneNumber) {
  const existingHintBtn = document.querySelector('.myhint-button');
  if (existingHintBtn) existingHintBtn.remove();

  const hintBtn = document.createElement('img');
  hintBtn.src = 'new_images/hint_button.png';
  hintBtn.alt = 'Hint Button';
  hintBtn.classList.add('myhint-button');

  // place inside scene so transitions behave consistently
  scene.appendChild(hintBtn);

  // make sure it's above color buttons and clickable
  hintBtn.style.position = 'absolute';
  hintBtn.style.right = '100px';
  hintBtn.style.bottom = '50px';
  hintBtn.style.width = '180px';
  hintBtn.style.cursor = 'pointer';
  hintBtn.style.zIndex = '1000';
  hintBtn.style.pointerEvents = 'auto';

  hintBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("Hint button clicked — going to:", targetSceneNumber);
    goToScene(targetSceneNumber);
  });
}

// --------------------------
// Reusable "First" 3-Button Quiz (firstA, firstB, firstC)
// --------------------------
function createFirstButtons(correctButton, correctScene, wrongScene) {
  const buttons = [
    { name: "firstA", src: "new_images/firstA.png", className: "firstA-button" },
    { name: "firstB", src: "new_images/firstB.png", className: "firstB-button" },
    { name: "firstC", src: "new_images/firstC.png", className: "firstC-button" },
  ];

  buttons.forEach((btn) => {
    const img = document.createElement("img");
    img.src = btn.src;
    img.alt = `${btn.name} button`;
    img.classList.add(btn.className);
    img.style.zIndex = "100";
    scene.appendChild(img);

    img.addEventListener("click", (e) => {
      e.stopPropagation();
      if (btn.name === correctButton) {
        goToScene(correctScene);
      } else {
        goToScene(wrongScene);
      }
    });
  });
}

// --------------------------
// Reusable "Second" 3-Button Quiz (secondA, secondB, secondC)
// --------------------------
function createSecondButtons(correctButton, correctScene, wrongScene) {
  const buttons = [
    { name: "secondA", src: "new_images/secondA.png", className: "secondA-button" },
    { name: "secondB", src: "new_images/secondB.png", className: "secondB-button" },
    { name: "secondC", src: "new_images/secondC.png", className: "secondC-button" },
  ];

  buttons.forEach((btn) => {
    const img = document.createElement("img");
    img.src = btn.src;
    img.alt = `${btn.name} button`;
    img.classList.add(btn.className);
    img.style.zIndex = "100";
    scene.appendChild(img);

    img.addEventListener("click", (e) => {
      e.stopPropagation();
      if (btn.name === correctButton) {
        goToScene(correctScene);
      } else {
        goToScene(wrongScene);
      }
    });
  });
}


// --------------------------
// Reusable "Second" 3-Button Quiz (secondA, secondB, secondC)
// --------------------------
function createThirdButtons(correctButton, correctScene, wrongScene) {
  const buttons = [
    { name: "thirdA", src: "new_images/thirdA.png", className: "thirdA-button" },
    { name: "thirdB", src: "new_images/thirdB.png", className: "thirdB-button" },
    { name: "thirdC", src: "new_images/thirdC.png", className: "thirdC-button" },
  ];

  buttons.forEach((btn) => {
    const img = document.createElement("img");
    img.src = btn.src;
    img.alt = `${btn.name} button`;
    img.classList.add(btn.className);
    img.style.zIndex = "100";
    scene.appendChild(img);

    img.addEventListener("click", (e) => {
      e.stopPropagation();
      if (btn.name === correctButton) {
        goToScene(correctScene);
      } else {
        goToScene(wrongScene);
      }
    });
  });
}

function createKaraButton(targetScene) {
  const karaBtn = document.createElement("img");
  karaBtn.src = "new_images/kara.png";
  karaBtn.alt = "Kara Button";
  karaBtn.classList.add("kara-button");
  karaBtn.style.cursor = "pointer";
  karaBtn.style.zIndex = "100";
  scene.appendChild(karaBtn);

  karaBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    goToScene(targetScene);
  });
}

function createRabbinButton(targetScene) {
  const rabbinBtn = document.createElement("img");
  rabbinBtn.src = "new_images/rabbin.png";
  rabbinBtn.alt = "Rabbin Button";
  rabbinBtn.classList.add("rabbin-button");
  rabbinBtn.style.cursor = "pointer";
  rabbinBtn.style.zIndex = "100";
  scene.appendChild(rabbinBtn);

  rabbinBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    goToScene(targetScene);
  });
}

function createMayaButton(targetScene) {
  const mayaBtn = document.createElement("img");
  mayaBtn.src = "new_images/maya.png";
  mayaBtn.alt = "Maya Button";
  mayaBtn.classList.add("maya-button");
  mayaBtn.style.cursor = "pointer";
  mayaBtn.style.zIndex = "100";
  scene.appendChild(mayaBtn);

  mayaBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    goToScene(targetScene);
  });
}

function createKurtButton(targetScene) {
  const kurtBtn = document.createElement("img");
  kurtBtn.src = "new_images/kurt.png";
  kurtBtn.alt = "Kurt Button";
  kurtBtn.classList.add("kurt-button");
  kurtBtn.style.cursor = "pointer";
  kurtBtn.style.zIndex = "100";
  scene.appendChild(kurtBtn);

  kurtBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    goToScene(targetScene);
  });
}
