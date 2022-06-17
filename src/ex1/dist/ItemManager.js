import PokemonClient from "./PokemonClient.js";
import fs from 'fs';
const filename='./data.json';

class ItemManager{
    constructor(element) {
        this.todoList = new Map;
        this.lastId = 0
        this.load();
        this.PokemonClient = new PokemonClient();
    }

    load(){  
        const data = fs.readFileSync(filename, {encoding:'utf8', flag:'r'});
        this.todoList = JSON.parse(data);
        this.lastId = Math.max(...this.todoList.keys())
    }

    store(){  
        fs.writeFileSync(filename, JSON.stringify(this.todoList));
    }

    async addTask(itemText){
        let itemTexts = [];
        const split = itemText.split(`,`);
        
        if(parseInt(itemText)){
            itemTexts = await this.PokemonClient.fetchPokemon([parseInt(itemText)]);
        }
        if(split.length > 1){
            itemTexts = await this.PokemonClient.fetchPokemon(split.map(id => parseInt(id)));
        }
        if(itemTexts.length === 0){
            itemTexts.push(itemText);
        }
        itemTexts.forEach(item => {
            this.todoList.set(++this.lastId,{value:item, done: false});
        })
        this.store();
    }

    removeTask(id) {
        this.todoList.delete(id);
        this.store();
    }

    setDone(id){
        this.todoList[id].done = true;
    }

    setUnDone(id){
        this.todoList[id].done = false;
    }

    
    get doneTasks(){
       return this.todoList.filter(item => item.done).length;
    }


    clear(){
        this.todoList = new Map;
        this.store();
    }
}
export default ItemManager;