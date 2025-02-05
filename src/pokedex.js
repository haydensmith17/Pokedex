import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';
import Pokedex from 'pokedex-promise-v2';

function MyPokedex({ pokemon1 }) {
    const [pokemon, setPokemon] = useState(null)
    const [userInput, setUserInput] = useState(null)
    const [error, setError] = useState(null);
    const navigation = useNavigate()
    const savedUserInput = JSON.parse(localStorage.getItem("savedUserInput"));

    const random = () => { setUserInput(Math.floor(Math.random() * 1025) + 1) }
    const P = new Pokedex();

    const addUrl = "http://localhost:5171/AddPoke";

    async function NewPoke() {
        const pokemonId = pokemon.id;
        await axios.post(`${addUrl}/new`, {pokemonId, pokemon})
    }

    // useEffect(() => {
    //     if (pokemon1) {
    //         setPokemon(pokemon1[0])
    //         console.log(pokemon1)
    //     }
    // })

    useEffect(() => {
        if (savedUserInput) {
            setUserInput(savedUserInput);
        }
        localStorage.setItem("savedUserInput", JSON.stringify(""));
        if (userInput) {
            const stringInput = userInput.toString()
            P.getPokemonByName(stringInput)
                .then((response) => {
                    setPokemon(response)
                    console.log(response)
                    console.log(pokemon1)
                })
                .catch((error) => {
                    if (error.response && error.response.status === 404) {
                        setError("Pokémon not found. Please try again.");
                        setPokemon(null);
                    } else {
                        console.error("An unexpected error occurred:", error);
                    }
                });
        }
    }, [userInput], [savedUserInput]);


    function seeDetails() {
        console.log(pokemon)
        // localStorage.setItem('savedUserInput', JSON.stringify(pokemon.id));
        navigation(`/details/${pokemon.id != null ? pokemon.id : ""}`)
    }

    return (
        <>
            {/* <h1>{props.name}</h1> */}
            <div className="pokemonSprite">
                {error && <p style={{ color: "red" }}>{error}</p>}
                {pokemon ? (
                    <div className="spriteText" >
                        <img src={pokemon?.sprites != null ? pokemon?.sprites : ""} className="App-logo" />
                        <h2>
                            {pokemon?.name != null ? pokemon?.name[0].toUpperCase() + pokemon.name.slice(1) : ""} <sup>(#{pokemon?.id != null ? pokemon?.id : ""})</sup>
                        </h2>
                    </div>
                ) : (
                    <Box style={{ height: 200, marginTop: 97 }}>
                        <div>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyiHtSZfD_pLtGNGhk1PlLUiP6N5yCz1RYsg&s" />
                        </div>
                    </Box>
                )}
                <div className="pokemonInput">
                    <h3>Enter the National Pokédex number <br /> of the Pokémon you want to see!</h3>
                    <input defaultValue={savedUserInput != null ? savedUserInput : ""}
                        min={1} max={1025}
                        type="number"
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value >= 1 && value <= 1025) {
                                setUserInput(value);
                                localStorage.setItem("savedUserInput", JSON.stringify(value));
                            } else {
                                console.warn("Invalid input: Must be between 1 and 1025.");
                            }
                        }}
                        style={{ width: '185px', height: '70px', fontSize: '68px', borderRadius: '4px', border: '1px solid #ccc', textAlign: "center" }}
                    />
                    <br />
                    <div className="myButtons">
                        <button style={{ marginTop: '15px', background: '#FFFFFF' }} onClick={random}>Surprise Me!</button>
                        <button style={{ marginTop: '15px', background: '#FC0605' }} disabled={!userInput} onClick={seeDetails}>See Details</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MyPokedex