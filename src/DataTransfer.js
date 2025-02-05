const axios = require('axios');
const [pokemon, setPokemon] = useState(null)

const fetchData = async () => {
    let dexNum = 1;
    try {
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${dexNum}`);
        setPokemon(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching data from API:', error);
    }
};

const { Client } = require('pg');

const insertData = async (data) => {
    const client = new Client({
        user: 'root',
        host: 'localhost',
        database: 'postgres1',
        password: 'secret',
        port: 5432,
    });

    await client.connect();

    const query = `INSERT INTO pokemon (pokemonid, name, types) VALUES (${pokemon.id}, ${pokemon.name}, ${pokemon.types})`;
    
        await client.query(query, [item.id, item.name, item.value]);

    await client.end();
};

const main = async () => {
    const apiData = await fetchData();
    await insertData(apiData);
};

main();
