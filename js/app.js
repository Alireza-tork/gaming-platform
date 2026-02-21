// ========================battery======================
if ('getBattery' in navigator) {
    navigator.getBattery().then(function (battery) {

        const batteryPercent = document.getElementById("batteryPercent");
        const batteryIcon = document.querySelector("#batteryBox i");

        function updateBattery() {
            let level = Math.round(battery.level * 100);
            batteryPercent.textContent = level + "%";

            if (battery.charging) {
                batteryIcon.className = "bi bi-battery-charging";
            } else {
                if (level > 75) batteryIcon.className = "bi bi-battery-full";
                else if (level > 40) batteryIcon.className = "bi bi-battery-half";
                else batteryIcon.className = "bi bi-battery";
            }
        }

        updateBattery();

        battery.addEventListener("levelchange", updateBattery);
        battery.addEventListener("chargingchange", updateBattery);
    });
} else {
    document.getElementById("batteryPercent").textContent = "N/A";
}
// =========================sign in===============================
let signIn = document.querySelector("#signBtn");
let logged = document.querySelector("#userImg");

localStorage.setItem("logged", "true");

if (localStorage.getItem("logged") === "true") {
  document.getElementById("signBtn").style.display = "none";
  document.getElementById("userImg").style.display = "block";
}
logged.addEventListener("dblclick", () => {
  localStorage.removeItem("logged");
  sessionStorage.removeItem("loggedInUser");

  logged.style.display = "none";
  signIn.style.display = "block";
});
// =========================header===============================
let image1 = document.querySelector(".gamepad_img img");
let image2 = document.createElement("img");
let image3 = document.createElement("img");
let image4 = document.createElement("img");
let image5 = document.createElement("img");
let image6 = document.createElement("img");

image1.src = "../img/Joystick 1.png";
image2.src = "../img/gamepad2.png";
image3.src = "../img/gamepad3.png";
image4.src = "../img/gamepad4.png";
image5.src = "../img/gamepad5.png";
image6.src = "../img/gamepad6.png";

let images = [image1, image2, image3, image4, image5, image6];

let i = 0;
setInterval(() => {
  let randomIndex = Math.floor(Math.random() * images.length);
  image1.src = images[randomIndex].src;
}, 3000);
// =========================products===============================
let games = JSON.parse(localStorage.getItem("products")) || [];

// فقط 4 محصول اول
let firstFourGames = games.slice(0, 4);

let gamesContainer = document.querySelector("#trendingContainer");
gamesContainer.innerHTML = ""; // پاک کردن خروجی قبلی

if (firstFourGames.length > 0) {
  firstFourGames.map((game) => {
    gamesContainer.innerHTML += `
      <div class="trending__games--trends">
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
      </div>
    `;
  });
} else {
  gamesContainer.innerHTML = `
    <p class="noGames">No games available at the moment.</p>
  `;
}

// دکمه "See All Games"
let seeAllGames = document.getElementById("SeeTrending");
seeAllGames.addEventListener("click", () => {
  window.location = "seeAllGames.html";
});
// =================scrollUppBtn=================
let scrollBtn = document.querySelector('.scrollUpp')

window.addEventListener('scroll',()=>{
  if(scrollY >500){
    scrollBtn.style.display = "block";
  }else{
    scrollBtn.style.display = "none";
  }
})
scrollBtn.addEventListener('click',()=>{
  window.scrollTo({
    top:0
  })
})
// =================cart=================
const productDivs = document.querySelectorAll('.trending__games--trends');

productDivs.forEach((product, index) => {
  product.addEventListener('dblclick', () => {
    const selectedGame = firstFourGames[index];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(selectedGame);
    localStorage.setItem('cart', JSON.stringify(cart));

    const cartBadge = document.querySelector('.cartFixed .badge');
    cartBadge.innerText = cart.length;

    alert(`${selectedGame.title} !added to cart`);
  });
});
// ==================badge update on page load==================
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartBadge = document.querySelector('.cartFixed .badge');
cartBadge.innerText = cart.length;

// =======================skeleton=========================
window.addEventListener("load", () => {
    const skeletonWrapper = document.querySelector(".skeleton-wrapper");
    const galleryGrid = document.querySelector(".gallery_grid");

    setTimeout(() => {
        skeletonWrapper.style.display = "none";
        galleryGrid.style.display = "block";
    }, 800);
});

window.addEventListener("load", () => {
    const sk = document.querySelector(".footer-skeleton");
    const footer = document.querySelector(".footer");

    setTimeout(() => {
        sk.style.display = "none";
        footer.style.display = "block";
    }, 800);
});