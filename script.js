const API_KEY = "dbeda3453e32212ff47d85b5a20ff214"; 

function getWeather(inputId, displayId) {
  const city = document.getElementById(inputId).value.trim();
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then((data) => {
      const display = document.getElementById(displayId);
      display.innerHTML = `
        <div class="card-header">
          <h3>${data.name}</h3>
          <span class="close-btn" onclick="closeCard('${displayId}')">&times;</span>
        </div>
        <p><strong>Temp:</strong> ${data.main.temp} °C</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        <button onclick="saveFavorite('${data.name}')">Save to Favorites</button>
      `;
    })
    .catch(() => {
      document.getElementById(displayId).innerHTML = "<p>City not found.</p>";
    });
}

function saveFavorite(city) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(city)) {
    favorites.push(city);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  }
}

function renderFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const container = document.getElementById("favoritesList");
  container.innerHTML = "";

  favorites.forEach((city) => {
    const btn = document.createElement("button");
    btn.textContent = city;
    btn.onclick = () => {
      document.getElementById("city1").value = city;
      getWeather("city1", "weather1");
    };
    container.appendChild(btn);
  });
}

function closeCard(id) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = "";
}

renderFavorites();
