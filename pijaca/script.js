let allTotal = 0;

function addToCart(element){
    let singleItem = element.closest('.single-item');
    let price = singleItem.querySelector('.price').innerText;
    price = parseInt(price.substring(5));
    let quantity = singleItem.querySelector('input').value;
    let name = singleItem.querySelector('h3').innerText;
    
    let cartItem = document.querySelector(".cart-items");

    if(parseInt(quantity) > 0){

        let total = price * parseInt(quantity);
        allTotal += total;
        cartItem.innerHTML += 
        `<div class="cart-single-item">
            <h3>${name}</h3>
            <p>${price} RSD * ${quantity} = ${total} RSD</p>
            <button onclick="removeFromCart(this)" class="remove-item">Ukloni</button>
        </div>`

        document.querySelector('.total').innerText =`Ukupno: ${allTotal} RSD` ;

        element.innerHTML = 'Dodato';
        element.setAttribute('disabled', 'true');

    } else {
        alert('Odaberi količinu!!');
    }
    
}

function removeFromCart(element){
    
}