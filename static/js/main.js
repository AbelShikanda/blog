/*---------------------------------------
        Add to cart functionality
    -----------------------------------------*/
// add
(function($) {

    // Add

    $(document).on('click', '#add_btn', function(e) {
        console.log($('#add_btn').val());
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/cart/add',
            headers: { 'X-CSRFToken': csrftoken },
            data: {
                productid: $('#add_btn').val(),
                productqty: $('#select option:selected').text(),
                action: 'post'
            },
            success: function(json) {
                // console.log(json);
                document.getElementById("cart_qty").innerHTML = json.qty
            },
            error: function(xhr, errmsg, err) {}
        });
    })

    // Delete Item

    $(document).on('click', '.delete_btn', function(e) {
        e.preventDefault();
        var prodid = $(this).data('index');
        $.ajax({
            type: 'POST',
            url: '/cart/delete',
            headers: { 'X-CSRFToken': csrftoken },
            data: {
                productid: $(this).data('index'),
                action: 'post'
            },
            success: function(json) {
                $('.product_item[data-index="' + prodid + '"]').remove();
                document.getElementById("subtotal").innerHTML = json.subtotal;
                document.getElementById("cart_qty").innerHTML = json.qty
            },
            error: function(xhr, errmsg, err) {}
        });
    })

    // Update Item

    $(document).on('click', '.update_btn', function(e) {
        e.preventDefault();
        var prodid = $(this).data('index');
        $.ajax({
            type: 'POST',
            url: '/cart/update',
            headers: { 'X-CSRFToken': csrftoken },
            data: {
                productid: $(this).data('index'),
                productqty: $('#select' + prodid + ' option:selected').text(),
                action: 'post'
            },
            success: function(json) {
                document.getElementById("cart_qty").innerHTML = json.qty
                document.getElementById("subtotal").innerHTML = json.subtotal
            },
            error: function(xhr, errmsg, err) {}
        });
    })

    $(document).on('click', '#this', function getRndInteger(length) {
        length = 7;
        if (!length) {
            return '';
        }
        const possible =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let array;

        if ('Uint8Array' in self && 'crypto' in self && length <= 65536) {
            array = new Uint8Array(length);
            self.crypto.getRandomValues(array);
        } else {
            array = new Array(length);

            for (let i = 0; i < length; i++) {
                array[i] = Math.floor(Math.random() * 62);
            }
        }

        let result = '';

        for (let i = 0; i < length; i++) {
            result += possible.charAt(array[i] % 62);
        }

        document.getElementById('rand').value = result;

        $.ajax({
            type: 'POST',
            url: '/order/add/',
            headers: { 'X-CSRFToken': csrftoken },
            data: {
                rand_num: $('#rand').val(),
                first_name: $('#form_firstname').val(),
                last_name: $('#form_lastname').val(),
                town: $('#form_town').val(),
                estate: $('#form_estate').val(),
                landmark: $('#form_lamdmark').val(),
                house_no: $('#form_house').val(),
                phone: $('#form_phone').val(),
                action: "post"
            },
            success: function(json) {
                // document.getElementById("cart_qty").innerHTML = json.qty
                // document.getElementById("subtotal").innerHTML = json.subtotal
            },
            error: function(xhr, errmsg, err) {}
        });
    });

    // order

    // $(document).on('click', '#rand', function(e) {
    // // e.preventDefault();
    // x = Math.floor(Math.random() * 10)
    // console.log(x);
    // console.log($('#number').val());
    // // var totol = $('#price').val();
    // $.ajax({
    //     type: 'POST',
    //     url: '/order/add/',
    //     headers: { 'X-CSRFToken': csrftoken },
    //     data: {
    //         order_key: $('#number').val(),
    //         action: "post"
    //     },
    //     success: function(json) {
    //         // window.location.replace("http://127.0.0.1:8000/payment/orderplaced/");
    //     },
    //     error: function(xhr, errmsg, err) {}
    // });
    // })

    // function random() {

    //     document.getElementById("one").innerHTML = Math.floor(Math.random() * 10);
    // }

    // payment

    $(document).on('click', '#phoneSubmit', function(e) {
        // e.preventDefault();
        // console.log($('#price').val());
        // console.log($('#number').val());
        // console.log($('#rand').val());
        $.ajax({
            type: 'POST',
            url: '/payment/',
            headers: { 'X-CSRFToken': csrftoken },
            data: {
                phone: $('#number').val(),
                price: $('#price').val(),
                rand: $('#rand').val(),
                action: "post"
            },
            success: function(json) {
                // window.location.replace("http://127.0.0.1:8000/payment/orderplaced/");
            },
            error: function(xhr, errmsg, err) {}
        });
    })

}(jQuery));