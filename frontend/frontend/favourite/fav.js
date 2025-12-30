// ========================= GLOBAL VARIABLES =========================
const favoritesGrid = document.querySelector('.favorites-grid');
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

// ========================= FUNCTION TO SAVE FAVORITES =========================
function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// ========================= HANDLE HEART CLICK (MAIN PAGE) =========================
function handleHeartClick(icon) {
    const productCard = icon.closest('.product-card');
    const productId = productCard.dataset.id;
    const productName = productCard.querySelector('h3').innerText;
    const productPrice = productCard.querySelector('p').innerText;
    const productImg = productCard.querySelector('img').src;

    // تحقق إذا المنتج موجود مسبقًا
    const index = favorites.findIndex(p => p.id === productId);

    if (index === -1) {
        // إضافة إلى المفضلة
        favorites.push({ id: productId, name: productName, price: productPrice, img: productImg });
        icon.classList.add('active');
        icon.style.color = '#d64141'; // لون القلب عند التفعيل
    } else {
        // إزالة المنتج من المفضلة
        favorites.splice(index, 1);
        icon.classList.remove('active');
        icon.style.color = '#000'; // اللون الافتراضي
    }

    saveFavorites();
}

// ========================= INITIALIZE HEART ICONS ON MAIN PAGE =========================
document.querySelectorAll('.fav-icon').forEach(icon => {
    const productCard = icon.closest('.product-card');
    const productId = productCard.dataset.id;

    // ضبط الحالة الأولية للقلب
    if (favorites.some(p => p.id === productId)) {
        icon.classList.add('active');
        icon.style.color = '#d64141';
    }

    icon.addEventListener('click', () => handleHeartClick(icon));
});

// ========================= FAVORITES PAGE RENDERING =========================
function renderFavoritesPage() {
    if (!favoritesGrid) return;

    favoritesGrid.innerHTML = '';

    if (favorites.length === 0) {
        favoritesGrid.innerHTML = '<p class="empty-msg" style="text-align:center; font-size:1.2rem;">No favorite products yet.</p>';
        return;
    }

    favorites.forEach((product, index) => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.dataset.id = product.id;

        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <div class="card-actions">
                <button class="add-cart-btn">Add to Cart</button>
                <i class="fa-solid fa-heart fav-icon active" title="Remove from favorites"></i>
            </div>
        `;

        // إزالة المنتج المحدد فقط عند الضغط على القلب
        card.querySelector('.fav-icon').addEventListener('click', () => {
            favorites.splice(index, 1);
            saveFavorites();
            renderFavoritesPage();
        });

        // إضافة إلى سلة الشراء
        card.querySelector('.add-cart-btn').addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                size: 'One Size'
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${product.name} added to cart!`);
        });

        favoritesGrid.appendChild(card);
    });
}

// ========================= INITIALIZE FAVORITES PAGE =========================
if (favoritesGrid) {
    renderFavoritesPage();
}

