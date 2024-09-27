import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'

function Details() {
    const [pokemon, setPokemon] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((response) => {
                setPokemon(response.data)
            })
            .catch((error) => {
                console.error("Error fetching data: ", error)
            })
    }, [id])

    const moves = pokemon?.moves?.map((e) => {
        return <p style={{color: '#307BFA'}} key={e.move.url}>{e.move.name}</p>
    })
    const stats = pokemon?.stats?.map((e) => {
        return <p style={{color: '#307BFA'}} key={e.stat.url}>{e.stat.name}: {e.base_stat}</p>
    })
    const games = pokemon?.game_indices?.map((e) => {
        return <p style={{color: '#307BFA'}} key={e.version.url}>{e.version.name}</p>
    })
    const types = pokemon?.types?.map((e) => {
        return <p style={{color: '#307BFA'}} key={e.type.url}>{e.type.name}</p>
    })
    const abilities = pokemon?.abilities?.map((e) => {
        return <p style={{color: '#307BFA'}} key={e.ability.url}>{e.ability.name}</p>
    })

    return (
        <div>
            {pokemon && (
                <>
                    <img src={pokemon.sprites.front_default != null ? pokemon.sprites.front_default : ""} className="App-logo" />
                    <img src={pokemon.sprites.back_default != null ? pokemon.sprites.back_default : ""} className="App-logo" />
                    <img src={pokemon.sprites.front_shiny != null ? pokemon.sprites.front_shiny : ""} className="App-logo" />
                    <img src={pokemon.sprites.back_shiny != null ? pokemon.sprites.back_shiny : ""} className="App-logo" />
                    <p>
                        {pokemon?.name != null ? pokemon?.name : ""} <sup>(#{pokemon?.id != null ? pokemon?.id : ""})</sup>
                    </p>
                    <div className="infoCats">
                        {types.length > 0 && (
                            <div className="type">
                                <h3>Type</h3>
                                {types}
                            </div>
                        )}
                        {abilities.length > 0 && (
                            <div className="type">
                                <h3>Abilities</h3>
                                {abilities}
                            </div>
                        )}
                        {stats.length > 0 && (
                            <div className="type">
                                <h3>Stats</h3>
                                {stats}
                            </div>
                        )}
                        {moves.length > 0 && (
                            <div className="type">
                                <h3>Moves</h3>
                                {moves}
                            </div>
                        )}
                        {games.length > 0 && (
                            <div className="type">
                                <h3>Games</h3>
                                {games}
                            </div>
                        )}
                    </div>

                </>
            )}
        </div>
    )
}

export default Details
