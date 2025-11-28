// Mapování z možností selectu na dotaz pro API
const QUERY_MAP = {
  girl: "girl",
  boy: "boy",
  avengers: "avengers",
  horror: "horror",
};

const selectEl = document.getElementById("topic");
const resultsEl = document.getElementById("results");
const statusEl  = document.getElementById("status");

// Počátek - žádné výsledky 
clearResults();

selectEl.addEventListener("change", async (e) => {
  const key = e.target.value;
  const q = QUERY_MAP[key];
  if (!q) return;

  // Zobrazení „načítám“
  showStatus("Načítám…");
  clearResults();

  try {
    const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(q)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // filtrování
    const withImages = data.filter(item => item?.show?.image);

    if (withImages.length === 0) {
      showStatus("Nic nenalezeno. Zkuste jiné téma.");
      return;
    }

    renderResults(withImages);
    showStatus("");

    resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });

  } catch (err) {
    console.error(err);
    showStatus("Při načítání došlo k chybě. Zkuste to znovu.");
  }
});

function renderResults(items){
  clearResults();
  const frag = document.createDocumentFragment();

  items.forEach((item, idx) => {
    const li = document.createElement("li");
    const img = document.createElement("img");

    const imgUrl =
      item.show.image?.medium ||
      item.show.image?.original ||
      "";

    img.src = imgUrl;
    img.alt = item.show?.name || "Poster";

  
    li.appendChild(img);
    frag.appendChild(li);
  });

  resultsEl.appendChild(frag);
}

function clearResults(){
  resultsEl.innerHTML = "";
}

function showStatus(text){
  statusEl.textContent = text;
}
