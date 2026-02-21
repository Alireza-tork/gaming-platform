// ==========================================================
// =================== Sorting =============================
const toSorting = document.querySelector(".sorting");
const sortBy = ["genre", "release", "price"];

const dropdownOptions = {
    genre: ["All", "Action", "Adventure", "RPG", "Strategy", "Sports", "Puzzle"],
    release: ["All", "2021", "2022", "2023", "2020"],
    price: ["All", "Free", "Under $20", "Under $40", "Under $60"],
};

// ساخت دراپ‌داونها
sortBy.forEach(key => {
    toSorting.innerHTML += `
        <div class="sort-item sorting__${key}" data-sort="${key}">
            <h4>${key}</h4>
            <p>All</p>
            <div class="sorting__genre--select">
                <i name="down" class="bi bi-chevron-down"></i>
                <i name="up" class="bi bi-chevron-up"></i>
            </div>
            <div class="dropdown"></div>
        </div>
    `;

    const dropdown = toSorting.querySelector(`.sorting__${key} .dropdown`);
    dropdownOptions[key].forEach(option => {
        const p = document.createElement("p");
        p.className = "dropdownItem";
        p.textContent = option;
        dropdown.appendChild(p);
    });
});

// مدیریت باز و بسته شدن دراپ‌داون
const sortItems = document.querySelectorAll(".sort-item");
sortItems.forEach(item => {
    const caretUp = item.querySelector('[name="up"]');
    const caretDown = item.querySelector('[name="down"]');
    const dropdown = item.querySelector(".dropdown");
    let isOpen = false;

    caretUp.style.display = "none";
    dropdown.style.display = "none";

    item.addEventListener("click", e => {
        if (e.target.classList.contains("dropdownItem")) return;

        sortItems.forEach(other => {
            if (other !== item) {
                other.querySelector('[name="up"]').style.display = "none";
                other.querySelector('[name="down"]').style.display = "block";
                other.style.border = "2px solid white";
                other.querySelector(".dropdown").style.display = "none";
            }
        });

        if (isOpen) {
            caretUp.style.display = "none";
            caretDown.style.display = "block";
            item.style.border = "2px solid white";
            dropdown.style.display = "none";
        } else {
            caretDown.style.display = "none";
            caretUp.style.display = "block";
            item.style.border = "2px solid #FA9021";
            dropdown.style.display = "block";
        }
        isOpen = !isOpen;
    });

    // انتخاب گزینه دراپ‌داون و فیلتر
    dropdown.querySelectorAll(".dropdownItem").forEach(option => {
        option.addEventListener("click", () => {
            item.querySelector("p").textContent = option.textContent;
            caretUp.style.display = "none";
            caretDown.style.display = "block";
            dropdown.style.display = "none";
            item.style.border = "2px solid white";
            filterGames(); // اجرای فیلتر بعد از انتخاب
        });
    });
});

// ==================== بارگذاری محصولات =====================
const gamesContainer = document.getElementById("trendingContainer");
const games = JSON.parse(localStorage.getItem("products")) || [];

// نمایش کارت‌ها
function displayGames(list) {
    gamesContainer.innerHTML = "";

    if (list.length === 0) {
        gamesContainer.innerHTML = `<p class="noGames">No games to display</p>`;
        return;
    }

    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(4, 1fr)";
    grid.style.gap = "20px";

    list.forEach(game => {
        const card = document.createElement("div");
        card.className = "games__trends";
        card.dataset.title = game.title; // اضافه کردن اطلاعات برای سبد خرید

        card.innerHTML = `
            <img src="${game.imageURL}" alt="${game.title}" loading="lazy">
            <div class="overlay">
                <h3>Game Title: <span>${game.title}</span></h3>
                <p>Genre: <span>${game.genre}</span></p>
                <p>Release Year: <span>${game.release}</span></p>
                <p>Price: <span>${game.price}</span></p>
            </div>
            <div class="text_trends">
                <i class="bi bi-fire"></i>
                <span>${game.followers} Followers</span>
            </div>
        `;
        grid.appendChild(card);
    });

    gamesContainer.appendChild(grid);
}

// ====================== Filter Function ======================
function filterGames() {
    const filters = {};
    sortBy.forEach(key => {
        const selected = document.querySelector(`.sorting__${key} > p`).textContent;
        if (selected !== "All") filters[key] = selected;
    });

    const filtered = games.filter(game =>
        Object.keys(filters).every(key => game[key] === filters[key])
    );

    displayGames(filtered);
}

// ====================== Initial Display ======================
displayGames(games);

// ====================== Cart Functionality ======================
gamesContainer.addEventListener("dblclick", e => {
    const product = e.target.closest(".games__trends");
    if (!product) return;

    const selectedGame = games.find(g => g.title === product.dataset.title);
    if (!selectedGame) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.find(g => g.title === selectedGame.title)) { // اگر محصول هنوز در سبد نبود
        cart.push(selectedGame); // اضافه کن
        localStorage.setItem('cart', JSON.stringify(cart)); // ذخیره کن

        const cartBadge = document.querySelector('.cartFixed .badge');
        if (cartBadge) cartBadge.innerText = cart.length; // آپدیت badge

        alert(`${selectedGame.title} added to the cart!`);
    }
});

// ================== Badge update on page load ===================
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartBadge = document.querySelector(".cartFixed .badge");
cartBadge.innerText = cart.length;