// ========================= ADD TO CART ICON ON MAIN PAGE =========================
const addToCartBtns = document.querySelectorAll('.add-cart-btn');
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const product = btn.closest('.product-card');
        const productName = product.querySelector('h3').innerText;
        const productPrice = product.querySelector('p').innerText;
        const selectedSizeBtn = product.querySelector('.sizes button.selected');
        const selectedSize = selectedSizeBtn ? selectedSizeBtn.innerText : 'One Size';

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push({ name: productName, price: productPrice, size: selectedSize });
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${productName} (Size: ${selectedSize}) added to cart!`);
    });
});


$(document).ready(function(){

    // ================= Add to Cart =================
    $(document).on("click", ".add-cart-btn", function(){
        var productName = $(this).closest(".product-card").find("h3").text();

        $("<div>" + productName + " added to cart!</div>").css({
            "position": "fixed",
            "top": "20px",
            "right": "20px",
            "background-color": "#d4edda",
            "color": "#155724",
            "padding": "10px 20px",
            "border-radius": "5px",
            "box-shadow": "0 2px 5px rgba(0,0,0,0.2)",
            "z-index": "1000",
            "font-weight": "bold"
        }).appendTo("body").fadeOut(2000);
    });


    // ================= Fav Add/Remove =================
    $(document).on("click", ".fav-icon", function(){
        var productName = $(this).closest(".product-card").find("h3").text();

        if($(this).hasClass("fav-active")){
            // Remove from fav
            $(this).removeClass("fav-active").css("color", "#000");
            $("<div>" + productName + " removed from favorites!</div>").css({
                "position": "fixed",
                "top": "60px",
                "right": "20px",
                "background-color": "#f8d7da",
                "color": "#721c24",
                "padding": "10px 20px",
                "border-radius": "5px",
                "box-shadow": "0 2px 5px rgba(0,0,0,0.2)",
                "z-index": "1000",
                "font-weight": "bold"
            }).appendTo("body").fadeOut(2000);
        } else {
            // Add to fav
            $(this).addClass("fav-active").css("color", "red");
            $("<div>" + productName + " added to favorites!</div>").css({
                "position": "fixed",
                "top": "60px",
                "right": "20px",
                "background-color": "#ffeeba",
                "color": "#856404",
                "padding": "10px 20px",
                "border-radius": "5px",
                "box-shadow": "0 2px 5px rgba(0,0,0,0.2)",
                "z-index": "1000",
                "font-weight": "bold"
            }).appendTo("body").fadeOut(2000);
        }
    });

});


$(document).ready(function() {

    // 1. استدعاء قائمة المفضلة من المتصفح
    let favorites = JSON.parse(localStorage.getItem('myFavs')) || [];
    let container = $('#fav-items');

    // دالة رسم المنتجات
    function renderFavs() {
        container.empty(); // تنظيف المكان

        // لو مفيش منتجات
        if (favorites.length === 0) {
            container.html('<p style="width:100%; text-align:center; font-size:1.2rem;">Your wishlist is empty 💔</p>');
            return;
        }

        // رسم كل منتج
        favorites.forEach((product, index) => {
            let card = `
                <div class="product-card" style="border: 1px solid #ddd; border-radius: 8px; width: 250px; padding: 15px; text-align: center; position: relative; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    
                    <button class="remove-fav" data-index="${index}" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 1.2rem; color: #ff4444; cursor: pointer;">
                        <i class="fa-solid fa-trash"></i>
                    </button>

                    <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 5px; margin-bottom: 10px;">
                    
                    <h3 style="font-size: 1.1rem; margin: 10px 0;">${product.name}</h3>
                    <p style="font-weight: bold; color: #333;">Price: $${product.price}</p>
                    
                    <button class="move-to-cart" data-index="${index}" style="background: black; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; width: 100%; margin-top: 10px;">
                        Move to Cart 🛒
                    </button>
                </div>
            `;
            container.append(card);
        });
    }

    // تشغيل الدالة أول ما الصفحة تفتح
    renderFavs();

    // 2. برمجة زرار الحذف
    $(document).on('click', '.remove-fav', function() {
        let index = $(this).data('index');
        favorites.splice(index, 1); // مسح من المصفوفة
        localStorage.setItem('myFavs', JSON.stringify(favorites)); // تحديث الذاكرة
        renderFavs(); // إعادة الرسم
    });

    // 3. برمجة زرار "Move to Cart"
    $(document).on('click', '.move-to-cart', function() {
        let index = $(this).data('index');
        let productToMove = favorites[index];

        // نجيب السلة الحالية
        let cart = JSON.parse(localStorage.getItem('myCart')) || [];
        
        // نضيف المنتج للسلة
        cart.push(productToMove);
        localStorage.setItem('myCart', JSON.stringify(cart));

        // (اختياري) نمسحه من المفضلة بعد ما نقلناه
        favorites.splice(index, 1); 
        localStorage.setItem('myFavs', JSON.stringify(favorites));
        
        alert("Moved to Cart! 🛒");
        renderFavs();
    });

});