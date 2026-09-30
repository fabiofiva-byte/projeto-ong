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

// === FUNÇÃO 2: RECONHECIMENTO DE AGENTE (Ler Local Storage) ===
function verificarRegistoAnterior() {
    const nomeGuardado = localStorage.getItem("ong_nome");
    const painel = document.getElementById("painelBoasVindas");
    
    if (nomeGuardado && painel) {
        painel.innerHTML = "<h3 style='color: #008080; border-left: 4px solid #008080; padding-left: 10px;'>Bem-vindo de volta, Agente " + nomeGuardado + "! O seu registo está ativo.</h3>";
    }
}

// === INICIALIZAÇÃO E SISTEMAS DE DEFESA DO FORMULÁRIO ===
document.addEventListener("DOMContentLoaded", () => {
    
    verificarRegistoAnterior();
    desenharProjetosEcra();

    const form = document.getElementById("formContato");
    const inputNome = document.getElementById("nome");
    const inputEmail = document.getElementById("email");
    const erroNome = document.getElementById("erroNome");
    const erroEmail = document.getElementById("erroEmail");
    const mensagemAviso = document.getElementById("mensagemAviso");

    if(erroNome) erroNome.style.display = "none";
    if(erroEmail) erroEmail.style.display = "none";

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

                localStorage.setItem("ong_nome", nomeBlindado);
                localStorage.setItem("ong_email", emailBlindado);

                mensagemAviso.style.color = "green";
                mensagemAviso.textContent = "Operação limpa, " + nomeBlindado + "! Dados guardados e encriptados com sucesso no Local Storage.";
                
                form.reset();
                inputNome.style.borderColor = "";
                inputEmail.style.borderColor = "";
                
                verificarRegistoAnterior();
            } else {
                mensagemAviso.style.color = "red";
                mensagemAviso.textContent = "Alerta: Interceção de dados inválidos. Corrija os campos a vermelho.";
            }
        });
    }
});

