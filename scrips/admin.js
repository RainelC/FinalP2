//#region Doctores CRUD 

const url = 'https://localhost:7198/api/Doctores';

const label = document.getElementsByClassName('label')[0];

let btnDoctors = document.getElementById('doctores');
let doctores = [];

btnDoctors.addEventListener('click', function () {
    if (document.getElementsByClassName("window").length > 0) {
        document.getElementsByClassName("window")[0].remove();
        btnDoctors.style.background = '';
    } else {
        mostrar_data();
    }
});

function mostrar_data() {
    btnDoctors.style.background = '#658DA6';
    btnEspecialidades.style.background = '';
    btnDashhboard.style.background = '';

    label.innerHTML = ventana;
    let list = document.getElementsByClassName("list-d")[0];
    let busqueda = document.getElementById("search-form");
    fetch(url)
        .then(responde => responde.json())
        .then(data => {
            if (data.length != 0) {
                data.forEach(element => {
                    doctores.push(element);
                    getEspe(element.especialidad).then(name => {
                        doctor = `<div class="box" id="${element.id}">
                                        <label>${element.name} ${element.lastName}</label>
                                        <label>${name}</label>
                                    </div>`
                        list.innerHTML += doctor;
                    })
                })
            }
            busqueda.addEventListener('submit', function (event) {
                list.innerHTML = '';
                event.preventDefault();
                const formData = new FormData(busqueda);
                const Userdata = Object.fromEntries(formData);
                console.log(Userdata)
                if (Userdata.search != '') {
                    fetch(url)
                        .then(responde => responde.json())
                        .then(data => {
                            if (data.length != 0) {
                                data.forEach(element => {
                                    doctores.push(element);
                                    console.log(element.name == Userdata.search);
                                    if (Userdata.filtro == 'name') {

                                        if (element.name.toLowerCase().includes(Userdata.search.toLowerCase())) {

                                            getEspe(element.especialidad).then(name => {
                                                doctor = `<div class="box" id="${element.id}">
                                                <label>${element.name} ${element.lastName}</label>
                                                <label>${name}</label>
                                            </div>`
                                                list.innerHTML += doctor;
                                            })
                                        }
                                    } else {
                                        if (Userdata.filtro == 'lastname') {
                                            if (element.lastName.toLowerCase().includes(Userdata.search.toLowerCase())) {
                                                getEspe(element.especialidad).then(name => {
                                                    doctor = `<div class="box" id="${element.id}">
                                                    <label>${element.name} ${element.lastName}</label>
                                                    <label>${name}</label>
                                                </div>`
                                                    list.innerHTML += doctor;
                                                })
                                            }
                                        } else {
                                            if (Userdata.filtro == 'especialidad') {
                                                getEspe(element.especialidad).then(name => {
                                                    if (name.toLowerCase().includes(Userdata.search.toLowerCase())) {
                                                        doctor = `<div class="box" id="${element.id}">
                                            <label>${element.name} ${element.lastName}</label>
                                            <label>${name}</label>
                                            </div>`
                                                        list.innerHTML += doctor;
                                                    }
                                                });
                                            }
                                        }
                                    }

                                });
                            }
                        }).catch(err => console.log("Error: ", err));
                } else {
                    mostrar_data()
                }
            })
        })


    list.removeEventListener('click', function (event) {
        seleccionar(event);
    });
    list.addEventListener('click', function (event) {
        seleccionar(event);
    });

    let btnPlus = document.getElementById("btn_plus");
    btnPlus.addEventListener('click', mostrar_form);
};


let selected;
let DoctorId;
let buttons = ` <button class="barbtn" id="edit" style="
    left: 15em;">Editar</button>
            <button class="barbtn" id="delete">Eliminar</button> `

