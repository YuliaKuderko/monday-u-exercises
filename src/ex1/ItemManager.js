class ItemManager{
    constructor(element) {
        this.todoList = [];
        this.pcInstance = new PokemonClient();
    }

    async addTask(itemText){
        let itemTexts = [];
        //If the input includes string, parse it to integer, and fetch its pokemon id 
        if(parseInt(itemText)){
            itemTexts = await this.pcInstance.fetchPokemon([parseInt(itemText)]);
        }
        //If the input has more than 1 string, split it into an array, fetch the input and create an array with parsed integers which are the pokemons' ids
        if(itemText.split(`,`).length > 1){
            itemTexts = await this.pcInstance.fetchPokemon(itemText.split(`,`).map(id => parseInt(id)));
        }
        //If the array's empty, then push the string into the array and print the string that was inserted
        if(itemTexts.length === 0){
            itemTexts.push(itemText);
        }
        //For each element in the itemTexts array, push its value into the main array (todoList), allocate an id to it and set its done attribute to false  
        itemTexts.forEach(item => {
            this.todoList.push({value:item, id: (Math.random() + 1).toString(36).substring(7), done: false});
        })
    }

    //Create a new array that doesn't include the id (value) of the clicked list item
    removeTask(id) {
        this.todoList = this.todoList.filter(task => id !== task.id);
    }


    //Whenever the task is marked as done, set the array's "done" attribute to true
    setDone(id){
        this.todoList.forEach(item => {
            if (item.id === id){
                item.done = true;
            }
        })
    }

    //Whenever the task is marked as undone, set the array's "done" attribute to false
    setUnDone(id){
        this.todoList.forEach(item => {
            if (item.id === id){
                item.done = false;
            }
        })
    }

    //Getting the amount of done tasks
    get doneTasks(){
       return this.todoList.filter(item => { return item.done}).length;
    }

    //Empties the array
    clear(){
        this.todoList = [];
    }
}