const api = {
    async register(name, email, password) {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Erro no registro');
        }
        return res.json();
    },

    async login(email, password) {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Erro no login');
        }
        return res.json();
    },

    async getTasks(userId) {
        const res = await fetch(`/api/tasks?userId=${userId}`);
        if (!res.ok) throw new Error('Erro ao buscar tarefas');
        return res.json();
    },

    async addTask(task) {
        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        });
        if (!res.ok) throw new Error('Erro ao adicionar tarefa');
        return res.json();
    },

    async updateTaskStatus(taskId, status) {
        const res = await fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        if (!res.ok) throw new Error('Erro ao atualizar tarefa');
        return res.json();
    },

    async deleteTask(taskId) {
        const res = await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Erro ao excluir tarefa');
        return res.json();
    }
};
