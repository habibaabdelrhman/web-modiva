// ========================= HEART ICON TOGGLE =========================
const hearts = document.querySelectorAll('.fav-icon');

hearts.forEach(heart => {
    heart.addEventListener('click', () => {
        heart.classList.toggle('fa-solid'); // toggle filled heart
        heart.classList.toggle('fa-regular'); // toggle empty heart

        // Optional: store favorites in localStorage
        const productName = heart.closest('.product-card').querySelector('h3').innerText;
        if (heart.classList.contains('fa-solid')) {
            console.log(`${productName} added to favorites`);
        } else {
            console.log(`${productName} removed from favorites`);
        }
    });
});

// ========================= ADD TO CART =========================
const addCartBtns = document.querySelectorAll('.add-cart-btn');

addCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const productCard = btn.closest('.product-card');
        const productName = productCard.querySelector('h3').innerText;
        console.log(`${productName} added to cart`);
        btn.innerText = "Added!";
        setTimeout(() => btn.innerText = "Add to Cart", 1000);
    });
});

// ========================= SIMPLE IMAGE SLIDER =========================
const sliderImages = document.querySelectorAll('.media-slider img');
let currentSlide = 0;

if (sliderImages.length > 0) {
    sliderImages[currentSlide].style.opacity = 1;

    setInterval(() => {
        sliderImages[currentSlide].style.opacity = 0;
        currentSlide = (currentSlide + 1) % sliderImages.length;
        sliderImages[currentSlide].style.opacity = 1;
    }, 4000); // change slide every 4s
}