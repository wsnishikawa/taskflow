const ui = {
    // Alterna a tela ativa (SPA View Transitions)
    showView(viewId) {
        document.querySelectorAll('.view').forEach(v => {
            v.classList.remove('active');
            setTimeout(() => {
                if (!v.classList.contains('active')) v.classList.add('hidden');
            }, 400); // aguarda a transição
        });
        
        const target = document.getElementById(viewId);
        target.classList.remove('hidden');
        // trigger reflow para animação
        void target.offsetWidth; 
        target.classList.add('active');
    },

    showError(elementId, msg) {
        const el = document.getElementById(elementId);
        el.textContent = msg;
        el.classList.remove('hidden');
        setTimeout(() => el.classList.add('hidden'), 4000);
    },

    updateGreeting(name) {
        document.getElementById('user-greeting').textContent = `Olá, ${name.split(' ')[0]}`;
    },

    renderTasks(tasks, filter = 'all') {
        const container = document.getElementById('tasks-container');
        
        let filtered = tasks;
        if (filter !== 'all') {
            filtered = tasks.filter(t => t.status === filter);
        }

        if (filtered.length === 0) {
            container.innerHTML = `<div class="empty-state"><p>Nenhuma tarefa ${filter === 'all' ? '' : filter} encontrada.</p></div>`;
            return;
        }

        container.innerHTML = filtered.map(t => {
            const isCompleted = t.status === 'concluída';
            
            // Format date if exists
            let dateStr = '';
            let isLate = false;
            if (t.deadline) {
                const parts = t.deadline.split('-');
                if (parts.length === 3) {
                    dateStr = `${parts[2]}/${parts[1]}/${parts[0]}`;
                }
                const today = new Date();
                today.setHours(0,0,0,0);
                const dlDate = new Date(t.deadline);
                // corrige fuso se precisar
                dlDate.setHours(today.getHours() + 12);
                if (dlDate < today && !isCompleted) isLate = true;
            }

            return `
                <div class="task-card ${isCompleted ? 'completed' : ''}" data-id="${t.id}">
                    <div class="task-info">
                        <span class="task-title">${t.title}</span>
                        ${t.description ? `<span class="task-desc">${t.description}</span>` : ''}
                        <div class="task-meta">
                            <span class="badge badge-${t.priority}">${t.priority.toUpperCase()}</span>
                            ${dateStr ? `<span style="color: ${isLate ? 'var(--danger)' : 'var(--text-secondary)'}">📅 ${dateStr} ${isLate ? '(Atrasada)' : ''}</span>` : ''}
                        </div>
                    </div>
                    <div class="task-actions">
                        ${isCompleted 
                            ? `<button class="btn btn-ghost btn-sm btn-revert" data-id="${t.id}" title="Marcar como pendente">↩️</button>`
                            : `<button class="btn btn-ghost btn-sm btn-done" data-id="${t.id}" title="Concluir">✅</button>`
                        }
                        <button class="btn btn-ghost btn-sm btn-delete text-rose" data-id="${t.id}" title="Excluir">🗑️</button>
                    </div>
                </div>
            `;
        }).join('');
    },

    updateMetrics(tasks) {
        document.getElementById('metric-total').textContent = tasks.length;
        
        const todayStr = new Date().toISOString().split('T')[0];
        
        let doneToday = 0;
        let late = 0;
        
        const today = new Date();
        today.setHours(0,0,0,0);

        tasks.forEach(t => {
            // Simplificando lógica de "hoje" considerando a base de dados
            if (t.status === 'concluída') doneToday++;
            
            if (t.deadline && t.status !== 'concluída') {
                const dlDate = new Date(t.deadline);
                dlDate.setHours(12); // ajusta fuso
                if (dlDate < today) late++;
            }
        });

        document.getElementById('metric-done').textContent = doneToday;
        document.getElementById('metric-late').textContent = late;
    }
};
