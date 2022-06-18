import { program } from 'commander';
import color from'colors-cli';
import ItemManager from './ItemManager.js';
const itemManager = new ItemManager();



program
    .name('To Do List')
    .description('This is my TODO List')
    .version("1.0.0");
program
    .command('add')
    .description('Add a new todo')
    .argument("<text>", "Task")
    .action(async (first) => {
        await itemManager.addTask(first);
        console.log(color.yellow("New todo was added successfully"));
    });

program
    .command('delete')
    .description('Delete a todo')
    .argument("<number>", "Task ID")
    .action((id) => {
         itemManager.removeTask(id-1);
         itemManager.todoList.map((i, index) => console.log(color.red_bt((index+1) +". "+ i.value)));
    });


program
    .command('show')
    .description('Show the current todo list')
    .action(() => {
        if(itemManager.todoList.length === 0){
            console.log(color.magenta_bt('The list is empty'));
            return;
        }
        itemManager.todoList.map((i, index) => console.log(color.red_bt((index+1) +". "+ i.value)));
    });
    
program
    .command('clear')
    .description('Remove all todos from list')
    .action(() => {
        itemManager.clear();
        console.log(color.magenta_bt('The list is empty'));
    });

program.parse();