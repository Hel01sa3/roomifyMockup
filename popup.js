document.body.insertAdjacentHTML('beforeend', `
    <div id="popup-overlay" class="popup-overlay">
        <div class="popup-content">
            <h3 id="popup-title">Título</h3>
            <p id="popup-msg">Mensagem</p>
            <div class="popup-buttons">
                <button id="btn-cancel-popup" class="btn-cancelar">Cancelar</button>
                <button id="btn-confirm-popup" class="btn-confirmar">Confirmar</button>
            </div>
        </div>
    </div>
`);

const overlay = document.getElementById('popup-overlay');
const titleEl = document.getElementById('popup-title');
const msgEl = document.getElementById('popup-msg');
const btnConfirm = document.getElementById('btn-confirm-popup');
const btnCancel = document.getElementById('btn-cancel-popup');

let acaoConfirmacaoAtual = null;

function confirmarExclusao(titulo, mensagem, funcaoAoConfirmar) {
    overlay.classList.remove('popup-mode-alert'); 
    titleEl.innerText = titulo;
    msgEl.innerText = mensagem;
    btnConfirm.innerText = "Excluir";
    btnConfirm.style.background = "var(--danger)";
    
    acaoConfirmacaoAtual = funcaoAoConfirmar;
    overlay.classList.add('active');
}

function mostrarSucesso(titulo, mensagem) {
    overlay.classList.add('popup-mode-alert'); 
    titleEl.innerText = titulo;
    msgEl.innerText = mensagem;
    btnConfirm.innerText = "OK";
    btnConfirm.style.background = "var(--blue)";
    
    acaoConfirmacaoAtual = null;
    overlay.classList.add('active');
}

function fecharPopup() {
    overlay.classList.remove('active');
}

btnCancel.addEventListener('click', fecharPopup);
btnConfirm.addEventListener('click', () => {
    fecharPopup();
    if (acaoConfirmacaoAtual) {
        setTimeout(() => acaoConfirmacaoAtual(), 300); 
    }
});