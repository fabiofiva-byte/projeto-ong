// Aguarda que todo o DOM seja carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
    
    // Captura o elemento do formulário pelo seu ID
    const formContato = document.getElementById('formContato');

    // Adiciona o Event Listener para a ação de 'submit' (enviar)
    formContato.addEventListener('submit', (evento) => {
        // Previne o comportamento padrão do navegador (recarregar a página)
        evento.preventDefault();

        // Captura e limpa (trim) os valores inseridos pelo utilizador
        const nomeValor = document.getElementById('nome').value.trim();
        const emailValor = document.getElementById('email').value.trim();

        // Validação de segurança extra (evita submissões com espaços em branco)
        if (nomeValor === '' || emailValor === '') {
            alert('Por favor, preencha todos os campos com informações válidas.');
            return;
        }

        // Estrutura os dados num objeto (boa prática para armazenar e escalar no futuro)
        const dadosUsuario = {
            nome: nomeValor,
            email: emailValor,
            dataRegisto: new Date().toISOString()
        };

        // Guarda no Local Storage. 
        // Como o Local Storage só aceita strings, usamos o JSON.stringify para converter o objeto
        localStorage.setItem('dados_ong_contato', JSON.stringify(dadosUsuario));

        // Manipulação do DOM: Cria e exibe uma mensagem de sucesso na tela
        exibirMensagemSucesso(nomeValor);

        // Limpa os campos do formulário após o sucesso
        formContato.reset();
    });
});

// Função dedicada à manipulação do DOM
function exibirMensagemSucesso(nome) {
    // Verifica se já existe uma mensagem anterior e remove-a para não duplicar
    let msgAntiga = document.getElementById('msg-sucesso');
    if (msgAntiga) {
        msgAntiga.remove();
    }

    // Cria um novo parágrafo dinamicamente
    const mensagem = document.createElement('p');
    mensagem.id = 'msg-sucesso';
    mensagem.textContent = `Excelente, ${nome}! O seu registo foi guardado com sucesso.`;
    mensagem.style.color = 'green';
    mensagem.style.fontWeight = 'bold';
    mensagem.style.marginTop = '15px';

    // Insere a mensagem logo após o formulário
    const form = document.getElementById('formContato');
    form.insertAdjacentElement('afterend', mensagem);
}
