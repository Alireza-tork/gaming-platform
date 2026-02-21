// ===================showAddProduct====================
let pages = document.querySelectorAll(".pages");

function showPage(pageId) {
  pages.forEach((p) => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
}
document.getElementById("menuHome").addEventListener("click", () => {
  showPage("dashboard");
});
document.getElementById("menuProducts").addEventListener("click", () => {
  showPage("addProducts");
});
document.getElementById("menuSettings").addEventListener("click", () => {
  showPage("settingsPage");
});
showPage("dashboard");
// ==================addProductToGamesPage==============
const fileInput = document.getElementById("fileUpload");
const showImgBox = document.querySelector(".showIMg");
const previewImg = document.querySelector(".imgUploaded");
const fileInfo = document.querySelector(".imgInfo h5");
const fileSize = document.querySelector(".imgInfo span");
const deleteIcon = document.querySelector(".bi-trash-fill");

const publishBtn = document.querySelector(".publish");
const productNameInput = document.getElementById("ProductName");
const genreSelect = document.getElementById("genre");
const releaseSelect = document.getElementById("release");
const priceInput = document.getElementById("price");
const followersInput = document.getElementById("followers");

showImgBox.style.display = "none";

let imageBase64 = ""; // ذخیره Base64 موقت

// پیش‌نمایش و تبدیل عکس به Base64 همزمان
fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    fileInfo.textContent = file.name;
    fileSize.textContent = (file.size / 1024).toFixed(1) + " KB";
    showImgBox.style.display = "flex";

    const reader = new FileReader();
    reader.onload = () => {
        imageBase64 = reader.result; // Base64 آماده
        previewImg.src = imageBase64; // پیش‌نمایش با Base64
    };
    reader.readAsDataURL(file);
});

deleteIcon.addEventListener("click", () => {
    fileInput.value = "";
    previewImg.src = "";
    fileInfo.textContent = "";
    fileSize.textContent = "";
    showImgBox.style.display = "none";
    imageBase64 = "";
});

publishBtn.addEventListener("click", () => {
    const title = productNameInput.value.trim();
    const genre = genreSelect.value;
    const release = releaseSelect.value;
    const price = priceInput.value.trim();
    const followers = followersInput.value.trim();

    if (!title || !price || !followers || !imageBase64) {
        alert("لطفا همه موارد را کامل کنید!");
        return;
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];

    const newProduct = {
        title,
        genre,
        release,
        price,
        followers,
        imageURL: imageBase64
    };

    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    alert("محصول اضافه شد!");

    // ریست فرم
    productNameInput.value = "";
    genreSelect.value = "All";
    releaseSelect.value = "All";
    priceInput.value = "";
    followersInput.value = "";
    fileInput.value = "";
    previewImg.src = "";
    fileInfo.textContent = "";
    fileSize.textContent = "";
    showImgBox.style.display = "none";
    imageBase64 = "";

    if (products.length >= 4) {
        window.location.href = "seeAllGames.html";
    }
});

