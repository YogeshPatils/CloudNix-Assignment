const shopData = {
    theme: {},
    products: [],
    store: {}
};

$(document).ready(function () {
    // Start button: show Page 2
    $("#start").click(function () {
        $('#page-1').addClass("blur");
        $('#page-2').removeClass('hide').css({
                        position: 'absolute',
                        width: '100%',
                        background: 'rgba(240, 242, 245, 0.95)', // slight transparency
                        zIndex: '1000',
                        padding:'30px',
                        boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)'
                    });
    });


    let selectedTheme = null;

    // When "Apply" is clicked on a theme
    $('.card .btn').click(function () {
        const card = $(this).closest('.card');
        const themeTitle = card.find('.card-title').text().trim();
        const themeImg = card.find('img').attr('src');

        selectedTheme = {
            title: themeTitle,
            image: themeImg
        };

        shopData.theme = selectedTheme;

        // Highlight the selected card
        $('.card').removeClass('border-primary');
        card.addClass('border-primary');
    });

    // Next button click
    $('#next-btn-page-3').click(function () {
        if (!selectedTheme) {
            alert("Please select a theme before continuing.");
            return;
        }

        // Proceed to next page logic here
        $('#page-2').addClass('hide');
        $('#page-3').removeClass('hide');
    });
    console.log(shopData);

    // Page 2 to Page 3
    $("#next-btn-page-3").click(function () {
        $("#page-2").addClass("hide");
        $("#page-3").removeClass("hide").css({
            position: 'absolute',
            width: '100%',
            background: 'rgba(240, 242, 245, 0.95)', // slight transparency
            zIndex: '1000',
            padding:'30px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)'
        });
    });


    $('.next-btn-to-page-4').click(function () {
        const type = $('#id_type').val().trim();
        const category = $('#id_category').val().trim();
        const subcategory = $('#id_sub_category').val().trim();
    
        if (!type) {
            alert('Please enter a product type.');
            return;
        }
    
        shopData.products.push({
            type,
            category,
            subcategory
        });
    
        $('#page-3').addClass('hide');
        $('#page-4').removeClass('hide');
    });
    
    $('.back-btn-to-page-2').click(function () {
        $('#page-3').addClass('hide');
        $('#page-2').removeClass('hide');
    });

    console.log(shopData);
    

    $(".back-btn-to-page-2").click(function () {
        $("#page-3").addClass("hide");
        $("#page-2").removeClass("hide").css({
            position: 'absolute',
            width: '100%',
            background: 'rgba(240, 242, 245, 0.95)',
            zIndex: '1000',
            padding:'30px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)'
        });
    });

    $(".next-btn-to-page-4").click(function () {
        $("#page-3").addClass("hide");
        $("#page-4").removeClass("hide").css({
            position: 'absolute',
            width: '100%',
            background: 'rgba(240, 242, 245, 0.95)', 
            zIndex: '1000',
            padding:'30px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)'
        });
    });


    $('.next-btn-to-page-5').click(function () {
        const productName = $('#productName').val().trim();
        const productDesc = $('#productDesc').val().trim();
        const productImage = $('#productImage')[0].files[0]; 
        const productMRP = $('#productMRP').val().trim();
        const productListPrice = $('#productListPrice').val().trim();
        const productDiscount = $('#productDiscount').val().trim();
        const productGST = $('#productGST').val().trim();
        const productShipping = $('#productShipping').val().trim();
        const productStock = $('#productStock').val().trim();
    

        if (!productName || !productDesc || !productMRP || !productListPrice) {
            alert('Please fill in all the required fields.');
            return;
        }
    
  
        const productData = {
            name: productName,
            description: productDesc,
            image: productImage ? productImage.name : '', 
            mrp: productMRP,
            listPrice: productListPrice,
            discount: productDiscount,
            gst: productGST,
            shipping: productShipping,
            stock: productStock
        };
    
        shopData.productDetails = productData;
    

        $('#productTitle').text(productName);
        $('#productDescription').text(productDesc);
        $('#productPrice').text(`₹${productListPrice - (productListPrice * (productDiscount / 100))}`);
        $('#originalPrice').html(`<span class="text-decoration-line-through">₹${productMRP}</span>`);
    
    
        if (productImage) {
            const reader = new FileReader();
            reader.onload = function(e) {
                $('#productPreviewImage').attr('src', e.target.result);
            };
            reader.readAsDataURL(productImage);
        }
    

        $('#page-4').addClass('hide');
        $('#page-5').removeClass('hide');
    });
    
    $('.back-btn-to-page-3').click(function () {
        $('#page-4').addClass('hide');
        $('#page-3').removeClass('hide');
    });
    
      
    

    $('#productName, #productDesc').on('input', function () {
        $('#productTitle').text($('#productName').val() || 'Product title');
        $('#productDescription').text($('#productDesc').val() || 'Brief description of the product.');
    });


    $('input[type="file"]').on('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $('#productPreviewImage').attr('src', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
    $('#productMRP, #productListPrice, #productDiscount, #productGST, #productShipping, #productStock').on('input', function () {
        const mrp = parseFloat($('#productMRP').val()) || 0;
        const listPrice = parseFloat($('#productListPrice').val()) || 0;
        const discount = parseFloat($('#productDiscount').val()) || 0;
        const gst = parseFloat($('#productGST').val()) || 0;
        const shipping = parseFloat($('#productShipping').val()) || 0;
        const stock = parseInt($('#productStock').val()) || 1;

  
        let basePrice = listPrice - (listPrice * discount / 100);
        
        let priceWithGst = basePrice + (basePrice * gst / 100);

        let finalUnitPrice = priceWithGst + shipping;

        let totalPriceForStock = finalUnitPrice * stock;

        if (mrp > 0) {
            $('#originalPrice').html(`<span class="text-decoration-line-through">₹${mrp.toFixed(2)}</span>`);
        } else {
            $('#originalPrice').text('');
        }

        $('#productPrice').html(`
            ₹${finalUnitPrice.toFixed(2)} 
            <span class="d-block text-muted small">(x${stock} = ₹${totalPriceForStock.toFixed(2)})</span>
        `);
    });



    $(".back-btn-to-page-3").click(function () {
        $("#page-4").addClass("hide");
        $("#page-3").removeClass("hide").css({
            position: 'absolute',
            width: '100%',
            background: 'rgba(240, 242, 245, 0.95)',
            zIndex: '1000',
            padding:'30px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)'
        });
    });

    $(".next-btn-to-page-5").click(function () {
        $("#page-4").addClass("hide");
        $("#page-5").removeClass("hide").css({
            position: 'absolute',
            width: '100%',
            background: 'rgba(240, 242, 245, 0.95)',
            zIndex: '1000',
            padding:'30px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)'
        });
    });


    $('.finish-btn').click(function () {
        const storeName = $('#storeName').val().trim();
        const storeTitle = $('#storeTitle').val().trim();
        const supportEmail = $('#supportEmail').val().trim();
        const supportPhone = $('#supportPhone').val().trim();
        
        if (!storeName || !storeTitle) {
            alert('Please fill in the store name and title.');
            return;
        }
    
        shopData.store = {
            name: storeName,
            title: storeTitle,
            logo: $('#logoUpload')[0].files[0] ? $('#logoUpload')[0].files[0].name : '', 
            favicon: $('#faviconUpload')[0].files[0] ? $('#faviconUpload')[0].files[0].name : '', 
            support: {
                email: supportEmail,
                phone: supportPhone
            }
        };
    
        console.log(shopData);
    });

    $('#logoUpload').on('change', function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        
        reader.onload = function (e) {
            $('#storeLogoPreview').attr('src', e.target.result);  
        };
        
        reader.readAsDataURL(file);
    });

    $(document).ready(function () {
        $('#logoUpload').on('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    $('#storeLogoPreview').attr('src', e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });

        $('#storeName').on('input', function () {
            $('#previewStoreName').text($(this).val());
        });

        $('#storeTitle').on('input', function () {
            $('#previewStoreTitle').text($(this).val());
        });

        $('#supportEmail').on('input', function () {
            $('#previewEmail').text($(this).val());
        });

        $('#supportPhone').on('input', function () {
            $('#previewPhone').text($(this).val());
        });

        $('#addSupport').on('change', function () {
            if ($(this).is(':checked')) {
                $('#supportDetails').slideDown();
                $('#previewEmail, #previewPhone').parent().show();
            } else {
                $('#supportDetails').slideUp();
                $('#previewEmail, #previewPhone').parent().hide();
            }
        }).trigger('change');
    });

    $(".back-btn-to-page-4").click(function () {
        $("#page-4").removeClass("hide").css({
            position: 'absolute',
            width: '100%',
            background: 'rgba(240, 242, 245, 0.95)', 
            zIndex: '1000',
            padding:'30px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)'
        });
        $("#page-5").addClass("hide");
    });
    console.log(shopData);


    $('.finish-btn').click(function() {
        var storeName = $('#storeName').val();
        var storeTitle = $('#storeTitle').val();
        var supportEmail = $('#supportEmail').val();
        var supportPhone = $('#supportPhone').val();
        
        var logo = $('#logoUpload')[0].files[0] ? URL.createObjectURL($('#logoUpload')[0].files[0]) : '';
        var favicon = $('#faviconUpload')[0].files[0] ? URL.createObjectURL($('#faviconUpload')[0].files[0]) : '';
        
        $('#previewStoreNamePage6').text(storeName);
        $('#previewStoreTitlePage6').text(storeTitle);
        $('#previewEmailPage6').text(supportEmail);
        $('#previewPhonePage6').text(supportPhone);
        
        if (logo) {
            $('#storeLogoPage6').attr('src', logo);
        }
        
        $('#page-5').addClass('hide');
        $('#page-6').removeClass('hide').css({
            position: 'absolute',
            width: '100%',
            background: 'rgba(240, 242, 245, 0.95)', 
            zIndex: '1000',
            padding:'30px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)'
        });;
    });
    
});


