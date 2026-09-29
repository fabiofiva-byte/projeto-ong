document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formContato");
    const inputNome = document.getElementById("nome");
    const inputEmail = document.getElementById("email");
    const erroNome = document.getElementById("erroNome");
    const erroEmail = document.getElementById("erroEmail");
    const mensagemAviso = document.getElementById("mensagemAviso");

    // Esconder mensagens de erro inicialmente
    erroNome.style.display = "none";
    erroEmail.style.display = "none";

    form.addEventListener("submit", (evento) => {
        evento.preventDefault(); // Impede o recarregamento tático da página
        let dadosValidos = true;

        // Validação do Nome: Apenas letras e espaços, mínimo de 3 caracteres
        const regexNome = /^[a-zA-ZÀ-ÿ\s]{3,}$/;
        if (!regexNome.test(inputNome.value.trim())) {
            erroNome.style.display = "block";
            inputNome.style.borderColor = "red";
            dadosValidos = false;
        } else {
            erroNome.style.display = "none";
            inputNome.style.borderColor = "green";
        }

        // Validação do E-mail: Padrão rigoroso de formatação
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(inputEmail.value.trim())) {
            erroEmail.style.display = "block";
            inputEmail.style.borderColor = "red";
            dadosValidos = false;
        } else {
            erroEmail.style.display = "none";
            inputEmail.style.borderColor = "green";
        }

        // Se o perímetro estiver seguro, proceder com a gravação
        if (dadosValidos) {
            const nomeBlindado = inputNome.value.trim();
            const emailBlindado = inputEmail.value.trim();

            // Gravar no Local Storage
            localStorage.setItem("ong_nome", nomeBlindado);
            localStorage.setItem("ong_email", emailBlindado);

            // Feedback de sucesso
            mensagemAviso.style.color = "green";
            mensagemAviso.textContent = `Operação limpa, ${nomeBlindado}! O seu registo foi validado e guardado com segurança.`;
            
            // Limpar formulário
            form.reset();
            inputNome.style.borderColor = "";
            inputEmail.style.borderColor = "";
        } else {
            mensagemAviso.style.color = "red";
            mensagemAviso.textContent = "Alerta: Falha na validação de dados. Verifique os campos a vermelho.";
        }
    });
});
