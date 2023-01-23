if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

let reciptData;
if (localStorage.itemCart != null) {
    reciptData = JSON.parse(localStorage.itemCart)
} else {
    reciptData = [];
}

let header = `
<a href="index.html" class="logo"> <i class="fas fa-store"></i> Loma </a>

<div class="icons">
<a href="index.html" class="fas fa-home"></a>
<a href="products.html" class="fas fa-store"></a>        
<a href="favorite.html" class="fas fa-heart"></a>  
<a href="cart.html" class="fas fa-shopping-cart"><span class="span_items">${reciptData.length}</span></a>
</div>
`

let quick_links =`
<a href="index.html" class="logo"> <i class="fas fa-store"></i> Loma </a>
<div class="links">
    <a href="index.html"> الصفحة الرئيسية </a>
    <a href="products.html"> المنتجات </a>
    <a href="favorite.html"> المفضلة </a>
    <a href="cart.html"> سلة التسوق </a>
    <a href="about.html"> حول </a>
    <a href="contact.html"> اتصل بنا </a>
    </div>

<div class="share">
    <a href="#" class="fab fa-facebook-f"></a>
    <a href="#" class="fab fa-twitter"></a>
    <a href="#" class="fab fa-instagram"></a>
    <a href="#" class="fab fa-linkedin"></a>
</div>
` 
let credit =`
<p> created by <span>Eslam Loma</span> | all rights reserved! </p>
<img src="images/card_img.png" alt="">
`

document.querySelector('.header').innerHTML = header
document.querySelector('.quick-links').innerHTML = quick_links
document.querySelector('.credit').innerHTML = credit
}

ready()