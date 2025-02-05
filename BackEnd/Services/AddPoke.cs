using System;
using pokedex.BackEnd.Models;

namespace pokedex.BackEnd.Services
{
    public class AddPokeService
    {
        private readonly DbSource _dbSource;
        public AddPokeService(DbSource dbSource)
        {
            _dbSource = dbSource;
        }

        public void AddPoke(Pokemon pokemon)
        {
            var existingPokeId = pokemon.Id;
            var existingPoke = _dbSource.Pokemon.Find(existingPokeId);
            if (existingPoke == null)
            {
                _dbSource.Pokemon.Add(pokemon);

                if (pokemon.Moves != null)
                {
                    foreach (var move in pokemon.Moves)
                    {
                        move.PokemonId = pokemon.Id;
                        _dbSource.Moves.Add(move);
                    }
                }

                if (pokemon.Sprites != null)
                {
                    pokemon.Sprites.PokemonId = pokemon.Id;
                    _dbSource.Sprites.Add(pokemon.Sprites);
                }

                if (pokemon.Types != null)
                {
                    foreach (var type in pokemon.Types)
                    {
                        type.PokemonId = pokemon.Id;
                        _dbSource.Types.Add(type);
                    }
                }

                if (pokemon.Abilities != null)
                {
                    foreach (var ability in pokemon.Abilities)
                    {
                        ability.PokemonId = pokemon.Id;
                        _dbSource.Abilities.Add(ability);
                    }
                }

                if (pokemon.GameIndices != null)
                {
                    foreach (var gameIndex in pokemon.GameIndices)
                    {
                        gameIndex.PokemonId = pokemon.Id;
                        _dbSource.GameIndices.Add(gameIndex);
                    }
                }

                _dbSource.SaveChanges();
            }
        }
    }
}