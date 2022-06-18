import axios from 'axios';

class PokemonClient{
    constructor() {
        this.targetURL = 'https://pokeapi.co/api/v2/pokemon/';
    }

    async fetchPokemon(idArray){
        let requests = [];
        idArray.forEach(id => {
            requests.push(
                axios.get(this.targetURL + `${id}`)
                .then(res => res.data)
                .catch(err => new Promise((resolve) => {
                    resolve({id: id});
            })))
        });
        const responses = await Promise.all(requests);
        return responses.map(pokemon => {
            return pokemon.name ? `Catch ${pokemon.name}` : `Pokemon with ID ${pokemon.id} was not found`;
        })
    }
}

export default PokemonClient;