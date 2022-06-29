class Ui {
    constructor() {
        this.tasksCompleted = document.getElementById('completed-tasks');
        this.listGif = document.getElementById('list-gif');
        this.RemoteItemManager = new RemoteItemManager();
        document.querySelector('form').addEventListener('submit', this.submitButtonHandler.bind(this));
        document.getElementById('clear-all').addEventListener('click', this.clearAllHandler.bind(this));
        document.querySelector('ul').addEventListener('click', this.alertMessage.bind(this));
        this.renderTodo();
    }

    async submitButtonHandler(event) {
        event.preventDefault(); 
        const newTaskInput = document.querySelector('#new-task');
        if (newTaskInput.value !== '') {
            this.tasksCompleted.style.display = "flex";
            await this.RemoteItemManager.add(newTaskInput.value);
            newTaskInput.value = ''; 
        }
        this.renderTodo();
    }

    async renderTodo() {
        const ul = document.querySelector('ul');
        this.duplicateListItemRemover(ul);
        const items = await this.RemoteItemManager.get();
        items.forEach(element => {
            const li = document.createElement('li'); 
            if (element.status) {
                li.style.textDecoration = 'line-through';
                li.style.color = 'lightgrey';
            }
            li.innerHTML = `
            <input type="checkbox" ${element.status ? 'checked' : ''} name="task-complete" class="doneCheckbox" id="${element.id}"> 
            <span class="task-item">${element.ItemName}</span> 
            <button id="deleteButton" item=${element.id} name="deleteButton"><i class="fas fa-trash"></i></button>`;
            li.classList.add('task-list-item'); 
            ul.appendChild(li);
            document.getElementById(element.id).addEventListener('click', this.checkTodo.bind(this));
            document.querySelector(`[item="${element.id}"]`).addEventListener('click', this.deleteTodo.bind(this));
        });
        if (items.length === 0) {
            this.tasksCompleted.style.display = "none";
            this.listGif.style.display = "block";
        } else {
            this.tasksCompleted.style.display = "block";
            this.listGif.style.display = "none";
        }
        this.taskCompletePhrase(items);
    }


    async checkTodo(event) {
        const item = event.target;
        item.checked ? await this.RemoteItemManager.setDone(event.target.id) : await this.RemoteItemManager.setUnDone(event.target.id);
        this.renderTodo();
    }


    async deleteTodo(event) {
        await this.RemoteItemManager.deleteItem(event.target.getAttribute("item"));
        this.renderTodo();
    }

    async clearAllHandler(event) {
        await this.RemoteItemManager.clearAll();
        this.renderTodo();
    }


    alertMessage(event) {
        if (event.target.name !== 'task-complete' && event.target.name !== 'deleteButton') {
            alert(event.target.innerText);
        }
    }


    taskCompletePhrase(items) {
        this.tasksCompleted.innerText = `You have completed ${items.filter(e => e.status).length} / ${items.length} tasks`;
    }

    duplicateListItemRemover(ul) {
        while (ul.hasChildNodes()) {
            ul.removeChild(ul.firstChild);
        }
    }
}
