import { useEffect, useState, useRef } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import App from "./App"

function random() {
    const pokeNum = 1025
    return Math.floor(Math.random() * pokeNum) + 1
}

function RandomPokedex() {
    const [pokemon, setPokemon] = useState(null)
    const hasFetched = useRef(false);
    const navigation = useNavigate()

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            axios.get(`https://pokeapi.co/api/v2/pokemon/${random()}`)
                .then((crap) => {
                    setPokemon(crap.data)
                })
            }
        }, [])
        console.log(pokemon)

    return (
        <div>
            {pokemon && (
                <>
                    <img src={pokemon.sprites.front_default != null ? pokemon.sprites.front_default: ""} className="App-logo"/>
                    <img src={pokemon.sprites.back_default != null ? pokemon.sprites.back_default: ""} className="App-logo"/>
                    <img src={pokemon.sprites.front_shiny != null ? pokemon.sprites.front_shiny: ""} className="App-logo"/>
                    <img src={pokemon.sprites.back_shiny != null ? pokemon.sprites.back_shiny: ""} className="App-logo"/>
                    <p>
                        {pokemon?.name != null ? pokemon?.name: ""} <sup>(#{pokemon?.id != null ? pokemon?.id: ""})</sup>
                    </p>
                    <button style={{background: '#FC0605'}} onClick={() => {
                        navigation(`/details/${pokemon.id != null ? pokemon.id: ""}`)
                    }}>See Details</button>
                   
                </>
            )}
        </div>
    )
}
export default RandomPokedex