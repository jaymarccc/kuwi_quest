document.addEventListener("DOMContentLoaded", () => {
  const characters = document.querySelectorAll(".character-choice");
  const mainCharacter = document.getElementById("mainCharacter");

  characters.forEach(char => {
    char.addEventListener("click", () => {
      // Reset all to normal
      characters.forEach(c => c.classList.remove("selected"));

      // Apply grayscale to clicked
      char.classList.add("selected");

      // Change main character display based on selected
      const id = char.id;
      mainCharacter.src = `new_images/lockin_${id}.png`;
    });
  });
});
