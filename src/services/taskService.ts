import type {Task,CreateTaskDTO} from '../types/index.ts';
import { StorageService } from '../utils/helpers';

export class TaskService{
    tasks: Task[]=[];
    storage: StorageService<Task[]>;
    idCounter: number;
    constructor(){
        this.tasks = [];
        this.storage = new StorageService<Task[]>('dashboard_tasks');
        this.idCounter = 0;
        this.loadFromStorage();
    }
    private loadFromStorage():void{
        const stored = this.storage.load();
        if (stored){
            this.tasks = stored;
        }
    }
    private saveToStorage():void{
        this.storage.save(this.tasks);
    }
    private generateId():string{
        return `task_${++this.idCounter}_${Date.now()}`;
    }
    private async simulateNetwork<T>(data:T):Promise<T>{
        return new Promise((resolve)=> {
            setTimeout(()=>resolve(data),300);
        });
    }
    async getAllTasks(): Promise<{data: Task[];success: boolean}>{
        return this.simulateNetwork({
            data: [...this.tasks],
            success:true
        });
    }
    async createTask(dto: CreateTaskDTO): Promise<{ data: Task; success: boolean }> {
        const newTask: Task = {
        id: this.generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
        status: dto.status || 'todo',
        priority: dto.priority || 'medium',
        tags: dto.tags || [],
        title: dto.title,
        description: dto.description
        };

        this.tasks.push(newTask);
        this.saveToStorage();

        return this.simulateNetwork({
        data: newTask,
        success: true
        });
    }
    async updateTask(id: string, updates: Partial<Task>): Promise<{ data: Task | null; success: boolean }> {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index === -1) {
        return this.simulateNetwork({
            data: null,
            success: false
        });
        }

        this.tasks[index] = {
        ...this.tasks[index],
        ...updates,
        updatedAt: new Date()
        };

        this.saveToStorage();

        return this.simulateNetwork({
        data: this.tasks[index],
        success: true
        });
    }

    async deleteTask(id: string): Promise<{ data: boolean; success: boolean }> {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(t => t.id !== id);
        const deleted = this.tasks.length < initialLength;
        
        if (deleted) this.saveToStorage();

        return this.simulateNetwork({
        data: deleted,
        success: deleted
        });
    }
}
export const taskService = new TaskService();