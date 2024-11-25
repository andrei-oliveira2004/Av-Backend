const userApiUrl = 'http://localhost:3000/api/usuarios';
const taskApiUrl = 'http://localhost:3000/api/tarefas';

// Seletores de Usuários
const userForm = document.getElementById('user-form');
const userList = document.getElementById('user-list');
const userIdInput = document.getElementById('user-id');
const userNameInput = document.getElementById('user-name');
const userSenhaInput = document.getElementById('user-senha');


// Seletores de Tarefas
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const taskIdInput = document.getElementById('task-id');
const taskTitleInput = document.getElementById('task-title');
const taskDescriptionInput = document.getElementById('task-description');
const taskDateInput = document.getElementById('task-date');


const listarUsuarios = async () => {
    try {
        const response = await fetch(userApiUrl);
        const usuarios = await response.json();
        userList.innerHTML = '';
        usuarios.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `${user.nome} ${user.email} (${user.senha})
                <button class="edit-btn" onclick="editarUsuario('${user._id}')">Editar</button>
                <button onclick="deletarUsuario('${user._id}')">Deletar</button>`;
            userList.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
    }
};

userForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = userNameInput.value;
    const email = userEmailInput.value;

    const userData = { nome, email };
    const method = userIdInput.value ? 'PUT' : 'POST';
    const url = userIdInput.value ? `${userApiUrl}/${userIdInput.value}` : userApiUrl;

    try {
        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        userNameInput.value = '';
        userEmailInput.value = '';
        userIdInput.value = '';
        listarUsuarios();
    } catch (error) {
        console.error('Erro ao salvar usuário:', error);
    }
});


const editarUsuario = async (id) => {
    try {
        const response = await fetch(`${userApiUrl}/${id}`);
        const user = await response.json();
        userNameInput.value = user.nome;
        userEmailInput.value = user.email;
        userIdInput.value = user._id;
    } catch (error) {
        console.error('Erro ao editar usuário:', error);
    }
};


const deletarUsuario = async (id) => {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
        try {
            await fetch(`${userApiUrl}/${id}`, { method: 'DELETE' });
            listarUsuarios();
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
        }
    }
};


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


taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const titulo = taskTitleInput.value;
    const descricao = taskDescriptionInput.value;
    const dataConclusao = taskDateInput.value;

    const taskData = { titulo, descricao, dataConclusao };
    const method = taskIdInput.value ? 'PUT' : 'POST';
    const url = taskIdInput.value ? `${taskApiUrl}/${taskIdInput.value}` : taskApiUrl;

    try {
        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
        });

        taskTitleInput.value = '';
        taskDescriptionInput.value = '';
        taskDateInput.value = '';
        taskIdInput.value = '';
        listarTarefas();
    } catch (error) {
        console.error('Erro ao salvar tarefa', error);
    }
});


const editarTarefa = async (id) => {
    try {
        const response = await fetch(`${taskApiUrl}/${id}`);
        const task = await response.json();
        taskTitleInput.value = task.titulo;
        taskDescriptionInput.value = task.descricao;
        taskDateInput.value = task.dataConclusao;
        taskIdInput.value = task._id;
    } catch (error) {
        console.error('Erro ao editar tarefa', error);
    }
};


const deletarTarefa = async (id) => {
    if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
        try {
            await fetch(`${taskApiUrl}/${id}`, { method: 'DELETE' });
            listarTarefas();
        } catch (error) {
            console.error('Erro ao deletar tarefa', error);
        }
    }
};


listarUsuarios();
listarTarefas();
