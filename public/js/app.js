// Estado da aplicação
const state = {
    user: null,
    tasks: [],
    currentFilter: 'all'
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    checkSession();
    bindEvents();
});

function checkSession() {
    const savedUser = localStorage.getItem('tf_user');
    if (savedUser) {
        state.user = JSON.parse(savedUser);
        ui.updateGreeting(state.user.name);
        ui.showView('view-dashboard');
        loadTasks();
    } else {
        ui.showView('view-login');
    }
}

async function loadTasks() {
    try {
        state.tasks = await api.getTasks(state.user.id);
        ui.renderTasks(state.tasks, state.currentFilter);
        ui.updateMetrics(state.tasks);
    } catch (err) {
        console.error('Erro ao carregar tarefas', err);
    }
}

function bindEvents() {
    // Navegação Auth
    document.getElementById('go-to-register').addEventListener('click', (e) => {
        e.preventDefault();
        ui.showView('view-register');
    });

    document.getElementById('go-to-login').addEventListener('click', (e) => {
        e.preventDefault();
        ui.showView('view-login');
    });

    // Forms de Auth
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('btn-login');
        btn.textContent = 'Aguarde...';
        btn.disabled = true;

        try {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            const user = await api.login(email, password);
            state.user = user;
            localStorage.setItem('tf_user', JSON.stringify(user));
            
            ui.updateGreeting(user.name);
            ui.showView('view-dashboard');
            loadTasks();
        } catch (err) {
            ui.showError('login-error', err.message);
        } finally {
            btn.textContent = 'Entrar';
            btn.disabled = false;
        }
    });

    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('btn-register');
        btn.textContent = 'Aguarde...';
        btn.disabled = true;

        try {
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            
            const user = await api.register(name, email, password);
            state.user = user;
            localStorage.setItem('tf_user', JSON.stringify(user));
            
            ui.updateGreeting(user.name);
            ui.showView('view-dashboard');
            loadTasks();
        } catch (err) {
            ui.showError('register-error', err.message);
        } finally {
            btn.textContent = 'Registrar';
            btn.disabled = false;
        }
    });

    // Logout
    document.getElementById('btn-logout').addEventListener('click', () => {
        localStorage.removeItem('tf_user');
        state.user = null;
        state.tasks = [];
        ui.showView('view-login');
        
        // limpar form
        document.getElementById('login-form').reset();
    });

    // Nova Tarefa
    document.getElementById('new-task-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('btn-add-task');
        btn.disabled = true;
        
        try {
            const title = document.getElementById('task-title').value;
            const desc = document.getElementById('task-desc').value;
            const deadline = document.getElementById('task-deadline').value;
            const priority = document.getElementById('task-priority').value;

            await api.addTask({
                user_id: state.user.id,
                title,
                description: desc,
                deadline: deadline || null,
                priority,
                type: 'geral'
            });

            document.getElementById('new-task-form').reset();
            loadTasks(); // recarrega a lista
        } catch (err) {
            console.error(err);
            alert('Erro ao adicionar tarefa.');
        } finally {
            btn.disabled = false;
        }
    });

    // Ações das tarefas (Delegação de Eventos)
    document.getElementById('tasks-container').addEventListener('click', async (e) => {
        const target = e.target.closest('button');
        if (!target) return;

        const taskId = target.getAttribute('data-id');
        if (!taskId) return;

        try {
            if (target.classList.contains('btn-done')) {
                await api.updateTaskStatus(taskId, 'concluída');
                loadTasks();
            } 
            else if (target.classList.contains('btn-revert')) {
                await api.updateTaskStatus(taskId, 'pendente');
                loadTasks();
            }
            else if (target.classList.contains('btn-delete')) {
                if(confirm('Tem certeza que deseja excluir esta tarefa?')) {
                    await api.deleteTask(taskId);
                    loadTasks();
                }
            }
        } catch (err) {
            console.error(err);
            alert('Erro ao realizar ação na tarefa.');
        }
    });

    // Filtros
    document.querySelectorAll('.btn-filter').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
            const target = e.target;
            target.classList.add('active');
            
            state.currentFilter = target.getAttribute('data-filter');
            ui.renderTasks(state.tasks, state.currentFilter);
        });
    });
}
