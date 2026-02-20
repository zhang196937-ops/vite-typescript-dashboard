import type { Priority } from "../types";

export function isPriority(value: unknown): value is Priority {
    return value==='low'|| value==='medium'||value==='high';
}
export function formatDate(date:Date|string|number):string {
    const d = new Date(date);
    if (isNaN(d.getTime())){
        throw new Error('Invalid date');
    }
    return d.toLocaleDateString('en-US',{
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
export interface ValidationResult {
    valid: boolean;
    errors: string[];    
}
export function validateTaskInput(input:unknown):ValidationResult{
    const errors: string[]=[];
    if(typeof input!== 'object'|| input === null){
        return {valid: false, errors: ['Input must be an object']};
    }
    const taksInput = input as Record<string, unknown>;
    if(!taksInput.title||typeof taksInput.title  !=='string'){
        errors.push('Title is required and must be a string');
    }
    if(taksInput.title&&(taksInput.title as string).length<3){
        errors.push('Title must be as least 3 characters');
    }
    return{
        valid: errors.length===0,
        errors
    }
}
export class StorageService<T> {
    key: string;
    constructor(key: string){
        this.key = key;
    }
    save(data:T):void{
        try{
            localStorage.setItem(this.key,JSON.stringify(data));

        }catch(error){
            console.error("Failed to save: ", error)
        }        
    }
    load():T|null{
        try{
            const item=localStorage.getItem(this.key);
            return item? JSON.parse(item) as T : null;
        }catch{
            return null;
        }
    }
}
/*
| Syntax                    | Meaning                               |
| ------------------------- | ------------------------------------- |
| `import { x } from '...'` | Bring code from other file            |
| `export`                  | Make available to other files         |
| `function name(): Type`   | Define reusable code with return type |
| `param: Type \| Type`     | Union (either type allowed)           |
| `value is Type`           | Type guard (narrows type if true)     |
| `throw new Error()`       | Crash with message                    |
| `const arr: string[]`     | Array of strings                      |
| `obj as Type`             | Tell TypeScript to treat as type      |
| `if (a \|\| b)`           | If a OR b is true                     |
| `if (a && b)`             | If a AND b are true                   |
| `typeof x`                | Check JavaScript type                 |
| `class Name<T>`           | Blueprint with generic type           |
| `constructor(){}`         | Initialize new objects                |
| `this.property`           | Access object's own property          |
| `try { } catch { }`       | Handle errors gracefully              |
| `T \| null`               | Either type T or null                 |
*/