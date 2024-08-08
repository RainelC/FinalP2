const url = "https://localhost:7198/api/Login";

const form = document.querySelector('.form');

var input = document.getElementById('input-email');
var text = document.getElementById('error1');
var input1 = document.getElementById('input-password');
var text1 = document.getElementById('error2');



form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);
    const Userdata = Object.fromEntries(formData);
    console.log(Userdata);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Userdata)
    }).then(res => res.json())
        .then(data => {
            switch (data.status) {
                case undefined:
                    window.open('/htmls/vista_admin.html', '_parent');
                    savedata(data);
                    break
                case 404:
                    input.id = 'input-1';
                    text.id = 'error';
                    break
                case 401:
                    input1.id = 'input-1';
                    text1.id = 'error';
                    break
                default:
                    console.log(data);
                    console.log(data.status);
                    console.log(Userdata)
                    break
            }
            console.log("data", data);
        }).catch(err => console.log(err));

})

input.addEventListener("keypress", myFunction);

function myFunction() {
    input.id = 'input';
    text.id = 'error1';
}

input1.addEventListener("keypress", myFunction1);

function myFunction1() {
    input1.id = 'input1';
    text1.id = 'error2';
}

function savedata(data) {
    localStorage.setItem("Name", data.name);
    localStorage.setItem("Lastname", data.lastName);
    localStorage.setItem("Mail", data.email);
    localStorage.setItem("ID", data.id);
}