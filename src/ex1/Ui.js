class Ui {
    constructor() {
        this.tasksCompleted = document.getElementById('completed-tasks');
        this.listGif = document.getElementById('list-gif');
        this.imInstance = new ItemManager();
        document.querySelector('form').addEventListener('submit', this.submitButtonHandler.bind(this));
        document.getElementById('clear-all').addEventListener('click', this.clearAllHandler.bind(this));
        document.querySelector('ul').addEventListener('click', this.alertMessage.bind(this));
    }

    /*** Submit Button Handler ***/
    async submitButtonHandler(event) {
        event.preventDefault(); //Preventing page refresh on form submission
        const newTaskInput = document.querySelector('#new-task');
        this.listGif.style.display = "none";
        if (newTaskInput.value !== '') {
            this.tasksCompleted.style.display = "flex";
            await this.imInstance.addTask(newTaskInput.value);
            newTaskInput.value = ''; //After inserting a new task, the new task input area will be initialized to an empty string
        }
        this.renderTodo();
    }

    renderTodo() {
        const ul = document.querySelector('ul');
        //Prevents duplicates of already inserted todos
        while (ul.hasChildNodes()) {
            ul.removeChild(ul.firstChild);
        }
        this.imInstance.todoList.forEach(element => {
            const li = document.createElement('li'); //Creating a new 'li' element which refers to a new task that has been submitted
            //When the task os marked as done, the line through style will be implemented
            if(element.done){
                li.style.textDecoration = 'line-through';
                li.style.color = 'lightgrey';
            }
            //Inserting text content to the 'li' element
            li.innerHTML = `
            <input type="checkbox" ${element.done ? 'checked': ''} name="task-complete" class="doneCheckbox" id="${element.id}"> 
            <span class="task-item">${element.value}</span> 
            <button id="deleteButton" item=${element.id} name="deleteButton"><i class="fas fa-trash"></i></button>`;
            li.classList.add('task-list-item'); //Adding the user's input into the list
            ul.appendChild(li);
            document.getElementById(element.id).addEventListener('click', this.checkTodo.bind(this));
            document.querySelector(`[item="${element.id}"]`).addEventListener('click', this.deleteTodo.bind(this));
        });
        //If the the array is empty, then display a gif
        if(this.imInstance.todoList.length === 0){
            this.tasksCompleted.style.display = "none";
            this.listGif.style.display = "block";
        }
        this.taskCompletePhrase();
    }


    /*** Task Done Checkbox ***/
    checkTodo(event) {
        let item = event.target;
        //If the checkbox is mark as done, set the array's done attribute to true, else set it to false 
        item.checked ? this.imInstance.setDone(event.target.id) : this.imInstance.setUnDone(event.target.id);
        this.renderTodo();
    }


    /*** Delete Button ***/
    deleteTodo(event) {
        this.imInstance.removeTask(event.target.getAttribute("item"));
        this.renderTodo();
    }


    /*** Clear All Button ***/
    clearAllHandler(event) {
        this.imInstance.clear();
        this.renderTodo();
    }


    /*** List Item Clicked ***/
    alertMessage(event) {
        if (event.target.name !== 'task-complete' && event.target.name !== 'deleteButton') {
            alert(event.target.innerText);
        }
    }


    //"You have completed 0 / 1 tasks" function
    taskCompletePhrase() {
        this.tasksCompleted.innerText = `You have completed ${this.imInstance.doneTasks} / ${this.imInstance.todoList.length} tasks`;
    }
}