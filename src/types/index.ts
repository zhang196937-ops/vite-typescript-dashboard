//********************
//ENUMS - Named constant sets
//*******************************
export type Priority = 'low'|'medium'|'high';
export type TaskStatus = 'todo'|'in_progress'|'done';
export const Priority = {
    LOW: 'low' as Priority,
    MEDIUM: 'medium' as Priority,
    HIGH: 'high' as Priority
};
export const TaskStatus = {
    TODO: 'todo' as TaskStatus,
    IN_PROGRESS: 'in_progress' as TaskStatus,
    DONE: 'done' as TaskStatus
};
export interface BaseEntity{
    id:string;
    createdAt:Date;
    updatedAt:Date;
}
export interface Task extends BaseEntity{
    title:string;
    description:string;
    status:TaskStatus;
    priority:Priority;
    dueDate?:Date;
    tags:string[];
};
export type TaskFilter = 'all' | TaskStatus;
export type CreateTaskDTO = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
/*
| Keyword     | Purpose                          |
| ----------- | -------------------------------- |
| `export`    | Make available to other files    |
| `type`      | Create custom type/shape         |
| `const`     | Constant value (no reassignment) |
| `interface` | Describe object shape            |
| `class`     | Create real objects with methods |
| `extends`   | Inherit/copy properties          |
| `?`         | Optional (might be undefined)    |
| `Omit`      | Remove keys from a type          |
*/