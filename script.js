const input = document.querySelector("#taskInput");
const button = document.querySelector("#addButton");
const lista = document.querySelector("#taskLista");
const themeToggle = document.querySelector("#themeToggle");

// Salvar as informaações no LocalStorage
function salvarTarefas() {
  const tarefa = [];
  const itens = lista.querySelectorAll("li span");

  itens.forEach(function(item){
    tarefa.push(item.textContent);
  });

  localStorage.setItem("tarefas", JSON.stringify(tarefa)); //Convertendo array em string
}

// Cria as Tarefas
function criarTarefa(texto) {
  const novatarefa = document.createElement("li"); // Criando elemento liSSS

  // Criando elemento span
  const span = document.createElement("span");
  span.textContent = texto;

  //Cria ícone check
  const checkIcon = document.createElement("span");
  checkIcon.textContent = "✔";
  checkIcon.classList.add("check-icon");
  novatarefa.appendChild(checkIcon);

  // Evento de Concluir a Tarefa
  span.addEventListener("click", function() {
    span.classList.toggle("concluida");
    novatarefa.classList.toggle("concluida-item");
    salvarTarefas();
  });

  //Crio botão delete
  const botaoDelete = document.createElement("button");
  botaoDelete.textContent = "Delete";

   //Criar evendo do DELETE
  botaoDelete.addEventListener("click", function() {
    novatarefa.remove();
    salvarTarefas();
  });

  novatarefa.appendChild(span);
  novatarefa.appendChild(botaoDelete);
  lista.appendChild(novatarefa);

  salvarTarefas();
}

// Adiciona as tarefas
button.addEventListener("click", function() {
    
  const valor = input.value.trim(); //pega e limpa espaços

  if(valor === "") {
    alert("Preencha o campo corretamente!");
    return;
  }

  criarTarefa(valor);
  //Limpar input
  input.value = "";
});

// Carregar tarefa quando ela abrir a página
window.addEventListener("load", function() {

    const tarefasSalvas = JSON.parse(this.localStorage.getItem("tarefas")) || [];

    tarefasSalvas.forEach(function(tarefa) {
      criarTarefa(tarefa);
  });
});


// Alternar tema
themeToggle.addEventListener("click", function() {

  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("tema", "light");
    themeToggle.textContent = "☀";
  } else {
    localStorage.setItem("tema", "dark");
    themeToggle.textContent = "🌙";
  }

});

// Carregar tema salvo
window.addEventListener("load", function() {

  const temaSalvo = localStorage.getItem("tema");

  if (temaSalvo === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀";
  }

});

//Adicionar tarefa com ENTER
input.addEventListener("keypress", function(e) {
  if(e.key === "Enter") {
    button.click();
  }
});