const searchInput = document.querySelector("#question-search");
const toggleAllButton = document.querySelector("#toggle-all");
const detailCards = [...document.querySelectorAll(".qa-card")];
const searchableCards = [
  ...detailCards,
  ...document.querySelectorAll(".exercise-card")
];

let allExpanded = false;

function normalize(value) {
  return value.toLowerCase().trim();
}

function filterCards(query) {
  const normalizedQuery = normalize(query);

  searchableCards.forEach((card) => {
    const haystack = normalize(card.dataset.search || card.textContent || "");
    const isMatch = normalizedQuery === "" || haystack.includes(normalizedQuery);
    card.classList.toggle("is-hidden", !isMatch);
  });
}

function setAllDetails(open) {
  detailCards.forEach((card) => {
    card.open = open;
  });

  allExpanded = open;
  toggleAllButton.setAttribute("aria-expanded", String(open));
  toggleAllButton.textContent = open ? "Collapse all answers" : "Expand all answers";
}

if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    filterCards(event.target.value);
  });
}

if (toggleAllButton) {
  toggleAllButton.addEventListener("click", () => {
    setAllDetails(!allExpanded);
  });
}

detailCards.forEach((card) => {
  card.addEventListener("toggle", () => {
    const openCards = detailCards.filter((item) => item.open).length;
    if (openCards === detailCards.length) {
      allExpanded = true;
      toggleAllButton.textContent = "Collapse all answers";
      toggleAllButton.setAttribute("aria-expanded", "true");
    } else if (openCards === 0) {
      allExpanded = false;
      toggleAllButton.textContent = "Expand all answers";
      toggleAllButton.setAttribute("aria-expanded", "false");
    }
  });
});
