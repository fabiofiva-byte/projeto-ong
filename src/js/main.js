// === BASE DE DADOS TÁTICA DE PROJETOS ===
const baseDadosProjetos = [
    {
        titulo: "Educação Digital para Todos",
        descricao: "Aulas de informática básica e programação estruturada para jovens e adultos.",
        categoria: "Educação"
    },
    {
        titulo: "Inclusão no Mercado de Trabalho",
        descricao: "Workshops intensivos de preparação de currículos e simulação de entrevistas.",
        categoria: "Profissional"
    },
    {
        titulo: "Tecnologia nas Escolas Públicas",
        descricao: "Implementação de laboratórios de hardware e software em escolas de zonas carenciadas.",
        categoria: "Tecnologia"
    }
];

// === FUNÇÃO 1: RENDERIZAÇÃO DE PROJETOS ===
function desenharProjetosEcra() {
    const contentor = document.getElementById("lista-projetos-dinamica");
    if (!contentor) return; 

    contentor.innerHTML = ""; 

    baseDadosProjetos.forEach(projeto => {
        const cartao = document.createElement("div");
        
        cartao.style.border = "1px solid #008080";
        cartao.style.padding = "15px";
        cartao.style.marginBottom = "15px";
        cartao.style.borderRadius = "8px";
        cartao.style.backgroundColor = "#f9f9f9";

        cartao.innerHTML = 
            "<h3 style='margin-top: 0; color: #008080;'>" + projeto.titulo + "</h3>" +
            "<p style='font-size: 0.9em; color: #555;'><strong>Setor de Ação:</strong> " + projeto.categoria + "</p>" +
            "<p style='margin-bottom: 0;'>" + projeto.descricao + "</p>";
        
        contentor.appendChild(cartao);
    });
}

// === FUNÇÃO 2: GESTOR DE ESTADO DO AGENTE (CRUD) ===
function verificarRegistoAnterior() {
    const nomeGuardado = localStorage.getItem("ong_nome");
    const emailGuardado = localStorage.getItem("ong_email");
    
    const painelBoasVindas = document.getElementById("painelBoasVindas");
    const areaCadastro = document.getElementById("areaCadastro");
    const painelAgente = document.getElementById("painelAgente");
    const displayNome = document.getElementById("displayNome");
    const displayEmail = document.getElementById("displayEmail");
    
    if (nomeGuardado && emailGuardado) {
        // Modo: Agente Reconhecido (Esconde Formulário, Mostra Painel)
        if(painelBoasVindas) painelBoasVindas.innerHTML = "<h3 style='color: #008080; border-left: 4px solid #008080; padding-left: 10px;'>Bem-vindo de volta, Agente " + nomeGuardado + "!</h3>";
        if(areaCadastro) areaCadastro.style.display = "none";
        if(painelAgente) {
            painelAgente.style.display = "block";
            displayNome.textContent = nomeGuardado;
            displayEmail.textContent = emailGuardado;
        }
    } else {
        // Modo: Novo Recruta (Mostra Formulário, Esconde Painel)
        if(painelBoasVindas) painelBoasVindas.innerHTML = "";
        if(areaCadastro) areaCadastro.style.display = "block";
        if(painelAgente) painelAgente.style.display = "none";
    }
}

// === INICIALIZAÇÃO E SISTEMAS DE DEFESA ===
document.addEventListener("DOMContentLoaded", () => {
    
    verificarRegistoAnterior();
    desenharProjetosEcra();

    // Sensores do Formulário Principal
    const form = document.getElementById("formContato");
    const inputNome = document.getElementById("nome");
    const inputEmail = document.getElementById("email");
    const erroNome = document.getElementById("erroNome");
    const erroEmail = document.getElementById("erroEmail");
    const mensagemAviso = document.getElementById("mensagemAviso");

    if(erroNome) erroNome.style.display = "none";
    if(erroEmail) erroEmail.style.display = "none";

    // AÇÃO CREATE / UPDATE: Gravar Registo
    if(form) {
        form.addEventListener("submit", (evento) => {
            evento.preventDefault(); 
            let dadosValidos = true;

            const regexNome = /^[a-zA-ZÀ-ÿ\s]{3,}$/;
            if (!regexNome.test(inputNome.value.trim())) {
                erroNome.style.display = "block";
                inputNome.style.borderColor = "red";
                dadosValidos = false;
            } else {
                erroNome.style.display = "none";
                inputNome.style.borderColor = "green";
            }

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(inputEmail.value.trim())) {
                erroEmail.style.display = "block";
                inputEmail.style.borderColor = "red";
                dadosValidos = false;
            } else {
                erroEmail.style.display = "none";
                inputEmail.style.borderColor = "green";
            }

            if (dadosValidos) {
                const nomeBlindado = inputNome.value.trim();
                const emailBlindado = inputEmail.value.trim();

                // Guarda na base de dados do navegador (Local Storage)
                localStorage.setItem("ong_nome", nomeBlindado);
                localStorage.setItem("ong_email", emailBlindado);

                mensagemAviso.style.color = "green";
                mensagemAviso.textContent = "Operação limpa! Dados guardados com sucesso.";
                
                form.reset();
                inputNome.style.borderColor = "";
                inputEmail.style.borderColor = "";
                
                // Recarrega o estado visual
                verificarRegistoAnterior();
            } else {
                mensagemAviso.style.color = "red";
                mensagemAviso.textContent = "Alerta: Verifique os campos a vermelho.";
            }
        });
    }

    // AÇÃO UPDATE: Botão Editar Dados
    const btnEditar = document.getElementById("btnEditar");
    if(btnEditar) {
        btnEditar.addEventListener("click", () => {
            // Puxa os dados antigos para o formulário
            inputNome.value = localStorage.getItem("ong_nome") || "";
            inputEmail.value = localStorage.getItem("ong_email") || "";
            
            // Força a exibição do formulário para edição
            document.getElementById("areaCadastro").style.display = "block";
            document.getElementById("painelAgente").style.display = "none";
            document.getElementById("painelBoasVindas").innerHTML = "<h3 style='color: #ffa500; border-left: 4px solid #ffa500; padding-left: 10px;'>Modo de Edição Ativado.</h3>";
            mensagemAviso.textContent = "";
        });
    }

    // AÇÃO DELETE: Botão Apagar Registo
    const btnApagar = document.getElementById("btnApagar");
    if(btnApagar) {
        btnApagar.addEventListener("click", () => {
            // Pede confirmação tática ao agente
            if(confirm("Atenção, Agente! Tem a certeza que deseja eliminar o seu registo da base de dados?")) {
                // Remove os dados do Local Storage
                localStorage.removeItem("ong_nome");
                localStorage.removeItem("ong_email");
                
                // Limpa vestígios e reinicia o ecrã
                if(form) form.reset();
                mensagemAviso.textContent = "";
                verificarRegistoAnterior();
                alert("O seu registo foi apagado. Perímetro limpo.");
            }
        });
    }
});


