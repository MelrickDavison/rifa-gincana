const numerosIndisponiveis = [23, 56, 150, 785, 999]; // Exemplo de números já escolhidos

// Função para criar os botões dos números
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
                numerosIndisponiveis.push(i);
                alert(`Número ${i} escolhido com sucesso!`);
                botao.classList.remove('disponivel');
                botao.classList.add('indisponivel');
            }
        });

        gridNumeros.appendChild(botao);
    }
}

criarBotoesNumeros();