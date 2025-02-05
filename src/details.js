import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FixedSizeList } from "react-window";
import * as React from "react";
import './App.css';
import App from "./App";
import MyPokedex from "./pokedex";
import Pokedex from 'pokedex-promise-v2';

const P = new Pokedex();

function Details({ pokemon1 }) {
    const [pokemon, setPokemon] = useState(null);
    const { id } = useParams();

    // function savedUserInput() {
    //     const savedUserInput = id;

    //     return (
    //         <MyPokedex savedUserInput={savedUserInput} />
    //     )
    // }

    useEffect(() => {
        if (pokemon1) {
            setPokemon(pokemon1[0])
            console.log(pokemon1)
        }
    })

    // useEffect(() => {
    //     const stringInput = id.toString()
    //     P.getPokemonByName(stringInput)
    //         .then((response) => {
    //             setPokemon(response)
    //             console.log(response)
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching data: ", error);
    //         });
    // }, [id]);

    const types = pokemon?.types;
    const abilities = pokemon?.abilities;
    const baseStats = pokemon?.baseStats;
    const moves = pokemon?.moves;
    const games = pokemon?.games;
    const evoLevel = pokemon?.evoLevel;
    console.log(moves, games)

    return (
        <div>
            {pokemon && (
                <>
                    <div className="detailImages">
                        <img src={pokemon.sprites || ""} alt="Front Default" />
                        {pokemon.sprites.back_default ? (
                            <img src={pokemon.sprites.back_default} alt="Front Shiny" />
                        ) : ("")}
                        <img src={pokemon.sprites.front_shiny || ""} alt="Front Shiny" />
                        {pokemon.sprites.back_shiny ? (
                            <img src={pokemon.sprites.back_shiny} alt="Front Shiny" />
                        ) : ("")}
                    </div>
                    <h2>
                        {pokemon?.name ? pokemon?.name[0].toUpperCase() + pokemon.name.slice(1) : ""}{" "}
                        <sup>(#{pokemon?.id || ""})</sup>
                    </h2>
                    <div className="infoCats">
                        {types?.length > 0 && (
                            <div className="type">
                                <h3>Type</h3>
                                {types.map((type, index) => (
                                    <p style={{ color: "#307BFA" }} key={index}>
                                        {type[0].toUpperCase() + type.slice(1)}
                                    </p>
                                ))}
                            </div>
                        )}
                        {abilities?.length > 0 && (
                            <div className="type">
                                <h3>Abilities</h3>
                                {abilities.map((ability, index) => (
                                    <p style={{ color: "#307BFA" }} key={index}>
                                        {ability[0].toUpperCase() + ability.slice(1)}
                                    </p>
                                ))}
                            </div>
                        )}
                        {baseStats?.length > 0 && (
                            <div >
                                <h3>Base Stats</h3>
                                {baseStats.map((baseStat, index) => (
                                    <p style={{ color: "#307BFA" }} key={index}>
                                        {baseStat[0].toUpperCase() + baseStat.slice(1)}
                                    </p>
                                ))}
                            </div>
                        )}
                        {evoLevel?.length > 0 && (
                            <div>
                                <h3>Evolution</h3>
                                {evoLevel.map((evoLevel, index) => (
                                    <p style={{ color: "#307BFA" }} key={index}>
                                        {evoLevel[0].toUpperCase() + evoLevel.slice(1)}
                                    </p>
                                ))}
                                </div>
                        )}
                        {moves?.length > 0 && (
                            <div className="moves">
                                <h3>Moves</h3>
                                <FixedSizeList
                                    height={230}
                                    width={150}
                                    itemSize={46}
                                    itemCount={moves.length}
                                    overscanCount={5}
                                >
                                    {({ index }) => (
                                        <div key={index}>
                                            <p style={{ color: "#307BFA" }}>
                                                {moves[index]}
                                            </p>
                                        </div>
                                    )}
                                </FixedSizeList>
                            </div>
                        )}
                        {games?.length > 0 && (
                            <div className="games">
                                <h3>Games</h3>
                                <FixedSizeList
                                    height={230}
                                    width={150}
                                    itemSize={46}
                                    itemCount={games.length}
                                    overscanCount={5}
                                >
                                    {({ index }) => (
                                        <div key={index}>
                                            <p style={{ color: "#307BFA" }}>
                                                {games[index]}
                                            </p>
                                        </div>
                                    )}
                                </FixedSizeList>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Details;
