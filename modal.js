function showCustomAlert(title, message) {
    return new Promise((resolve) => {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalMessage').innerHTML = message; // Use innerHTML para permitir <br>
        document.getElementById('customAlert').style.display = 'block';

        // Fecha o modal quando o usuário clica na 'x' ou fora do modal
        const closeModal = () => {
            document.getElementById('customAlert').style.display = 'none';
            resolve(); // Resolva a promise quando o modal for fechado
            window.removeEventListener('click', closeModal); // Remover o evento para evitar múltiplas ligações
        };

        document.getElementById('confirmButtonAlert').onclick = closeModal;

        // Fecha o modal quando o usuário clica fora da área do conteúdo
        window.addEventListener('click', (event) => {
            const modal = document.getElementById('customAlert');
            if (event.target === modal) {
                closeModal();
            }
        });
    });
}

function showCustomConfirm(title, message) {
    return new Promise((resolve) => {
        document.getElementById('modalTitleConfirm').textContent = title;
        document.getElementById('modalMessageConfirm').innerHTML = message; // Use innerHTML para permitir <br>
        document.getElementById('customConfirm').style.display = 'block';

        // Lida com a ação do botão de confirmação
        document.getElementById('confirmButtonConfirm').onclick = function() {
            document.getElementById('customConfirm').style.display = 'none';
            resolve(true); // Resolve a promessa com verdadeiro
        };

        // Lida com a ação do botão de cancelamento
        document.getElementById('cancelButton').onclick = function() {
            document.getElementById('customConfirm').style.display = 'none';
            resolve(false); // Resolve a promessa com falso
        };

        // Fecha o modal quando o usuário clica fora da área do conteúdo
        const closeConfirmModal = (event) => {
            const modal = document.getElementById('customConfirm');
            if (event.target === modal) {
                modal.style.display = 'none';
                resolve(false); // Resolve como falso se o modal foi fechado
                window.removeEventListener('click', closeConfirmModal); // Remover o evento para evitar múltiplas ligações
            }
        };

        window.addEventListener('click', closeConfirmModal);
    });
}

// Para os botões de fechamento
document.getElementById('closeModalConfirm').onclick = function() {
    document.getElementById('customConfirm').style.display = 'none';
};

export { showCustomAlert, showCustomConfirm };