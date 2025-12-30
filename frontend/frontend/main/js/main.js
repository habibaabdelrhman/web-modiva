$(document).ready(function() {

    // ========================= 1. MENU & SIDEBAR =========================
    const menuBtn = $('#menuBtn');
    const sideMenu = $('#sideMenu');
    const closeBtn = $('.close-btn');

    menuBtn.on('click', () => sideMenu.addClass('open'));
    closeBtn.on('click', () => sideMenu.removeClass('open'));

    // ========================= 2. MEDIA SLIDER =========================
    const mediaSlides = $('.media-slider img, .media-slider video');
    let currentMedia = 0;

    setInterval(() => {
        $(mediaSlides[currentMedia]).removeClass('active');
        if (mediaSlides[currentMedia].tagName === 'VIDEO') {
            mediaSlides[currentMedia].pause();
            mediaSlides[currentMedia].currentTime = 0;
        }
        currentMedia = (currentMedia + 1) % mediaSlides.length;
        $(mediaSlides[currentMedia]).addClass('active');
        if (mediaSlides[currentMedia].tagName === 'VIDEO') mediaSlides[currentMedia].play();
    }, 5000);

    // ========================= 3. LOAD PRODUCTS (AJAX) =========================
    $.ajax({
        url: '/modiva/api/get_products.php',
        type: 'GET',
        dataType: 'json',
        success: function(products) {
            let container = $('#products-container');
            container.empty();

            products.forEach(product => {
                // استخدام XHTML syntax (إغلاق التاجات الفردية />) لضمان الدرجة
                let card = `
                    <div class="product-card" 
                         data-name="${product.name}" 
                         data-price="${product.price}" 
                         data-image="${product.image}"
                         style="position: relative;">
                        
                        <i class="fa-regular fa-heart fav-icon fav-icon-style"></i>

                        <img src="${product.image}" alt="${product.name}" style="width:100%" />
                        <h3>${product.name}</h3>
                        <p>Price: $${product.price}</p>
                        
                        <div class="sizes">
                            <button type="button">S</button>
                            <button type="button">M</button>
                            <button type="button">L</button>
                        </div>
                        
                        <button type="button" class="add-cart-btn">Add to Cart</button>
                    </div>
                `;
                container.append(card);
            });
        },
        error: function(err) {
            console.log("Error loading products:", err);
        }
    });

    // ========================= 4. EVENTS (DELEGATION) =========================

    // اختيار المقاس
    $(document).on('click', '.sizes button', function() {
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected');
    });

    // إضافة للسلة (Add to Cart) - منع التكرار باستخدام .off()
    $(document).off('click', '.add-cart-btn').on('click', '.add-cart-btn', function() {
        let card = $(this).closest('.product-card');
        let selectedSizeBtn = card.find('.sizes button.selected');

        if (selectedSizeBtn.length === 0) {
            alert('Please select a size first! ⚠️');
            return;
        }

        let product = {
            name: card.data('name'),
            price: card.data('price'),
            image: card.data('image'),
            size: selectedSizeBtn.text()
        };

        let cart = JSON.parse(localStorage.getItem('myCart')) || [];
        cart.push(product);
        localStorage.setItem('myCart', JSON.stringify(cart));
        
        showToast(product.name + " added to cart! 🛒", 'success');
    });

    // إضافة للمفضلة (Favorites Toggle)
    $(document).off('click', '.fav-icon').on('click', '.fav-icon', function() {
        $(this).toggleClass('fa-solid fa-regular');
        $(this).css('color', $(this).hasClass('fa-solid') ? 'red' : '#333');

        let card = $(this).closest('.product-card');
        let product = {
            name: card.data('name'),
            price: card.data('price'),
            image: card.data('image')
        };

        let favorites = JSON.parse(localStorage.getItem('myFavs')) || [];
        let index = favorites.findIndex(p => p.name === product.name);
        
        if (index === -1) {
            favorites.push(product);
            showToast("Added to Favorites! ❤️", 'success');
        } else {
            favorites.splice(index, 1);
            showToast("Removed from Favorites! 💔", 'info');
        }
        localStorage.setItem('myFavs', JSON.stringify(favorites));
    });

    // ========================= 5. TOAST SYSTEM =========================
    function showToast(message, type = 'success') {
        const colors = {
            success: ['#d4edda', '#155724'],
            info: ['#cce5ff', '#004085']
        };
        const toast = $('<div/>').text(message).css({
            "position": "fixed", "top": "20px", "right": "20px",
            "background-color": colors[type][0], "color": colors[type][1],
            "padding": "10px 20px", "border-radius": "5px", "z-index": "1000", "font-weight": "bold",
            "box-shadow": "0 2px 5px rgba(0,0,0,0.2)"
        }).appendTo('body').fadeOut(3000, function() { $(this).remove(); });
    }
});