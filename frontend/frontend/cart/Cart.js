$(document).ready(function() {
    // 1. استدعاء السلة من المتصفح - تأكدي من توحيد الاسم ليكون myCart
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    let container = $('#cart-items');
    let totalPriceElement = $('#total-price');

    // دالة رسم المنتجات وحساب السعر
    function renderCart() {
        container.empty(); // تنظيف المكان
        let total = 0;

        if (cart.length === 0) {
            container.html('<p style="text-align:center; padding:20px;">Your cart is empty 🛒</p>');
            totalPriceElement.text("0.00");
            return;
        }

        // رسم كل منتج داخل السلة
        cart.forEach((product, index) => {
            let price = parseFloat(product.price);
            total += price;

            // HTML لكل كارت منتج في السلة (متوافق مع XHTML)
            let itemHTML = `
                <div class="cart-item" style="display: flex; align-items: center; border-bottom: 1px solid #eee; padding: 15px 0;">
                    <img src="${product.image}" alt="${product.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px; margin-right: 15px;" />
                    
                    <div class="item-details" style="flex-grow: 1;">
                        <h4 style="margin: 0 0 5px 0;">${product.name}</h4>
                        <p style="margin: 0; color: #666;">$${price.toFixed(2)}</p>
                    </div>

                    <button type="button" class="remove-btn" data-index="${index}" style="background: #ff4444; color: white; border: none; padding: 5px 12px; border-radius: 4px; cursor: pointer;">Remove</button>
                </div>
            `;
            container.append(itemHTML);
        });

        // تحديث السعر الكلي
        totalPriceElement.text(total.toFixed(2));
    }

    // تشغيل الدالة عند فتح الصفحة
    renderCart();

    // 2. برمجة زرار الحذف (Remove) - استخدام .off لمنع التكرار
    $(document).off('click', '.remove-btn').on('click', '.remove-btn', function() {
        let index = $(this).data('index');
        cart.splice(index, 1); // حذف من المصفوفة
        localStorage.setItem('myCart', JSON.stringify(cart)); // تحديث الذاكرة
        renderCart(); // إعادة الرسم
    });

    // 3. زرار "Continue Shopping"
    $('#continueBtn').off('click').on('click', function() {
        window.location.href = "../main/Main-page.html";
    });

    // 4. زرار "Order Now" (إتمام الشراء) مع الـ Validation المطلوب
    $('#order-btn').off('click').on('click', function() {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        
        let address = $('#address').val().trim();
        if (address === "") {
            alert("Please enter your delivery address!");
            $('#address').focus();
            return;
        }

        // إتمام الطلب وتصفير السلة
        alert("Order placed successfully! 🎉\nWe will ship to: " + address);
        
        localStorage.removeItem('myCart'); 
        cart = [];
        renderCart();
        $('#address').val(''); 
        window.location.href = "../main/Main-page.html";
    });
});