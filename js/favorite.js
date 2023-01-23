
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    let btn_remove = document.querySelectorAll(".fa-heart");
    btn_remove.forEach(allbtn => { allbtn.addEventListener("click", removeData) });
}
//==================================

let favtData;
if (localStorage.itemFav != null) {
    favtData = JSON.parse(localStorage.itemFav)
} else {
    favtData = [];
}
function showData() {
    let table = '';
    for (let i = 0; i < favtData.length; i++) {
        table += `
        <div class="box">
            <div class="image">
                <img src="${favtData[i].img}" class="main-img" alt="">
                <img src="${favtData[i].imghover}" class="hover-img" alt="">
                <div class="icons">
                    <a class="fas fa-shopping-cart"></a>
                    <a class="fas fa-heart"></a>
                </div>
            </div>
            <div class="content">
            <h6 style="display: none;" class="id_item">${favtData[i].id}</h6>
                <h3 class="title">${favtData[i].title}</h3>
                <div class="price"><a class="priceItme">${favtData[i].price} </a></div>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
            </div>
        </div>`
    }
    document.querySelector('.box-container').innerHTML = table
}

function removeData(event) {
    let btn = event.target;
    let parentbtn = btn.parentElement.parentElement.parentElement;
    let id = parentbtn.querySelector(".id_item");
    for (let i = 0; i < favtData.length; i++) {
        if (favtData[i].id == id.innerText) {
            favtData.splice(i, 1);
            localStorage.itemFav = JSON.stringify(favtData);
            showData()
            ready()
            return
        }
    }
}
showData()

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
        id:id.innerHTML,
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
