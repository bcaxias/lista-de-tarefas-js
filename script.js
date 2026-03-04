const input = document.querySelector("#taskInput");
const button = document.querySelector("#addButton");
const lista = document.querySelector("#taskLista");
const themeToggle = document.querySelector("#themeToggle");

// Salvar tarefas no LocalStorage (agora salva texto + status)
function salvarTarefas() {
  const tarefas = [];

  const itens = lista.querySelectorAll("li");

  itens.forEach(function(item){
    const texto = item.querySelector(".task-text").textContent;
    const concluida = item.classList.contains("concluida-item");

    tarefas.push({
      texto: texto,
      concluida: concluida
    });
  });

  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Criar tarefa
function criarTarefa(texto, concluida = false) {

  const novatarefa = document.createElement("li");

  const container = document.createElement("div");
  container.classList.add("task-container");

  const checkIcon = document.createElement("span");
  checkIcon.textContent = "✔";
  checkIcon.classList.add("check-icon");

  const span = document.createElement("span");
  span.classList.add("task-text");
  span.textContent = texto;

  if(concluida) {
    novatarefa.classList.add("concluida-item");
    span.classList.add("concluida");
  }

  container.addEventListener("click", function() {
    novatarefa.classList.toggle("concluida-item");
    span.classList.toggle("concluida");
    salvarTarefas();
  });

  const botaoDelete = document.createElement("button");
  botaoDelete.textContent = "Delete";

  botaoDelete.addEventListener("click", function() {
    novatarefa.remove();
    salvarTarefas();
  });

  container.appendChild(checkIcon);
  container.appendChild(span);

  novatarefa.appendChild(container);
  novatarefa.appendChild(botaoDelete);

  lista.appendChild(novatarefa);
}

// Adicionar tarefa
button.addEventListener("click", function() {

  const valor = input.value.trim();

  if(valor === "") {
    alert("Preencha o campo corretamente!");
    return;
  }

  criarTarefa(valor);
  salvarTarefas();
  input.value = "";
});

// Enter para adicionar
input.addEventListener("keypress", function(e) {
  if(e.key === "Enter") {
    button.click();
  }
});

// Carregar página (tarefas + tema)
window.addEventListener("load", function() {

  // Carregar tarefas
  const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];

  tarefasSalvas.forEach(function(tarefa) {
    criarTarefa(tarefa.texto, tarefa.concluida);
  });

  // Carregar tema
  const temaSalvo = localStorage.getItem("tema");

  if (temaSalvo === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀";
  } else {
    themeToggle.textContent = "🌙";
  }

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
