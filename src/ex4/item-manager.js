import PokemonClient from "./pokemon-client.js";
import Sequelize, { where } from 'sequelize';
import Config from './server/db/config/config.json' assert {type: "json"};
import Item from "./server/db/models/item.js";

class ItemManager {
    constructor(element) {
        const seq = new Sequelize(Config["development"]);
        Item.init(seq);
        this.PokemonClient = new PokemonClient();
    }


    async getItems() {
        return await Item.findAll();
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
        let inputs = [];
        for (const item of itemTexts) {
            inputs.push(await Item.create({ ItemName: item, status: false }));
        }
        await Promise.all(inputs);
    }

    async removeTask(id) {
        const item = await Item.findByPk(id);
        await item.destroy({ where: { id: Item.id } });
    }

    async setDone(id) {
        const item = await Item.findByPk(id);
        await Item.update({ status: true }, { where: { id: item.id } });
    }

    async setUnDone(id) {
        const item = await Item.findByPk(id);
        await Item.update({ status: false }, { where: { id: item.id } });
    }

    get doneTasks() {
        return Item.findAll().filter(item => item.status).length;
    }

    clear() {
        Item.destroy({
            where: {},
            truncate: true
        });
    }
}
export default ItemManager;