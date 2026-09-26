# Task Manager App - Plano de Projeto

## 📌 Visão Geral
Criar um sistema de gerenciamento de tarefas (Task Manager) com foco em um dashboard visualmente atraente. O usuário poderá fazer login, criar tarefas (título, descrição, prazo, tipo, prioridade) e acompanhar suas métricas (total, concluídas, atrasadas). O foco é ser funcional e bonito, sem complexidade excessiva com segurança ou infraestrutura. Adotaremos a **Opção A (SPA Vanilla)** para melhor fluidez visual.

## 🏗️ Tipo de Projeto
**WEB** (Single Page Application)

## 🎯 Critérios de Sucesso
1. Banco de dados SQLite criando tabelas de usuários e tarefas automaticamente.
2. API Express funcional para CRUD de tarefas e autenticação simples.
3. Interface bonita (Dark Mode moderno ou Glassmorphism) usando apenas HTML/CSS.
4. Dashboard atualizando métricas dinamicamente via chamadas `fetch()` sem recarregar a página.

## 🛠️ Tech Stack
- **Backend**: Node.js com Express (rápido para APIs simples).
- **Banco de Dados**: SQLite (`sqlite3` ou `better-sqlite3`) (não requer servidor separado).
- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (Vanilla).

## 📁 Estrutura de Arquivos
```text
/
├── server.js              # Ponto de entrada do backend
├── database.db            # Arquivo do SQLite (gerado na execução)
├── package.json           # Dependências do Node
├── src/
│   ├── routes/
│   │   ├── auth.js        # Rotas de login/cadastro
│   │   └── tasks.js       # Rotas de CRUD de tarefas
│   └── database/
│       └── db.js          # Configuração e inicialização do SQLite
├── public/                # Arquivos estáticos servidos pelo Express
│   ├── index.html         # Shell principal da SPA
│   ├── css/
│   │   ├── style.css      # Sistema de design, cores e tipografia
│   │   └── components.css # Estilos de cards, formulários e dashboard
│   └── js/
│       ├── api.js         # Funções fetch para comunicar com o backend
│       ├── ui.js          # Manipulação do DOM e transições
│       └── app.js         # Lógica de inicialização
```

## 📋 Divisão de Tarefas

### Tarefa 1: Setup do Backend e Banco de Dados
- **Agent**: `@backend-specialist`
- **Skills**: `@nodejs-best-practices`
- **Prioridade**: P0
- **Input**: Estrutura vazia.
- **Output**: `package.json`, `server.js`, `db.js` com tabelas `users` e `tasks` criadas.
- **Verify**: Executar `node server.js` não deve gerar erros e o arquivo `database.db` deve ser criado.

### Tarefa 2: Criação da API REST
- **Agent**: `@backend-specialist`
- **Skills**: `@api-patterns`
- **Prioridade**: P1
- **Dependências**: Tarefa 1
- **Input**: Banco de dados configurado.
- **Output**: Rotas em `auth.js` (login/register) e `tasks.js` (GET, POST, PUT, DELETE).
- **Verify**: Conseguir criar um usuário, fazer login e criar uma tarefa.

### Tarefa 3: Fundação da UI e Design System
- **Agent**: `@frontend-specialist`
- **Skills**: `@frontend-design`
- **Prioridade**: P2
- **Dependências**: Nenhuma (pode ser feita em paralelo)
- **Input**: Especificação de UI moderna (Dashboard).
- **Output**: `index.html` construído, estilos baseados em variáveis CSS para layout fluído e bonito.
- **Verify**: Abrir o `index.html` e ver o visual da tela de login e o esqueleto do dashboard.

### Tarefa 4: Integração do Frontend com a API (Lógica SPA)
- **Agent**: `@frontend-specialist`
- **Skills**: `@modern-web-guidance`
- **Prioridade**: P2
- **Dependências**: Tarefa 2 e Tarefa 3
- **Input**: API pronta e UI pronta.
- **Output**: Arquivos em `public/js/` manipulando DOM e consumindo endpoints.
- **Verify**: Fluxo completo no navegador: criar conta -> login -> criar tarefa -> ver dashboard atualizar.

## ✅ Fase X: Verificação Final
- [x] O app roda sem crash.
- [x] O front-end carrega sem erros de CORS ou 404 no console.
- [x] Design atende o padrão premium esperado.
- [x] Regra de proibição da cor roxa/violeta foi respeitada pelo agente de frontend.
- [x] Todos os requisitos (múltiplos campos da tarefa e contadores) estão implementados e funcionando.

## ✅ PHASE X COMPLETE
- Lint: ✅ Pass (N/A Vanilla)
- Security: ✅ No critical issues
- Build: ✅ Success
- Date: 2026-09-26
