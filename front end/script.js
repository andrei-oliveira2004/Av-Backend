const apiUrl = "http://localhost:3000/api/tarefas";
let tarefas = [];

function listarTarefas() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      tarefas = data;
      renderizarTarefas();
    })
    .catch(error => console.error("Erro ao listar tarefas:", error));
}

function adicionarTarefa() {
  const titulo = document.getElementById('task-title').value;
  const descricao = document.getElementById('task-description').value;
  const status = document.getElementById('task-status').value;

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, descricao, status })
  })
  .then(() => {
    listarTarefas();
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
  })
  .catch(error => console.error("Erro ao adicionar tarefa:", error));
}

function deletarTarefa(id) {
  fetch(`${apiUrl}/${id}`, { method: "DELETE" })
    .then(() => listarTarefas())
    .catch(error => console.error("Erro ao deletar tarefa:", error));
}

function editarTarefa(id) {
  const tarefa = tarefas.find(t => t._id === id);
  if (!tarefa) return;

  // Preenche os campos do formulário com os dados da tarefa
  document.getElementById('task-title').value = tarefa.titulo;
  document.getElementById('task-description').value = tarefa.descricao;
  document.getElementById('task-status').value = tarefa.status;

  // Adiciona o ID da tarefa ao atributo data-id
  document.getElementById('task-title').setAttribute("data-id", id);

  // Exibe o botão "Salvar Edição" e oculta o botão "Adicionar Tarefa"
  document.querySelector('button[onclick="adicionarTarefa()"]').style.display = 'none';
  document.getElementById('confirm-button').style.display = 'inline-block';
}

function salvarEdicao() {
  const id = document.getElementById('task-title').getAttribute("data-id");
  if (!id) return;

  // Atualiza a tarefa no backend
  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      titulo: document.getElementById('task-title').value,
      descricao: document.getElementById('task-description').value,
      status: document.getElementById('task-status').value
    })
  })
  .then(() => {
    listarTarefas();

    // Limpa os campos do formulário
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-status').value = 'Pendente';

    // Remove o atributo data-id
    document.getElementById('task-title').removeAttribute("data-id");

    // Exibe o botão "Adicionar Tarefa" e oculta o botão "Salvar Edição"
    document.querySelector('button[onclick="adicionarTarefa()"]').style.display = 'inline-block';
    document.getElementById('confirm-button').style.display = 'none';
  })
  .catch(error => console.error("Erro ao editar tarefa:", error));
}

function renderizarTarefas() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tarefas.forEach(tarefa => {
    const li = document.createElement('li');
    li.style.background = '#fff';
    li.style.padding = '20px';
    li.style.borderRadius = '12px';
    li.style.boxShadow = '0px 2px 10px rgba(0, 0, 0, 0.05)';
    li.style.display = 'flex';
    li.style.flexDirection = 'column';
    li.style.gap = '10px';
    li.style.position = 'relative';
    li.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

    li.addEventListener('mouseover', () => {
      li.style.transform = 'scale(1.02)';
      li.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.1)';
    });

    li.addEventListener('mouseout', () => {
      li.style.transform = 'scale(1)';
      li.style.boxShadow = '0px 2px 10px rgba(0, 0, 0, 0.05)';
    });

    const title = document.createElement('strong');
    title.textContent = tarefa.titulo;
    title.style.fontSize = '18px';
    title.style.fontWeight = '600';

    const status = document.createElement('span');
    status.textContent = tarefa.status;
    status.className = tarefa.status === 'Pendente' ? 'status-pendente' :
                       tarefa.status === 'Em andamento' ? 'status-em-andamento' :
                       tarefa.status === 'Concluída' ? 'status-concluido' : '';
    status.style.padding = '5px 10px';
    status.style.fontSize = '14px';
    status.style.borderRadius = '5px';
    status.style.fontWeight = '600';
    status.style.marginTop = '10px';
    status.style.display = 'inline-block';

    const description = document.createElement('p');
    description.textContent = tarefa.descricao;
    description.style.fontSize = '14px';
    description.style.color = '#555';

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.style.background = '#4caf50';
    editButton.style.color = '#fff';
    editButton.style.border = 'none';
    editButton.style.borderRadius = '6px';
    editButton.style.padding = '8px 12px';
    editButton.style.cursor = 'pointer';
    editButton.style.position = 'absolute';
    editButton.style.top = '10px';
    editButton.style.right = '100px';
    editButton.addEventListener('mouseover', () => {
      editButton.style.background = '#388e3c';
    });
    editButton.addEventListener('mouseout', () => {
      editButton.style.background = '#4caf50';
    });
    editButton.onclick = () => editarTarefa(tarefa._id);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Deletar';
    deleteButton.style.background = '#f44336';
    deleteButton.style.color = '#fff';
    deleteButton.style.border = 'none';
    deleteButton.style.borderRadius = '6px';
    deleteButton.style.padding = '8px 12px';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.position = 'absolute';
    deleteButton.style.top = '10px';
    deleteButton.style.right = '10px';
    deleteButton.addEventListener('mouseover', () => {
      deleteButton.style.background = '#d32f2f';
    });
    deleteButton.addEventListener('mouseout', () => {
      deleteButton.style.background = '#f44336';
    });
    deleteButton.onclick = () => deletarTarefa(tarefa._id);

    li.appendChild(title);
    li.appendChild(status);
    li.appendChild(description);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  });
}

listarTarefas();
