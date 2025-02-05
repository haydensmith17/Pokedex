using System;
using System.Collections.Generic;

namespace pokedex.BackEnd.Models
{
    public class Pokemon
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public Basestats? BaseStats { get; set; } // JSONB
        public List<Move>? Moves { get; set; }
        public Sprites? Sprites { get; set; }
        public List<Type>? Types { get; set; }
        public List<Ability>? Abilities { get; set; }
        public List<GameIndex>? GameIndices { get; set; }
    }

    public class Basestats
    {
        public int? Id { get; set; }
        public int PokemonId { get; set; }
        public string? HP { get; set; }
        public string? Attack { get; set; }
        public string? Defense { get; set; }
        public string? SpAtk { get; set; }
        public string? SpDef { get; set; }
        public string? Speed { get; set; }
        public string? Total { get; set; }
    }

    public class Move
    {
        public int? Id { get; set; }
        public int? PokemonId { get; set; }
        public string? Name { get; set; }
        public string? Move_Type { get; set; }
        public string? Atk_Type { get; set; }
        public int? Power { get; set; }
        public int? Accuracy { get; set; }
        public int? PP { get; set; }
        public string? Effect { get; set; }
    }

    public class Sprites
    {
        public int? Id { get; set; }
        public int? PokemonId { get; set; }
        public string? Front_Default { get; set; }
        public string? Front_Female { get; set; }
        public string? Front_Shiny { get; set; }
        public string? Front_Shiny_Female { get; set; }
        public string? Back_Default { get; set; }
        public string? Back_Female { get; set; }
        public string? Back_Shiny { get; set; }
        public string? Back_Shiny_Female { get; set; }
    }

    public class Type
    {
        public int? Id { get; set; }
        public int? PokemonId { get; set; }
        public string? Name { get; set; }
    }

    public class Ability
    {
        public int? Id { get; set; }
        public int? PokemonId { get; set; }
        public string? Name { get; set; }
    }

    public class GameIndex
    {
        public int? Id { get; set; }
        public int? PokemonId { get; set; }
        public int? Game_Index { get; set; }
        public string? Name { get; set; }
    }
}