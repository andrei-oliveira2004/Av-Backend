const userApiUrl = 'http://localhost:3000/api/usuarios';
const taskApiUrl = 'http://localhost:3000/api/tarefas';

// Seletores de Usuários
const userForm = document.getElementById('user-form');
const userList = document.getElementById('user-list');
const userIdInput = document.getElementById('user-id');
const userNameInput = document.getElementById('user-name');
const userEmailInput = document.getElementById('user-email');

// Seletores de Tarefas
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const taskIdInput = document.getElementById('task-id');
const taskTitleInput = document.getElementById('task-title');
const taskDescriptionInput = document.getElementById('task-description');
const taskDateInput = document.getElementById('task-date');

// Função para listar usuários
const listarUsuarios = async () => {
    try {
        const response = await fetch(userApiUrl);
        const usuarios = await response.json();
        userList.innerHTML = '';
        usuarios.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `${user.nome} - ${user.email}
                <button class="edit-btn" onclick="editarUsuario('${user._id}')">Editar</button>
                <button onclick="deletarUsuario('${user._id}')">Deletar</button>`;
            userList.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
    }
};

// Função para salvar usuário
userForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = userNameInput.value;
    const email = userEmailInput.value;

    if (!nome || !email) {
        alert('Nome e email são obrigatórios!');
        return;
    }

    const userData = { nome, email };

    try {
        const method = userIdInput.value ? 'PUT' : 'POST';
        const url = userIdInput.value ? `${userApiUrl}/${userIdInput.value}` : userApiUrl;

        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        // Limpar os campos após salvar
        userNameInput.value = '';
        userEmailInput.value = '';
        userIdInput.value = ''; // Limpar o campo de ID após salvar

        // Recarregar a lista de usuários
        await listarUsuarios();
        alert('Usuário salvo com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar usuário:', error);
        alert('Erro ao salvar usuário!');
    }
});

// Função para editar usuário
const editarUsuario = async (id) => {
    try {
        const response = await fetch(`${userApiUrl}/${id}`);
        const user = await response.json();

        // Preencher os campos com os dados do usuário
        userNameInput.value = user.nome;
        userEmailInput.value = user.email;
        userIdInput.value = user._id; // Preencher o campo de ID com o ID do usuário
    } catch (error) {
        console.error('Erro ao editar usuário:', error);
    }
};

// Função para deletar usuário
const deletarUsuario = async (id) => {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
        try {
            await fetch(`${userApiUrl}/${id}`, { method: 'DELETE' });
            await listarUsuarios(); // Atualizar a lista após deletar
            alert('Usuário deletado com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            alert('Erro ao deletar usuário!');
        }
    }
};

// Função para listar tarefas
const listarTarefas = async () => {
    try {
        const response = await fetch(taskApiUrl);
        const tarefas = await response.json();
        taskList.innerHTML = '';
        tarefas.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `${task.titulo} - ${task.dataConclusao}
                <button class="edit-btn" onclick="editarTarefa('${task._id}')">Editar</button>
                <button onclick="deletarTarefa('${task._id}')">Deletar</button>`;
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao listar tarefas:', error);
    }
};

// Função para salvar tarefa
taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const titulo = taskTitleInput.value;
    const descricao = taskDescriptionInput.value;
    const dataConclusao = taskDateInput.value;

    if (!titulo || !descricao || !dataConclusao) {
        alert('Título, descrição e data de conclusão são obrigatórios!');
        return;
    }

    const taskData = { titulo, descricao, dataConclusao };

    try {
        const method = taskIdInput.value ? 'PUT' : 'POST';
        const url = taskIdInput.value ? `${taskApiUrl}/${taskIdInput.value}` : taskApiUrl;

        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
        });

        // Limpar os campos após salvar
        taskTitleInput.value = '';
        taskDescriptionInput.value = '';
        taskDateInput.value = '';
        taskIdInput.value = ''; // Limpar o campo de ID após salvar

        // Recarregar a lista de tarefas
        await listarTarefas();
        alert('Tarefa salva com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar tarefa:', error);
        alert('Erro ao salvar tarefa!');
    }
});

// Função para editar tarefa
const editarTarefa = async (id) => {
    try {
        const response = await fetch(`${taskApiUrl}/${id}`);
        const task = await response.json();

        // Preencher os campos com os dados da tarefa
        taskTitleInput.value = task.titulo;
        taskDescriptionInput.value = task.descricao;
        taskDateInput.value = task.dataConclusao;
        taskIdInput.value = task._id; // Preencher o campo de ID com o ID da tarefa
    } catch (error) {
        console.error('Erro ao editar tarefa:', error);
    }
};

// Função para deletar tarefa
const deletarTarefa = async (id) => {
    if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
        try {
            await fetch(`${taskApiUrl}/${id}`, { method: 'DELETE' });
            await listarTarefas(); // Atualizar a lista após deletar
            alert('Tarefa deletada com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
            alert('Erro ao deletar tarefa!');
        }
    }
};

// Chama as funções de listagem ao carregar a página
listarUsuarios();
listarTarefas();