function seleccionar(event) {
    let btnPlus = document.getElementById("btn_plus");
    btnPlus.removeEventListener('click', mostrar_form);
    btnPlus.addEventListener('click', mostrar_form);
    btnPlus.style.display = 'inline';
    const bar = document.getElementsByClassName("bar")[0];
    const Divdata = document.getElementsByClassName("data")[0];
    console.log(selected)
    if (selected != null) {
        var st = document.getElementById(selected);
        if (st != null) {
            st.className = 'box';
            bar.lastElementChild.remove();
            bar.lastElementChild.remove();
            Divdata.innerHTML = '';
        }
    }

    let idDoctor = event.target.getAttribute('id');
    selected = idDoctor;
    let DoctorSelected = document.getElementById(idDoctor);
    if (DoctorSelected) {
        DoctorSelected.className = 'selected_box';
        btnPlus.style.display = 'none';
    }
    for (let i = 0; i < doctores.length; i++) {

        var element = doctores[i];
        DoctorId = element.id;

        if (DoctorId == idDoctor) {
            getEspe(element.especialidad).then(name => {
                Divdata.innerHTML = `
                        <div class="dataDoctor">
                            <h1>${element.name} ${element.lastName}</h1>
                            <h2 id='address'>Medical License</h2>
                            <p id='paddress'>${element.medical_License}</p>
                            <h2 id='address'>Especialidad</h2>
                            <p id='paddress'>${name}</p>
                            <h2 id='phone'>Phone Number</h2>
                            <p id='pphone'>${element.phoneNumber}</p>
                            <h2 id='mail'>Mail</h2>
                            <p id='pmail'>${element.email}</p>
                        </div>`;
            });
            bar.innerHTML += buttons;
            break;
        }
    }

    document.getElementById('delete').addEventListener('click', function () {
        popupWindow.style.display = "flex";
    })

    document.getElementById('edit').addEventListener('click', function () {
        document.getElementsByClassName("list-data")[0].style.display = 'none';
        document.getElementsByClassName("window")[0].style = "width: 50vw;";
        document.getElementsByClassName("data")[0].innerHTML = html_data_complete(element);
        document.getElementsByClassName("data")[0].style = 'position: relative; left: 115px';
        let bar = document.getElementsByClassName("bar")[0];
        bar.innerHTML = buttonp;
        console.log(element.especialidad)
        form_format(element.especialidad);
        edit(idDoctor);
        document.getElementById('cancel').addEventListener('click', mostrar_data);
    });
};

function mostrar_form() {
    let btnPlus = document.getElementById("btn_plus")
    btnPlus.style.display = 'none';
    document.getElementsByClassName("list-data")[0].style.display = 'none';
    document.getElementsByClassName("window")[0].style = "width: 50vw;";
    document.getElementsByClassName("data")[0].innerHTML = html_data;
    document.getElementsByClassName("data")[0].style = 'position: relative; left: 115px';
    form_format();
    document.getElementsByClassName("bar")[0].innerHTML += buttonp;
    añadir_elemento(btnPlus);
}


function form_format(id) {
    let comboboxx = document.getElementById('comboboxx');
    fetch(url2)
        .then(responde => responde.json())
        .then(data => {
            if (data.length != 0) {
                data.forEach(element => {
                    if (element.id == id) {
                        comboboxx.innerHTML += `<option selected value= '${element.id}'>${element.name}</option>`;
                    }
                    else {
                        comboboxx.innerHTML += `<option value= '${element.id}'>${element.name}</option>`;
                    }
                });
            }
        }).catch(err => console.log("Error: ", err));
}





