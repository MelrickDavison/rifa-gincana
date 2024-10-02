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

