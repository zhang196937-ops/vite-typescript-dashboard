import type { Task, TaskFilter } from '../types/index.ts';
import { taskService } from '../services/taskService.ts';
import { TaskItem } from './TaskItem.ts';

export class TaskList {
  container: HTMLElement;
  tasks: Task[] = [];
  taskItems: Map<string, TaskItem>;
  currentFilter: TaskFilter = 'all';

  constructor(containerSelector: string) {
    const element = document.querySelector(containerSelector);
    if (!element) throw new Error(`Container ${containerSelector} not found`);
    this.container = element as HTMLElement;
    this.taskItems = new Map();
    this.init();
  }

  private async init(): Promise<void> {
    await this.loadTasks();
    this.render();
  }

  private async loadTasks(): Promise<void> {
    const response = await taskService.getAllTasks();
    if (response.success) {
      this.tasks = response.data;
    }
  }

  private render(): void {
    this.container.innerHTML = '';
    const filtered = this.getFilteredTasks();

    if (filtered.length === 0) {
      this.container.innerHTML = '<p class="empty">No tasks found.</p>';
      return;
    }

    const grid = document.createElement('div');
    grid.className = 'task-grid';

    filtered.forEach(task => {
      const taskItem = new TaskItem(grid, {
        task,
        onToggle: (id) => this.handleToggle(id),
        onDelete: (id) => this.handleDelete(id)
      });
      this.taskItems.set(task.id, taskItem);
    });

    this.container.appendChild(grid);
  }

  private getFilteredTasks(): Task[] {
    if (this.currentFilter === 'all') return this.tasks;
    return this.tasks.filter(t => t.status === this.currentFilter);
  }

  private async handleToggle(id: string): Promise<void> {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;
    
    const newStatus = task.status === 'done' ? 'todo' : 'done';
    await taskService.updateTask(id, { status: newStatus });
    await this.loadTasks();
    this.render();
  }

  private async handleDelete(id: string): Promise<void> {
    if (!confirm('Delete this task?')) return;
    await taskService.deleteTask(id);
    this.taskItems.get(id)?.destroy();
    this.taskItems.delete(id);
    await this.loadTasks();
    this.render();
  }

  setFilter(filter: TaskFilter): void {
    this.currentFilter = filter;
    this.render();
  }

  async addTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    await taskService.createTask(taskData);
    await this.loadTasks();
    this.render();
  }
}