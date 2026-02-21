// ======== check login status ========
let isLogged = localStorage.getItem("logged") === "true";
let loggedInSection = document.querySelector(".logInToAccount");
let gamesInCart = document.querySelector(".gamesInCart");

// نمایش یا مخفی کردن بخش ورود
loggedInSection.style.display = isLogged ? "none" : "block";

// ======== handle click to login ========
let clkLogin = document.querySelector(".logInTo");
clkLogin.addEventListener("click", () => {
  window.location.href = "/sign_in.html";
});

// ======== show cart only if logged in ========
if (!isLogged) {
  // کاربر وارد نشده، پیام سبد خالی یا هیچی نمایش بده
  gamesInCart.innerHTML = `
    <div class="emptyCart">
        <div class="container_1">
            <div class="emptyCartItems">
                <img src="./img/empty-cart.svg" alt="empty-cart">
                <p>Please log in to view your shopping cart.</p>
            </div>
        </div>
    </div>
  `;
} else {
  // کاربر وارد شده، محصولات را نمایش بده
  let gameAdd = JSON.parse(localStorage.getItem("cart")) || [];
  gamesInCart.innerHTML = "";

  if (gameAdd.length > 0) {
    gamesInCart.innerHTML += `
      <div class="numberOfgames">
          <h5>Your shopping cart</h5>
          <span>${gameAdd.length} Game(s)</span>
      </div>
    `;

    gamesInCart.innerHTML += gameAdd.map(game => `
        <div class="adedGames">
            <div class="container_2">
                <div class="theGame">
                    <div class="picGame">
                        <img src="${game.imageURL}" alt="${game.title}">
                    </div>
                    <div class="gameInfo">
                        <h2>${game.title}</h2>
                        <span>Genre: ${game.genre}</span>
                        <span>Release: ${game.release}</span>
                        <span>Followers: ${game.followers}</span>
                        <span>Price: ${game.price}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join("");

    // محاسبه جمع کل
    let total = gameAdd.reduce((sum, game) => {
      return sum + parseFloat(game.price.replace(/[^0-9.]/g, ""));
    }, 0);
    document.querySelector(".buy .sum strong").innerText = "$" + total.toFixed(2);
  } else {
    gamesInCart.innerHTML = `
      <div class="emptyCart">
          <div class="container_1">
              <div class="emptyCartItems">
                  <img src="./img/empty-cart.svg" alt="empty-cart">
                  <p>Your shopping cart is empty!</p>
              </div>
          </div>
      </div>
    `;
  }
}