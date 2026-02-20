import type { Task } from "../types/index.ts";

//create interface=jiekou
interface TaskItemProps{
    task:Task;
    //function parametre=id with type string, return=nothing
    onToggle:(id:string) => void;
    onDelete:(id:string) => void;
}
export class TaskItem{
    //class members.
    element:HTMLElement;
    props:TaskItemProps;
    constructor(container:HTMLElement,props:TaskItemProps){
        this.props=props;
        this.element = this.createElement();
        //container is parent for this.element
        container.appendChild(this.element);
        //event for TaskItem : modify and delete.
        this.bindEvents();
    }
    private createElement():HTMLElement{
        const article = document.createElement('article');
        //based on different priority, className is different. 
        article.className = `task-item task-item--${this.props.task.priority}`;
        //escapeHtml for add <div> in the parent balise.
        //in this section, add two button --modify and delete
        article.innerHTML = `
            <div class="task-item__header">
                <h3>${this.escapeHtml(this.props.task.title)}</h3>
                <span class="badge">${this.props.task.priority}</span>
            </div>
            <p>${this.escapeHtml(this.props.task.description)}</p>
            <div class="task-item__actions">
                <button class="btn-toggle">${this.props.task.status === 'done' ? '✓ Done' : 'Mark Done'}</button>
                <button class="btn-delete">Delete</button>
            </div>    
        `;
        return article;
    }
    //definion of click for button modify and delete.
    private bindEvents():void{
        const toggleBtn = this.element.querySelector('.btn-toggle');
        const deleteBtn = this.element.querySelector('.btn-delete');
        toggleBtn?.addEventListener('click',()=>{
            this.props.onToggle(this.props.task.id);
        });
        deleteBtn?.addEventListener('click',() =>{
            this.props.onDelete(this.props.task.id);
        });
    }
    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    destroy(): void {
        this.element.remove();
    }
}
