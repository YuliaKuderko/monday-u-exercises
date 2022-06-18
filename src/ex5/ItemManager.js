import PokemonClient from "./PokemonClient.js";
import item from "./models/item.js";
class ItemManager {
    constructor(element) {
        this.PokemonClient = new PokemonClient();
    }

    async getItems() {
        return await item.findAll();
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
            ++this.lastID;
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