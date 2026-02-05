let gameOver = false;
let unlocked = false;
let verifying = false;

// lock cards on load
document.querySelectorAll(".card").forEach(card => {
  card.classList.add("locked");
});

function validateCode() {
  if (verifying) return;

  const inputEl = document.getElementById("codeInput");
  const input = inputEl.value.toUpperCase();
  const status = document.getElementById("statusMsg");

  inputEl.value = input;

  // Rule: U + 9 letters/numbers
  const pattern = /^U[A-Za-z0-9]{9}$/;

  if (!pattern.test(input)) {
    // ❌ Wrong code → shake
    inputEl.classList.remove("shake");
    void inputEl.offsetWidth; // restart animation
    inputEl.classList.add("shake");

    status.innerText = "❌ Invalid code";
    status.style.color = "orange";

    document.querySelectorAll(".card").forEach(card => {
      card.classList.add("locked");
    });
    return;
  }

  // ✅ Valid → fake verification
  verifying = true;
  status.innerText = "🔄 Verifying code...";
  status.className = "verifying";

  setTimeout(() => {
    verifying = false;
    unlocked = true;

    status.innerText = "✅ Code verified. Pick a card!";
    status.className = "";
    status.style.color = "lightgreen";

    document.querySelectorAll(".card").forEach(card => {
      card.classList.remove("locked");
    });
  }, 1800); // fake delay
}

function reveal(card) {
  if (!unlocked || gameOver || card.classList.contains("revealed")) return;

  gameOver = true;

  setTimeout(() => {
    card.classList.add("revealed");
    card.querySelector(".back").innerText =
      "😄!\n\nYou’ve been Successfully SCAMMED by Kelly .\nWork hard — there is no shortcut.  sharp boys assosiation😁";
  }, 600);
}

function resetGame() {
  gameOver = false;
  unlocked = false;
  verifying = false;

  const inputEl = document.getElementById("codeInput");
  inputEl.value = "";
  inputEl.classList.remove("shake");

  const status = document.getElementById("statusMsg");
  status.innerText = "";
  status.className = "";

  document.querySelectorAll(".card").forEach(card => {
    card.classList.remove("revealed");
    card.classList.add("locked");
  });
}
