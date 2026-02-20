import type { CreateTaskDTO, Priority, TaskStatus } from '../types/index.ts';
import { validateTaskInput } from '../utils/helpers.ts';

export class TaskForm {
  form: HTMLFormElement;
  onSubmit: (data: CreateTaskDTO) => void;
  errorContainer: HTMLDivElement;

  constructor(containerSelector: string, onSubmit: (data: CreateTaskDTO) => void) {
    const container = document.querySelector(containerSelector);
    if (!container) throw new Error('Container not found');
    
    this.onSubmit = onSubmit;
    this.form = this.createForm();
    this.errorContainer = document.createElement('div');
    this.errorContainer.className = 'form-errors';
    
    container.appendChild(this.form);
    container.appendChild(this.errorContainer);
    
    this.bindEvents();
  }

  private createForm(): HTMLFormElement {
    const form = document.createElement('form');
    form.className = 'task-form';
    form.innerHTML = `
      <h3>Add New Task</h3>
      
      <div class="form-group">
        <label>Title *</label>
        <input type="text" name="title" required placeholder="Enter task title">
      </div>
      
      <div class="form-group">
        <label>Description</label>
        <textarea name="description" rows="3" placeholder="Enter description"></textarea>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>Priority</label>
          <select name="priority">
            <option value="low">Low</option>
            <option value="medium" selected>Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      
      <button type="submit" class="btn-submit">Create Task</button>
    `;
    
    return form;
  }

  private bindEvents(): void {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  private handleSubmit(): void {
    const formData = new FormData(this.form);
    
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      priority: formData.get('priority') as Priority,
      status: 'todo' as TaskStatus,
      tags: []
    };

    const validation = validateTaskInput(data);
    if (!validation.valid) {
      this.showErrors(validation.errors);
      return;
    }

    this.onSubmit(data);
    this.form.reset();
    this.clearErrors();
  }

  private showErrors(errors: string[]): void {
    this.errorContainer.innerHTML = errors
      .map(e => `<div class="error">${e}</div>`)
      .join('');
  }

  private clearErrors(): void {
    this.errorContainer.innerHTML = '';
  }
}