import { sanitizarInput } from './modules/validation.js';
import { exibirMensagemSucesso } from './modules/ui.js';

const formContato = document.getElementById('formContato');

if (formContato) {
  formContato.addEventListener('submit', (event) => {
    event.preventDefault();
    const nomeSeguro = sanitizarInput(document.getElementById('nome').value);
    const emailSeguro = sanitizarInput(document.getElementById('email').value);

    localStorage.setItem('contatoONG', JSON.stringify({ nome: nomeSeguro, email: emailSeguro }));
    exibirMensagemSucesso('Dados salvos com segurança!');
  });
}
