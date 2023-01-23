
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    let btn_remove = document.querySelectorAll(".fa-times");
    btn_remove.forEach(allbtn => { allbtn.addEventListener("click", removeData) });
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 1) {
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('box-container')[0];
    var cartRows = cartItemContainer.getElementsByClassName('box');
    let form = document.querySelector("#contact-form");
    let Delivery = document.getElementsByClassName('Delivery')[0];
    let cart_total_price2 = document.getElementsByClassName('cart-total-price2')[0];
    let totall = document.querySelector(".total");
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = total + ' $'

    if (total == 0) {
        Delivery.innerText = '0 $' 
        cart_total_price2.innerText = '0 $'               
        totall.value = '';
        form.classList.add("contact-form");

    }else if (total < 100) {
        Delivery.innerText = '2 $' 
        cart_total_price2.innerText = total +  2  + ' $'       
        totall.value = total + 2  + ' $';
        form.classList.remove("contact-form");
    } else{
        Delivery.innerText = 'free'        
        cart_total_price2.innerText = total + 0  + ' $'       
        totall.value = total + 0  + ' $';
        form.classList.remove("contact-form");

    }
}

//==================================

let reciptData;
if (localStorage.itemCart != null) {
    reciptData = JSON.parse(localStorage.itemCart)
} else {
    reciptData = [];
}

function showData() {
    let text_order = document.querySelector(".text_order");
    text_order.value = "" ;
    let table = '';
    for (let i = 0; i < reciptData.length; i++) {
        table += `
        <div class="box">
        <i class="fas fa-times"></i>
        <img src="${reciptData[i].img}" alt="">
        <div class="content">
            <h6 style="display: none;" class="id_item">${reciptData[i].id}</h6>
            <h3 class="title">${reciptData[i].title}</h3>
            <form action="">
                <span>quantity : </span>
                <input class="cart-quantity-input" type="number" name="" value="1" id="">
            </form>
            <div class="price">${reciptData[i].price}</div>
        </div>
    </div>`
    
    text_order.value += "[" + reciptData[i].title + "]  " ;
    }
    document.querySelector('.box-container').innerHTML = table
    updateCartTotal()
}


function removeData(event) {
    let btn = event.target;
    let parentbtn = btn.parentElement;
    let id = parentbtn.querySelector(".id_item");
    let span_items = document.querySelector(".span_items");
    for (let i = 0; i < reciptData.length; i++) {
        if (reciptData[i].id == id.innerText) {
            reciptData.splice(i, 1);
            localStorage.itemCart = JSON.stringify(reciptData);
            span_items.innerText =  reciptData.length
            showData()
            ready()
            return
        }
    }
}
showData()

//======================== كود ارسال الطلب ================================


let btn_sent = document.querySelector(".btn_sent");
btn_sent.addEventListener("click", alertt)
function alertt(eo) {
    let order = document.querySelector(".text_order");
    if(order.value == ""){alert(" اختار صنف اولاً ")}
}

const scriptURL = 'https://script.google.com/macros/s/AKfycby-pE4goQWkIitlpElKSqxaGi1zo4nmTm_OmA1Ti4r_5ZRYIwcFxjfWVggFVfb73QRI/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
e.preventDefault()
fetch(scriptURL, { method: 'POST', body: new FormData(form)})
.then(response => alert(" تم ارسال الطلب بنجاح "), sendEmail(), clear())
.catch(error => console.error('Error!', error.message))
})

function clear(eo) {
    let span_items = document.querySelector(".span_items");
    for (let i = 0; i < reciptData.length; i++) {
        reciptData.splice(i, reciptData.length);
        localStorage.itemCart = JSON.stringify(reciptData);
        span_items.innerText =  reciptData.length
        showData()
        ready()
        return
    }
}

function sendEmail() {
    let txt = "لعرض جميع الطلبات اضغط علي هذه الرابط"
    let URL = "https://docs.google.com/spreadsheets/d/1AqU05z7yEXoNsZnFt4NCaUKA4bz_lWWf7-ZTls7pgkw/edit?usp=sharing";
    let name = document.querySelector(".name");
    let phone = document.querySelector(".phone");
    let address = document.querySelector(".address");
    let notes = document.querySelector(".notes");
    let order = document.querySelector(".text_order");
    let total = document.querySelector(".total");

    let body =  "Name : " + name.value + "<br><br> Phone : " + phone.value + "<br><br> Address : " + address.value 
     + "<br><br> Notes : " + notes.value + "<br><br> Order : " + order.value + "<br><br> Total : " + total.value ;
   
    Email.send({
      SecureToken : "585b81bb-37a9-4a98-8c00-9f4232394efc",
      To : 'loma8064@gmail.com',
      From : "loma8064@gmail.com",
      Subject : "New Order",
      Body :  body + "<br><br>" + txt + "<br>" + URL,
  })
  name.value = "" ;
  notes.value = "" ;
  phone.value = "" ;
  address.value = "" ;
  order.value = "" ;
  total.value = "" ;
}