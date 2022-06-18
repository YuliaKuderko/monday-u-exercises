import PokemonClient from "./PokemonClient.js";
import fs from 'fs';
const filename='./data.json';

class ItemManager{
    constructor(element) {
        this.todoList = [];
        this.load();
        this.PokemonClient = new PokemonClient();
    }

    load(){  
        const data = fs.readFileSync(filename, {encoding:'utf8', flag:'r'});
        this.todoList = JSON.parse(data);
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
            this.todoList.push({value:item, done: false});
        })
        this.store();
    }

    removeTask(id) {
        this.todoList.splice(id, 1);
        this.store();
    }

    setDone(id){
        this.todoList.forEach(item => {
            if (item.id === id){
                item.done = true;
            }
        })
    }

    setUnDone(id){
        this.todoList.forEach(item => {
            if (item.id === id){
                item.done = false;
            }
        })
    }

    
    get doneTasks(){
       return this.todoList.filter(item => item.done).length;
    }


    clear(){
        this.todoList = [];
        this.store();
    }
}
export default ItemManager;