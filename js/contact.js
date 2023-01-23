function sendEmail() {
  let txt = "لعرض جميع الرسائل اضغط علي هذا الرابط"
  let URL = "https://docs.google.com/spreadsheets/d/1i3_bgUmxWXPb7JP9fXEFBfN-VlPe6uwUGrUT7UN-ZBE/edit?usp=sharing";
  let name = document.querySelector(".name");
  let phone = document.querySelector(".phone");
  let message = document.querySelector(".message");
  let body =  "Name : " + name.value + "<br><br> Phone : " + phone.value + "<br><br> Message : " + message.value ;
 
  Email.send({
    SecureToken : "585b81bb-37a9-4a98-8c00-9f4232394efc",
    To : 'loma8064@gmail.com',
    From : "loma8064@gmail.com",
    Subject : "New Message",
    Body :  body + "<br><br>" + txt + "<br><br>" + URL,
})
    name.value="";
    phone.value="";
    message.value="";
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbxpopkU1XWpAE87Qa-GdBEtJoDarDqTvlK7yQXxHSFxwkC17mXtzlYJk54Y3VcekBSj/exec'
const form = document.forms['submit-to-google-sheet2']
form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => alert(" تم الارسال بنجاح "),sendEmail(),)
    .catch(error => console.error('Error!', error.message))
})
