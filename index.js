const numerosIndisponiveis = [23, 56, 150, 785, 999]; // Exemplo de números já escolhidos
var numerosSelecionados = [];

function selectNumber(num){
    const divNumerosSelecionados = document.getElementById('numerosSelecionados');
    numerosSelecionados.push(num);
    divNumerosSelecionados.innerHTML = numerosSelecionados.join(', ');

}


function criarBotoesNumeros() {
    const gridNumeros = document.getElementById('gridNumeros');
    
    for (let i = 1; i <= 1000; i++) {
        const botao = document.createElement('button');
        botao.textContent = i;

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
                    alert('Este número já foi selecionado.');
                } else{
                    selectNumber(i)
                    botao.classList.remove('disponivel');
                    botao.classList.add('selecionado');
                    // numerosIndisponiveis.push(i);
                    // alert(`Número ${i} escolhido com sucesso!`);
                    // botao.classList.remove('disponivel');
                    // botao.classList.add('indisponivel');
                }

            }
        });

        gridNumeros.appendChild(botao);
    }
}

criarBotoesNumeros();