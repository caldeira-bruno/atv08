import { checkLogin } from "../login/login.js";
import { urlBaseAPI, urlBaseFront } from "../url/base.js";

let dados = [];

function desenhaTabela() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    for (let i = 0; i < dados.length; i++) {
        const tr = document.createElement('tr');
        const btEx = document.createElement('button');
        const btEd = document.createElement('button');

        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const td5 = document.createElement('td');
        const td6 = document.createElement('td');
        const td7 = document.createElement('td');

        btEx.innerText = 'Delete';
        btEx.setAttribute('data-id', dados[i].id);
        btEx.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            alternaModal();
            enviaDadosParaDelecao(id);
        });

        btEd.innerText = 'Edit';
        btEd.setAttribute('data-index', i);
        btEd.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            alternaModal();
            preencheFormParaEdicao(index);
        });

        td1.innerText = dados[i].id;
        td2.innerText = dados[i].client.nome; // Acessar o nome do cliente
        td3.innerText = dados[i].client.id;
        td4.innerText = dados[i].valor;
        td5.innerText = dados[i].inicio;
        td6.innerText = dados[i].fim;
        td7.append(btEd, btEx);

        tr.append(td1, td2, td3, td4, td5, td6, td7);
        tbody.append(tr);
    }
}

function carregaClients() {
    const opcoes = {
        method: 'get',
        credentials: 'include'
    };
    fetch(`${urlBaseAPI}/clients`, opcoes)
        .then((res) => {
            return res.json()
        })
        .then((json) => {
            const clients = json;
            const select = document.getElementById('ClientId');
            select.innerHTML = '';
            for (let i = 0; i < clients.length; i++) {
                const option = document.createElement('option');
                option.innerText = clients[i].nome;
                option.value = clients[i].id;
                select.append(option);                
            }
        });
}

function carregaDados() {
    const opcoes = {
        method: 'get',
        credentials: 'include'
    };
    fetch(`${urlBaseAPI}/loans`, opcoes)
        .then((res) => {
            return res.json()
        })
        .then((json) => {
            dados = json;
            desenhaTabela();
        });
}

function enviaDadosParaCadastro() {
    const dados = new FormData(document.querySelector('form'));
    const opcoes = {
        method: 'post',
        credentials: 'include',
        body: new URLSearchParams(dados)
    };
    fetch(`${urlBaseAPI}/loans`, opcoes)
        .then((res) => {
            return res.json()
        })
        .then((json) => {
            alert('Empréstimo cadastrado!');
            carregaDados();
        });
    alternaModal();
}

function enviaDadosParaDelecao(id) {
    const dados = new FormData();
    dados.append('id', id);
    const opcoes = {
        method: 'delete',
        credentials: 'include',
        body : new URLSearchParams(dados)
    };
    fetch(`${urlBaseAPI}/loans/`, opcoes)
        .then((res) => {
            return res.json()
        })      
        .then((json) => {
            alert('Empréstimo deletado!');
            carregaDados();
        });
    alternaModal();
}

function preencheFormParaEdicao(index) {
    document.querySelector('#id').value = dados[index].id;
    // document.querySelector('#nome').value = dados[index].nome;
    document.querySelector('#ClientId').value = dados[index].ClientId;
    document.querySelector('#valor').value = dados[index].valor;
    document.querySelector('#inicio').value = dados[index].inicio;
    document.querySelector('#fim').value = dados[index].fim;
}

function enviaDadosParaEdicao() {
    const dados = new FormData(document.querySelector('form'));
    const opcoes = {
        method: 'put',
        credentials: 'include',
        body: new URLSearchParams(dados)
    };
    fetch(`${urlBaseAPI}/loans`, opcoes)

        .then((res) => {
            return res.json();
        })           
        .then((json) => {
            alert('Empréstimo alterado!');
            carregaDados();
        });
    alternaModal();
}

function alternaModal() {
    document.querySelector('#modal').classList.toggle('mostrarModal');
}

document.querySelector('form button').addEventListener('click', (e) => {
    e.preventDefault();
    if (document.querySelector('#id').value) {
        enviaDadosParaEdicao();
    } else {
        enviaDadosParaCadastro();
    }
    document.querySelector('#id').value = '';
    e.target.parentNode.reset();
});

document.querySelector('#btNovo').addEventListener('click', alternaModal);
window.addEventListener('load', () => {
    checkLogin().then((res) => {
        if (res) {
            carregaClients();
            carregaDados();
        } else {
            window.location = `${urlBaseFront}/login/login.html`;
        }
    });
});