import { useEffect, useState } from "react"
import axios from 'axios'
import Details from "./details"
import { useNavigate } from "react-router-dom"

function Pokedex() {
    const [pokemon, setPokemon] = useState(null)
    const [userInput, setUserInput] = useState(26)
    const navigation = useNavigate()
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${userInput}`)
            .then((crap) => {
                setPokemon(crap.data)
            })
        console.log(pokemon)
    }, [userInput])
    function seeDetails() {
        navigation(`/details/${pokemon.id != null ? pokemon.id: ""}`)
    }

    return (
        <div className="pokemonSprite">
            <img src={pokemon?.sprites?.front_default != null ? pokemon?.sprites?.front_default: ""} className="App-logo" />
            <img src={pokemon?.sprites?.back_default != null ? pokemon?.sprites?.back_default: ""} className="App-logo" />
            <p>
                {pokemon?.name != null ? pokemon?.name: ""} <sup>(#{pokemon?.id != null ? pokemon?.id: ""})</sup>
            </p>
            <input
                type="number"
                onChange={(e) => setUserInput(e.target.value)}
                style={{ width: '185px', height: '70px', fontSize: '68px', borderRadius: '4px', border: '1px solid #ccc' }}
                
            />

            <br />
            <button style={{ marginTop: '10px', background: '#FC0605' }} onClick={seeDetails}>See Details</button>
        </div>
    )
}
export default Pokedex