
//============== localstorageترحيل البيانات في الـ  =====================

let section = document.querySelector('.sec_products');
let shopping_Btn = section.querySelectorAll('.fa-shopping-cart');
shopping_Btn.forEach(forbtn => { forbtn.addEventListener("click", add_Item); });

function add_Item(event) {
    let btn = event.target;
    let parentBtn = btn.parentElement.parentElement.parentElement;
    let id = parentBtn.querySelector(".id_item");    
    let img = parentBtn.querySelector('.main-img');
    let title = parentBtn.querySelector(".title");
    let price = parentBtn.querySelector('.priceItme');
    let span_items = document.querySelector(".span_items");
 
    let newItem = {
        id:id.innerText,
        img: img.src,
        title: title.innerText,
        price: price.innerText,
    }

    let reciptData;

    if (localStorage.itemCart == null) {
        reciptData = [];

    } else {

        reciptData = JSON.parse(localStorage.itemCart);

        for (i = 0; i < reciptData.length; i++) {

            if (reciptData[i].id == id.innerText) {
                alert('This item is already added ')
                return
            }
        }

    }
    reciptData.push(newItem)
    localStorage.setItem('itemCart', JSON.stringify(reciptData));
    span_items.innerText =  reciptData.length
}

//=================================================================

let heart_Btn = section.querySelectorAll('.fa-heart');
heart_Btn.forEach(forbtn => { forbtn.addEventListener("click", fov_Item); });

function fov_Item(event) {
    let btn = event.target;
    let parentBtn = btn.parentElement.parentElement.parentElement;
    let id = parentBtn.querySelector(".id_item");    
    let img = parentBtn.querySelector('.main-img');
    let imghover = parentBtn.querySelector('.hover-img');
    let title = parentBtn.querySelector(".title");
    let price = parentBtn.querySelector('.priceItme');

    let newItem = {
        id:id.innerText,
        img: img.src,
        imghover: imghover.src,
        title: title.innerText,
        price: price.innerText,
    }

    let favtData;

    if (localStorage.itemFav == null) {
        favtData = [];

    } else {

        favtData = JSON.parse(localStorage.itemFav);

        for (i = 0; i < favtData.length; i++) {

            if (favtData[i].id == id.innerText) {
                alert('This item is already added ')
                return
            }
        }
    }
    favtData.push(newItem)
    localStorage.setItem('itemFav', JSON.stringify(favtData))
}
