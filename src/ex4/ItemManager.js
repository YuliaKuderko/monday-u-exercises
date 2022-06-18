import PokemonClient from "./PokemonClient.js";
import fs from 'fs';
const filename = './data.json';

class ItemManager {
    constructor(element) {
        this.load();
        this.PokemonClient = new PokemonClient();
    }

    load() {
        const data = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });
        this.todoList = JSON.parse(data);
        if (this.todoList.length === 0) {
            this.lastID = 0;
            return;
        }
        this.lastID = Math.max(...Object.keys(this.todoList), 0);
    }

    store() {
        fs.writeFileSync(filename, JSON.stringify(this.todoList));
    }

    getItems() {
        return this.todoList;
    }

    async addTask(itemText) {
        let itemTexts = [];
        const split = itemText.split(`,`);

        if (parseInt(itemText)) {
            itemTexts = await this.PokemonClient.fetchPokemon([parseInt(itemText)]);
        }
        if (split.length > 1) {
            itemTexts = await this.PokemonClient.fetchPokemon(split.map(id => parseInt(id)));
        }
        if (itemTexts.length === 0) {
            itemTexts.push(itemText);
        }
        itemTexts.forEach(item => {
            ++this.lastID
            this.todoList[this.lastID] = { value: item, done: false, id: this.lastID };
        })
        this.store();
    }

    removeTask(id) {
        delete this.todoList[id];
        this.store();
    }

    setDone(id) {
        this.todoList[id].done = true;
    }

    setUnDone(id) {
        this.todoList[id].done = false;
    }

    get doneTasks() {
        return this.todoList.values().filter(item => item.done).length;
    }

    clear() {
        this.todoList = {};
        this.store();
    }
}
export default ItemManager;