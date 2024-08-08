const url = "https://localhost:7198/api/Pacientes/create";

const form = document.querySelector('.form');


const input_cedula = document.getElementById('input-cedula');
const input_mail = document.getElementById('input-email');
const errorc = document.getElementById("errorc");
const errorm = document.getElementById("errorm");
const birthdate = document.getElementById('input-date');
var today = new Date().toISOString().substring(0,10);
birthdate.setAttribute("max",today);
const ageinput = document.getElementById('age');


birthdate.addEventListener('change', function(){
    let now = new Date();
    let bdate = new Date(birthdate.value);
    let age = now.getFullYear() - bdate.getFullYear();
    let difMonth = now.getMonth() - bdate.getMonth();

    if(difMonth < 0 || (difMonth === 0 && now.getDate() < bdate.getDate()+1)){
        age--
    }
    ageinput.value = age;

    if (age < 0){
        ageinput.style = "border: 2px solid rgb(243, 3, 3);";
    }else{
        ageinput.style = "2px solid rgba(0, 0, 0, 0.2);";
    }

    if (age < 18){
        document.getElementById('input-box-cedula').style.opacity = '20%';
        input_cedula.setAttribute('required', false)
        input_cedula.setAttribute('disabled', true);
    }else{
        document.getElementById('input-box-cedula').style.opacity = '100%';        
        input_cedula.setAttribute('required', true)
        input_cedula.removeAttribute('disabled')

    }
});


form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);
    const Userdata = Object.fromEntries(formData);
    console.log(Userdata);

    if (Userdata['sex'] == 'true'){
        Userdata['sex'] = true;
    }else{
        Userdata['sex'] = false;
    }

    if (Userdata['cedula'] == undefined){
        Userdata['cedula'] = null;
    }

    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Userdata)
    }).then(res => res.json())
      .then(data => {
         console.log(data)
         if (data['error'] == "cedula conflict"){
            input_cedula.id = 'input-1';
            errorc.innerText = "That cedula is taken. Try another or Login.";
         }else{
            if(data['error'] == "Mail conflict"){
                input_mail.id = 'input-1';
                errorm.innerText = "That email is taken. Try another or Login.";
            }else{
                if(data.status == 400){
                    alert("Error 400");
                }else{
                    window.open('/htmls/login.html', '_parent')
                }
            }
         }
    }).catch(err => {
        console.log(err);
    })

});
