import {db} from './firebaseConfig.js'
import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const numerosIndisponiveis = [];
var numerosSelecionados = [];

function selectNumber(num){
    const divNumerosSelecionados = document.getElementById('numerosSelecionados');
    const divValorTotal = document.getElementById('valorTotal');
    numerosSelecionados.push(num);
    divNumerosSelecionados.innerHTML = `Números selecionados: <br> ${numerosSelecionados.join(', ')}`;
    const valorTotal = numerosSelecionados.length * 2;
    divValorTotal.innerHTML = `Valor total: R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
}

function desmarcarNum(num){
    const divNumerosSelecionados = document.getElementById('numerosSelecionados');
    const divValorTotal = document.getElementById('valorTotal');
    numerosSelecionados.splice(numerosSelecionados.indexOf(num), 1);
    divNumerosSelecionados.innerHTML = `Números selecionados: <br> ${numerosSelecionados.join(', ')}`;
    const valorTotal = numerosSelecionados.length * 2;
    divValorTotal.innerHTML = `Valor total: R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
}

async function carregarNumerosIndisponiveis() {
    const querySnapshot = await getDocs(collection(db, "rifas"));
    querySnapshot.forEach((doc) => {
        const numeroEscolhido = doc.data().numero;
        numerosIndisponiveis.push(numeroEscolhido);
    });
    criarBotoesNumeros();
}


async function salvarRifa(nome, telefone){
    try {
        for(let i = 0; i < numerosSelecionados.length; i++){
        await addDoc(collection(db, "rifas"), {
            numero: numerosSelecionados[i],
            nome: nome,
            telefone: telefone
        });
        numerosIndisponiveis.push(numerosSelecionados[i]);
    }
    }
    catch(error){
        console.error("Erro ao salvar a rifa: ", error);
        alert("Ocorreu um erro ao reservar o número. Tente novamente.");
    };
}

function criarBotoesNumeros() {
    const gridNumeros = document.getElementById('gridNumeros');
    
    for (let i = 1; i <= 1000; i++) {
        const botao = document.createElement('button');
        botao.textContent = i;
        botao.id = i;

        if (numerosIndisponiveis.includes(i)) {
            botao.classList.add('indisponivel');
        } else {
            botao.classList.add('disponivel');
        }

        botao.addEventListener('click', function() {
            if (numerosIndisponiveis.includes(i)) {
                alert('Este número já foi escolhido. Por favor, escolha outro.');
            } else {
                if(numerosSelecionados.includes(i)){
                    botao.classList.remove('selecionado');
                    botao.classList.add('disponivel');
                    desmarcarNum(i)
                } else{
                    let nome = document.getElementById('nome').value;
                    let telefone = document.getElementById('telefone').value;

                    if (nome && telefone) {
                        selectNumber(i)
                        botao.classList.remove('disponivel');
                        botao.classList.add('selecionado');
                    } else {
                        alert('Por favor, preencha o nome e telefone.');
                    }
                }

            }
        });

        gridNumeros.appendChild(botao);
    }
}

function formatarTelefone(value) {
    // Remove todos os caracteres que não sejam números
    value = value.replace(/\D/g, '');

    // Verifica se o número tem 11 dígitos (celular) ou 10 dígitos (fixo)
    if (value.length > 10) {
        // Formato para celular: (XX) XXXXX-XXXX
        return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 5) {
        // Formato para fixo: (XX) XXXX-XXXX
        return value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 2) {
        // Caso o usuário tenha digitado apenas parte do número
        return value.replace(/(\d{2})(\d*)/, '($1) $2');
    } else {
        // Caso o usuário tenha digitado apenas o DDD
        return value.replace(/(\d*)/, '($1');
    }
}

// Aplica a máscara enquanto o usuário digita
document.getElementById('telefone').addEventListener('input', function(e) {
    e.target.value = formatarTelefone(e.target.value);
});


function validarTelefone(telefone) {
    const regexTelefone = /^\(?\d{2}\)? ?\d{4,5}-?\d{4}$/;
    return regexTelefone.test(telefone);
}

async function confirmarPagamento() {
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const valorTotal = document.getElementById('valorTotal').textContent;

    if (nome === '') {
        alert('Por favor, insira seu nome.');
        return;
    }

    if (!validarTelefone(telefone)) {
        alert('Por favor, insira um número de telefone válido.');
        return;
    }

 
    if (numerosSelecionados.length > 0) {
        const confirmacao = confirm(
            `Nome: ${nome}\nTelefone: ${telefone}\n R$${valorTotal}.00\n Números selecionados: ${numerosSelecionados.join(', ')}\nDeseja confirmar a compra?`
        );

        if (confirmacao) {
           await salvarRifa(nome, telefone)
            alert('Compra confirmada! Obrigado por participar da rifa e boa sorte.');
            document.getElementById('valorTotal').textContent = 'R$ 0,00'; 
            numerosSelecionados = []; 
            location.reload();
        }
    } else {
        alert("Selecione ao menos um número para confirmar a compra.");
    }
}


const buttonFinalizar = document.getElementById('buttonConfirm')
buttonFinalizar.addEventListener('click', confirmarPagamento)

// Chama a função para carregar números indisponíveis ao carregar a página
window.onload = carregarNumerosIndisponiveis;