function getEspe(id) {
    return fetch(url2 + `/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.name);
            return data.name; // Retorna el valor correctamente
        })
        .catch(err => {
            console.log("Error: ", err);
        });
}

/// Añadir un doctor 


let buttonp = ` <button class="barbtn" id="cancel">Cancelar</button>`

//// mostrar comboBox de especialidades


btnPlusHTML = `<button class="barbtn" id="btn_plus">Añadir doctor</button>`


function html_data_complete(data) {
    return `<div class="datacontact">
            <form class="form_data">
                <h2>First Name</h1>
                <input type="text" name = 'name' placeholder="First Name" id="input-name" value= ${data.name} required>
                <h2>Last Name</h1>
                <input type="text" name = 'lastName' placeholder="Last Name" id="input-last-name" value= ${data.lastName} required>
                           
                <h2 id="phone">Phone Number</h2>
                <input type="text" name = 'phoneNumber' placeholder="Phone" id="input-phone" value= ${data.phoneNumber} required>
                <p id="errorP"></p>
               
                <h2>Medical License</h1>
                <input type="text" name = 'medical_License' placeholder="Medical certificate" maxlength="12" value= ${data.medical_License} id="input-license" required>

                <select name="especialidad" id="comboboxx">
                     
                </select>  

                <h2 id="mail">Mail</h2>
                <input type="email" name="email" value= ${data.email} placeholder="Email Address" id="input-email" required>
                 <p id="errorE"></p>
                
                <h2 id="password">Password</h2>  
                 <input type="password" name="password" value= ${data.password} placeholder="Secret Password" id="input-password" required> 

                <input type="submit" class="barbtn" id="save" value="Guardar">
             </form>
        </div>`;
}


let html_data = `<div class="datacontact">
            <form class="form_data">
                <h2>First Name</h1>
                <input type="text" name = 'name' placeholder="First Name" id="input-name" required>
                <h2>Last Name</h1>
                <input type="text" name = 'lastName' placeholder="Last Name" id="input-last-name" required>
                           
                <h2 id="phone">Phone Number</h2>
                <input type="text" name = 'phoneNumber' placeholder="Phone" id="input-phone" required>
                <p id="errorP"></p>
               
                <h2>Medical License</h1>
                <input type="text" name = 'medical_License' placeholder="Medical certificate" id="input-license" maxlength="12" required>

                <select name="" id="comboboxx">
                     
                </select>  

                <h2 id="mail">Mail</h2>
                <input type="email" name="email"  placeholder="Email Address" id="input-email" required>
                 <p id="errorE"></p>
                
                <h2 id="password">Password</h2>  
                 <input type="password" name="password"  placeholder="Secret Password" id="input-password" required> 

                <input type="submit" class="barbtn" id="save" value="Guardar">
             </form>
        </div>`;

let ventana = `<div class="window">
        <div class="list-data">
            <div class="search">
                <div class="search_bar">
                    <form action="#" id="search-form">
                        <select name="filtro" id="combobox">
                            <option value="name">Nombre</option>
                            <option value="lastname">Apellido</option>
                            <option value="especialidad">Especialidad</option>
                        </select>                            
                        <input type="text" name="search", id="search_input", placeholder="Buscar doctor">
                        <input type="submit" value="Buscar" id="btnSearch">
                    </form>
                </div>
            </div>
            <div class="list">
                <div class="list-labels">
                    <label>Nombre</label>
                    <label>Especialidad</label>
                </div>
                <div class="list-d" style="
    width: 100%;
">
                 </div>
            </div>
        </div>
        <div class="edit-data">
            <div class="bar">
                <button class="barbtn" id="btn_plus">Añadir doctor</button>
            </div>
            <div class="data"></div>
        </div>
    </div>`

function añadir_elemento() {
    let input_phone = document.getElementById('input-phone');
    let input_mail = document.getElementById('input-email');
    let form = document.getElementsByClassName("form_data")[0];
    let comboboxx = document.getElementById('comboboxx');
    let errorP = document.getElementById("errorP");
    let errorE = document.getElementById("errorE");

    form.addEventListener('submit', function (event) {

        let formData = new FormData(form);
        let Userdata = Object.fromEntries(formData);
        Userdata['especialidad'] = parseInt(comboboxx.value);
        console.log(Userdata);
        fetch(url + '/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Userdata)
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data['error'] == "Mail conflict") {
                    input_mail.id = 'input-1';
                    errorE.innerText = "That mail is taken. Try another or Login.";
                } else {
                    if (data['error'] == "Phone conflict") {
                        input_phone.id = 'input-1';
                        errorP.innerText = "That PhoneNumber is taken. Try another or Login.";
                    } else {
                        if (data.status == 400) {
                            alert("Error 400");
                        } else {
                            mostrar_data()
                        }
                    }
                }
            })
            .catch(error => console.log("error: ", error))
    });

    btncancell = document.getElementById('cancel');
    btncancell.addEventListener('click', mostrar_data);
}


//eliminar

var popupWindow = document.getElementById("popup-window");
var closeButton = document.getElementById("close-button");
var deleteButton = document.getElementById("delete-button");

closeButton.addEventListener('click', function () {
    popupWindow.style.display = "none";
})

deleteButton.addEventListener('click', function () {
    fetch(url + '/delete?id=' + DoctorId, {
        method: 'DELETE'
    }).then(response => response.json())
        .then(data => {
            popupWindow.style.display = "none";
            Divdata.innerHTML = '';
            bar.innerHTML = '';
            mostrar_data();
        })
        .catch(error => error);
})

///editar 

function edit(idDoctor) {

    let form = document.getElementsByClassName('form_data')[0];

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const Userdata = Object.fromEntries(formData);
        Userdata["id"] = idDoctor;
        fetch(url + '/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Userdata)
        }).then(res => res)
            .then(data => {
                console.log(data)
                if (data['error'] == "Mail conflict") {
                    input_mail.id = 'input-1';
                    errorE.innerText = "That mail is taken. Try another or Login.";
                } else {
                    if (data['error'] == "Phone conflict") {
                        input_phone.id = 'input-1';
                        errorP.innerText = "That PhoneNumber is taken. Try another or Login.";
                    } else {
                        if (data.status == 404) {
                            alert("Error 404");
                        } else {
                            if (data.status == 400) {
                                alert("Error 400");
                            } else {
                                mostrar_data()
                            }
                        }
                    }
                }

                if (data.status == 400) {
                    alert("Error 400");
                } else if (data.status == 200) {
                    // alert("Contacto actualizado correctamente");
                    console.log(mostrar_data());
                    Divdata.innerHTML = '';
                    bar.innerHTML = '';
                }
            })
            .catch(error => console.log("error: ", error));
    });
}


/// filtro doctores





// #endregion

// #region Especialidades

const url2 = 'https://localhost:7198/api/Especialidades';

let btnEspecialidades = document.getElementById('especialidades');

btnEspecialidades.addEventListener('click', function () {
    if (document.getElementsByClassName("window_especialidades").length > 0) {
        document.getElementsByClassName("window_especialidades")[0].remove();
        btnEspecialidades.style.background = '';
    } else {
        mostrar_ventana_especialidades();
    }
});

let especilidadesList = []
function mostrar_ventana_especialidades() {
    btnEspecialidades.style.background = '#658DA6';
    btnDoctors.style.background = '';
    btnDashhboard.style.background = '';

    label.innerHTML = ventana_especialidades;
    let list_espe = document.getElementsByClassName('list-especialidades')[0];
    fetch(url2)
        .then(responde => responde.json())
        .then(data => {
            if (data.length != 0) {
                data.forEach(element => {
                    especilidadesList.push(element);
                    list_espe.innerHTML += `<div class="box" id="${element.id}">
                        <label >${element.name}</label>
                        </div>`;
                });
            }
        }).catch(err => console.log("Error: ", err));

    list_espe.addEventListener('click', function (event) {
        seleccionarEspe(event);
    });

    let btnPlus = document.getElementById("btn_plus_espe");
    btnPlus.addEventListener('click', function () {
        btnPlus.style.display = 'none';
        document.getElementsByClassName("window_especialidades")[0].innerHTML += divEdit;
        document.getElementsByClassName("list-border")[0].style = 'margin-left: 23px;';
        document.getElementsByClassName("window_especialidades")[0].style = "height: 72vh;  width: 50vw;";
        document.getElementsByClassName("bar")[0].innerHTML += buttonE;
        let btncancell = document.getElementById('cancelar');
        btncancell.addEventListener('click', mostrar_ventana_especialidades);
        añadir_especialidad();
    });
};

// Añadir especialidad 

function añadir_especialidad() {
    let btnSave = document.getElementById('guardar');

    btnSave.addEventListener('click', function () {
        let input = document.getElementById('name');
        let data = {
            "name": input.value
        };
        if (data.name == '') {
            document.getElementById("errorm").innerText = "No ha introducido ningún valor";
        } else {
            fetch(url2 + '/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res)
                .then(data => {
                    if (data.status == 400) {
                        document.getElementById("errorm").innerText = "La especialidad ya existe";
                    } else {
                        mostrar_ventana_especialidades();
                    }
                })
        }
    });
}

// Editar/eliminar especialidades
let espeSelected;
function seleccionarEspe(event) {
    if (espeSelected != null) {
        var st = document.getElementById(espeSelected)
        if (st != null) {
            st.className = 'box';
            document.getElementById(`btns${espeSelected}`).remove();
            mostrar_ventana_especialidades;
        }
    }
    let idEspecialidad = event.target.getAttribute('id');
    espeSelected = idEspecialidad;
    let EspecialidadSelected = document.getElementById(idEspecialidad);
    if (EspecialidadSelected) {
        EspecialidadSelected.className = 'selected_box_espe';
        EspecialidadSelected.innerHTML += `<div id="btns${idEspecialidad}"><span id="Editicon" class="material-symbols-outlined">edit</span>
                        <span class="material-symbols-outlined" id="deleteicon" style="margin-left: 27px;">delete</span> </div>`
    }

    let editbtn = document.getElementById("Editicon");
    let deleteicon = document.getElementById("deleteicon");

    deleteicon.addEventListener('mouseover', function () {
        deleteicon.style.color = 'red';
    });
    deleteicon.addEventListener('mouseleave', function () {
        deleteicon.style.color = '';
    });

    document.getElementById("deleteicon").addEventListener('click', function () {
        deleteEspe(idEspecialidad);
    });

    editbtn.addEventListener('mouseover', function () {
        editbtn.style.color = 'yellow';
    });

    editbtn.addEventListener('mouseleave', function () {
        editbtn.style.color = '';
    });

    editbtn.addEventListener('click', function () {
        editEspe(idEspecialidad);
    });

};


function deleteEspe(idEspecialidad) {
    fetch(url2 + `/delete?id=${idEspecialidad}`, {
        method: 'DELETE'
    }).then(response => response)
        .then(data => {

            if (data.status == 400) {
                alert("Error al eliminar")
            } else {
                if (data.status == 409) {
                    alert("Especialidad asignada a un doctor, no es posible eliminarla")
                } else {
                    mostrar_ventana_especialidades();
                }
            }
        })
}

function editEspe(idEspecialidad) {
    let EspecialidadSelected = document.getElementById(idEspecialidad).firstElementChild;
    let btnPlus = document.getElementById("btn_plus_espe");
    btnPlus.style.display = 'none';
    document.getElementsByClassName("window_especialidades")[0].innerHTML += divEdit;
    document.getElementsByClassName("list-especialidades")[0].style = 'margin-left: 23px;';
    document.getElementsByClassName("window_especialidades")[0].style = "height: 72vh;  width: 50vw;";
    document.getElementsByClassName("bar")[0].innerHTML += buttonE;
    console.log(EspecialidadSelected)
    document.getElementById('name').value = EspecialidadSelected.textContent;
    let btncancell = document.getElementById('cancelar');
    btncancell.addEventListener('click', mostrar_ventana_especialidades);
    let btnSave = document.getElementById('guardar');

    btnSave.addEventListener('click', function () {
        let input = document.getElementById('name');
        let data = {
            "id": idEspecialidad,
            "name": input.value
        };
        if (data.name == '' || data.name == EspecialidadSelected.textContent) {
            document.getElementById("errorm").innerText = "No ha introducido ningún valor";
        } else {
            console.log(data)
            fetch(url2 + '/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res)
                .then(data => {

                    if (data.status == 400) {
                        document.getElementById("errorm").innerText = "La especialidad ya existe";
                    } else {
                        mostrar_ventana_especialidades();
                    }
                });
        }
    })
}

let ventana_especialidades = `<div class="window_especialidades">
            <div class="div-list-especialidades" style="height: 100%; width: 90%; ">
                <div class="Text" style="text-align: center;">
                   <h1>Especialidades</h1> 
                </div>
                <div class="list-border">   
                    <div class="scroll">
                        <div class="list-especialidades">                   
                        </div>
                    </div>                
                </div>
                <button class="barbtn" id="btn_plus_espe">Añadir nueva</button>
            </div>
        </div>`


let divEdit = `<div class="edit-data">
                <div class="bar" style = "top: 60%; left: 35%;">
                    
                </div>
                <div class="data" style="text-align: center; top: 145px; position: relative;">
                    <form class="form_espe">
                        <div class="box">
                            <h2>Editar especialidad</h2>
                            <p>Nombre especialidad</p>                            
                            <input type="text" name="name" id="name" required>
                            <p id="errorm"></p>
                        </div>
                    </form>
                </div>
            </div>`

let buttonE = `<button class="barbtn" id="cancelar" style="margin-right: 10px; left:0px">Cancelar</button>
                <button class="barbtn" style="left:0px;" id="guardar" >Guardar</button> `

// #endregion



// #region Dashboard

const url3 = 'https://localhost:7198/api/Citas';
let btnDashhboard = document.getElementById('dashboard');


btnDashhboard.addEventListener('click', function () {
    if (document.getElementsByClassName("window_dashboard").length > 0) {
        document.getElementsByClassName("window_dashboard")[0].remove();
        btnDashhboard.style.background = '';
    } else {
        mostrar_data_dashboard();
    }
})

// function mostrar_data_dashboard() {
//     btnDashhboard.style.background = '#658DA6';
//     btnEspecialidades.style.background = '';
//     btnDoctors.style.background = '';

//     label.innerHTML = ventana_dashboard;

//     let list_espe = document.getElementsByClassName('list-citas-data')[0];

//     fetch(url3)
//         .then(responde => responde.json())
//         .then(data => {
//             if (data.length != 0) {
//                 data.forEach(element => {
//                     especilidadesList.push(element);
//                     list_espe.innerHTML += `<div class="box" id="1" style="width: 88vw;height: 5vh;display: flex;flex-direction: row;justify-content: space-between;">
//     <label style="">${element.paciente}</label>
//     <label>${element.doctor}</label>
//     <label>${element.especialidad}</label>
//     <label>${element.fecha}</label>
// </div>`
//                 });
//             }
//         }).catch(err => console.log("Error: ", err));
// };



function mostrar_data_dashboard() {
        btnDashhboard.style.background = '#658DA6';
        btnEspecialidades.style.background = '';
        btnDoctors.style.background = '';

        label.innerHTML = ventana_dashboard;
        let busqueda = document.getElementById("search-form");
        let list_espe = document.getElementsByClassName('list-citas-data')[0];
    
        fetch(url3)
            .then(responde => responde.json())
            .then(data => {
                if (data.length != 0) {
                    data.forEach(element => {
                        especilidadesList.push(element);
                        list_espe.innerHTML += `<div class="box" id="1" style="width: 88vw;height: 5vh;display: flex;flex-direction: row;justify-content: space-between;">
        <label style="">${element.paciente}</label>
        <label>${element.doctor}</label>
        <label>${element.especialidad}</label>
        <label>${element.fecha}</label>
    </div>`
                    });
                }
            }).catch(err => console.log("Error: ", err));

        busqueda.addEventListener('submit', function (event) {
            event.preventDefault();
            list_espe.innerHTML = '';
            const formData = new FormData(busqueda);
            const Userdata = Object.fromEntries(formData);
            console.log(Userdata)
            if (Userdata.search != '') {
                fetch(url3)
                    .then(responde => responde.json())
                    .then(data => {
                        if (data.length != 0) {
                            data.forEach(element => {
                                doctores.push(element);
                                console.log(element.name == Userdata.search);
                                if (Userdata.filtro == 'doctor') {

                                    if (element.doctor.toLowerCase().includes(Userdata.search.toLowerCase())) {

                                        list_espe.innerHTML += `<div class="box" id="1" style="width: 88vw;height: 5vh;display: flex;flex-direction: row;justify-content: space-between;">
                                            <label style="">${element.paciente}</label>
                                            <label>${element.doctor}</label>
                                            <label>${element.especialidad}</label>
                                            <label>${element.fecha}</label>
                                        </div>`
                                    }
                                } else {
                                    if (Userdata.filtro == 'especialidad') {
                                        if (element.especialidad.toLowerCase().includes(Userdata.search.toLowerCase())) {
                                            list_espe.innerHTML += `<div class="box" id="1" style="width: 88vw;height: 5vh;display: flex;flex-direction: row;justify-content: space-between;">
                                                <label style="">${element.paciente}</label>
                                                <label>${element.doctor}</label>
                                                <label>${element.especialidad}</label>
                                                <label>${element.fecha}</label>
                                            </div>`
                                        }
                                    } else {
                                        if (Userdata.filtro == 'paciente') {
                                                if (element.paciente.toLowerCase().includes(Userdata.search.toLowerCase())) {
                                                    list_espe.innerHTML += `<div class="box" id="1" style="width: 88vw;height: 5vh;display: flex;flex-direction: row;justify-content: space-between;">
                                                        <label style="">${element.paciente}</label>
                                                        <label>${element.doctor}</label>
                                                        <label>${element.especialidad}</label>
                                                        <label>${element.fecha}</label>
                                                    </div>`
                                                }
                                            } else{
                                                if (Userdata.filtro == 'fecha') {
                                                    if (element.fecha.toLowerCase().includes(Userdata.search.toLowerCase())){
                                                        list_espe.innerHTML += `<div class="box" id="1" style="width: 88vw;height: 5vh;display: flex;flex-direction: row;justify-content: space-between;">
                                                        <label style="">${element.paciente}</label>
                                                        <label>${element.doctor}</label>
                                                        <label>${element.especialidad}</label>
                                                        <label>${element.fecha}</label>
                                                    </div>`
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            );
                        }
                    }).catch(err => console.log("Error: ", err));
            } else {
                mostrar_data_dashboard()
            }
        })
};








ventana_dashboard = `<div class="window_dashboard">
                <div class="Text" style="text-align: left;width: 91%;">
                   <h1>Citas</h1> 
                </div>
                <div class="search" style="
    top: -30px;
    left: 27%;
    width: 36%;
    height: 7%;
">
                    <div class="search_bar">
                        <form action="#" id="search-form">
                            <select name="filtro" id="combobox">
                                <option value="doctor">Doctor</option>
                                <option value="especialidad">Especialidad</option>
                                <option value="fecha">Fecha</option>
                                <option value="paciente">Paciente</option>
                            </select>                            
                            <input type="text" name="search" ,="" id="search_input" placeholder="Buscar cita">
                            <input type="submit" value="Buscar" id="btnSearch">
                        </form>
                    </div>
            </div>
            <div class="list-border" style ="    top: -34px;
    width: 94vw;
    height: 62vh;">   
                    <div class="scroll">
                        <div class="list-citas"> 
                            <div class="list-labels">
                                <label>Paciente</label>
                                <label>Doctor</label>
                                <label>Especialidad doctor</label>
                                <label>Fecha</label>
                            </div>
                            <div class="list-citas-data">
                            </div>                  
                        </div>
                    </div>                
                </div>
        </div>`


// #endregion