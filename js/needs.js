let contItems = document.querySelector(".ItemCont");
let preloader = document.getElementById("preloader");
let search = document.querySelector('.search');
let _data;

// نمایش پری‌لودر قبل از fetch
preloader.classList.remove("hide");

// ======================
// تابع رندر محصولات
// ======================
function renderProducts(list) {
  contItems.innerHTML = "";
  list.forEach((item) => {
    let products = document.createElement("div");
    products.setAttribute("class", "card");
    products.innerHTML = `
      <img src="${item.image}" alt="productImg" loading="lazy">
      <h2>${item.title}</h2>
      <p>${item.description}</p>
      <b>Price: ${item.price}</b>
    `;
    contItems.appendChild(products);
  });
}

// ======================
// جستجو
// ======================
search.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let value = search.value.trim().toLowerCase();

    let filtered = _data.filter(item =>
      item.title.toLowerCase().includes(value)
    );

    renderProducts(filtered);
  }
});

// ======================
// GET محصولات
// ======================
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    setTimeout(() => {
      renderProducts(data);
      _data = data;
      preloader.classList.add("hide");
    }, 1000);
  })
  .catch((err) => {
    contItems.innerHTML = `<span>no products ...</span>`;
    preloader.classList.add("hide");
  });


// ======================
// POST اضافه کردن محصول
// ======================
fetch("https://fakestoreapi.com/products", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "تیشرت جدید",
    price: 29.99,
    description: "توضیح کوتاه",
    image: "https://i.pravatar.cc",
    category: "clothing",
  }),
})
  .then(res => res.json())
  .then(data => console.log("محصول اضافه شد:", data))
  .catch(err => console.error("خطا:", err));
