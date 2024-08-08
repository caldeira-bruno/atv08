import { urlBaseAPI, urlBaseFront } from "../url/base.js";

function realizaRegistro() {
    const data = new FormData(document.forms[0]);
    const opcoes = {
        method: 'post',
        credentials: 'include',
        body: new URLSearchParams(data)
    };

    fetch(`${urlBaseAPI}/user`, opcoes)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            if (json.registrado) {
                window.location = `${urlBaseFront}/index.html`;
            } else {
                alert(json.mensagem);
            }
        })
}

async function checkSeExisteRegistro() {
    const opcoes = {
        method: 'get',
        credentials: 'include'
    };
    const res = await fetch(`${urlBaseAPI}/user/existeusuario`, opcoes);
    const json = await res.json();
    if(json.existeusuario) {
        return true;
    } else {
        return false;
    }
}


function realizaLogin() {
    const data = new FormData(document.forms[0]);
    const opcoes = {
        method: 'post',
        credentials: 'include',
        body: new URLSearchParams(data)
    };
    fetch(`${urlBaseAPI}/user/login`, opcoes)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            if (json.logged) {
                //alert('Autenticado.');
                window.location = `${urlBaseFront}/index.html`;
            } else {
                alert('Tente novamente.');
            }
        })
}

async function checkLogin() {
    const opcoes = {
        method: 'get',
        credentials: 'include'
    };
    const res = await fetch(`${urlBaseAPI}/user/logged`, opcoes);
    const json = await res.json();
    if(json.logged) {
        //alert('Autenticado.');
        return true;
    } else {
        //alert('Login não realizado.');
        return false;
    }
}

export { realizaRegistro, checkSeExisteRegistro };
export { realizaLogin, checkLogin };