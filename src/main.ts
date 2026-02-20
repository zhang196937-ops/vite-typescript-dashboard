import './style.css'
import { TaskList } from './components/TaskList'
import { TaskForm } from './components/TaskForm'

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("App container not found");

app.innerHTML=`
  <header class="app-header">
    <h1>Task Dashboard</h1>
    <nav class="filters">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="todo">To Do</button>
      <button class="filter-btn" data-filter="in_progress">In Progress</button>
      <button class="filter-btn" data-filter="done">Done</button>
    </nav>
  </header>
  <main class="app-main">
    <aside class="sidebar">
      <div id="form-container"></div>
    </aside>
    
    <section class="content">
      <div id="task-container"></div>
    </section>
  </main>   
  <footer class="app-footer">
    <p>Task Dashboard • Built with Vite + TypeScript • <span id="task-count">0 tasks</span></p>
  </footer>
`;
const taskList = new TaskList('#task-container');
const taskForm = new TaskForm('#form-container', (data) => {
  taskList.addTask(data);
});
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter') as 'all' | 'todo' | 'in_progress' | 'done';
    taskList.setFilter(filter);
  });
});
// Update footer task count
function updateTaskCount() {
  const countElement = document.getElementById('task-count');
  if (countElement) {
    const count = document.querySelectorAll('.task-item').length;
    countElement.textContent = `${count} task${count !== 1 ? 's' : ''}`;
  }
}

// Call after any task change
const originalAddTask = taskList.addTask.bind(taskList);
taskList.addTask = async (data) => {
  await originalAddTask(data);
  updateTaskCount();
};

/*
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
*/
/*
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
*/
