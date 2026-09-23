document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-cadastro');
  const mensagemSucesso = document.getElementById('mensagem-sucesso');

  if (form) {
      form.addEventListener('submit', function(event) {
          event.preventDefault(); // Evita que a página recarregue ao enviar o formulário

          // Captura os valores dos campos
          const nome = document.getElementById('nome').value.trim();
          const email = document.getElementById('email').value.trim();

          // Validação extra (o HTML5 'required' já ajuda, mas aqui garantimos que não sejam só espaços)
          if (nome === '' || email === '') {
              alert('Por favor, preencha todos os campos.');
              return;
          }

          // Cria um objeto com os dados do novo voluntário
          const novoVoluntario = {
              id: Date.now(), // Gera um ID único baseado na data/hora
              nome: nome,
              email: email,
              dataCadastro: new Date().toLocaleDateString('pt-BR')
          };

          // Salva os dados no Local Storage do navegador
          salvarNoLocalStorage(novoVoluntario);

          // Esconde o formulário e mostra a mensagem de sucesso
          form.style.display = 'none';
          mensagemSucesso.style.display = 'block';

          // Apenas para testes: exibe no console o que foi salvo
          console.log('Dados salvos:', JSON.parse(localStorage.getItem('voluntarios_ong')));
      });
  }

  // Função auxiliar para lidar com o Local Storage
  function salvarNoLocalStorage(dado) {
      // 1. Tenta pegar a lista existente. Se não houver, cria um array vazio.
      let listaVoluntarios = JSON.parse(localStorage.getItem('voluntarios_ong')) || [];
      
      // 2. Adiciona o novo cadastro à lista
      listaVoluntarios.push(dado);
      
      // 3. Salva a lista atualizada de volta no Local Storage, convertendo para string
      localStorage.setItem('voluntarios_ong', JSON.stringify(listaVoluntarios));
  }
});
