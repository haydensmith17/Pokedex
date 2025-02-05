using Microsoft.EntityFrameworkCore;
using pokedex.BackEnd.Models;
using Type = pokedex.BackEnd.Models.Type;

namespace pokedex
{
    public class DbSource : DbContext
    {
        public DbSource(DbContextOptions<DbSource> options) : base(options)
        {
        }

        public virtual DbSet<Pokemon> Pokemon { get; set; }
        public virtual DbSet<Move> Moves { get; set; }
        public virtual DbSet<Basestats> BaseStats { get; set; }
        public virtual DbSet<Sprites> Sprites { get; set; }
        public virtual DbSet<Type> Types { get; set; }
        public virtual DbSet<Ability> Abilities { get; set; }
        public virtual DbSet<GameIndex> GameIndices { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pokemon>(entity => {
                entity.HasKey(e => e.Id).HasName("pokemon_pkey");
                entity.ToTable("pokemon");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name).HasColumnName("name").HasMaxLength(250);
                entity.Property(e => e.Height).HasColumnName("height");
                entity.Property(e => e.Weight).HasColumnName("weight");
            });

            modelBuilder.Entity<Move>(entity => {
                entity.HasKey(e => e.Id).HasName("move_pkey");
                entity.ToTable("moves");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.PokemonId).HasColumnName("pokemonid");
                entity.Property(e => e.Name).HasColumnName("name").HasMaxLength(255);
                entity.Property(e => e.Move_Type).HasColumnName("move_type").HasMaxLength(255);
                entity.Property(e => e.Atk_Type).HasColumnName("atk_type").HasMaxLength(255);
                entity.Property(e => e.Power).HasColumnName("power");
                entity.Property(e => e.Accuracy).HasColumnName("accuracy");
                entity.Property(e => e.PP).HasColumnName("pp");
                entity.Property(e => e.Effect).HasColumnName("effect").HasMaxLength(255);
                entity.HasOne<Pokemon>().WithMany(p => p.Moves).HasForeignKey(m => m.PokemonId);
            });

            modelBuilder.Entity<Basestats>(entity => {
                entity.HasKey(e => e.Id).HasName("basestats_pkey");
                entity.ToTable("basestats");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.PokemonId).HasColumnName("pokemonid");
                entity.Property(e => e.HP).HasColumnName("hp").HasMaxLength(255);
                entity.Property(e => e.Attack).HasColumnName("attack").HasMaxLength(255);
                entity.Property(e => e.Defense).HasColumnName("defense").HasMaxLength(255);
                entity.Property(e => e.SpAtk).HasColumnName("spatk").HasMaxLength(255);
                entity.Property(e => e.SpDef).HasColumnName("spdef").HasMaxLength(255);
                entity.Property(e => e.Speed).HasColumnName("speed").HasMaxLength(255);
                entity.Property(e => e.Total).HasColumnName("total").HasMaxLength(255);
                entity.HasOne<Pokemon>().WithOne(p => p.BaseStats).HasForeignKey<Basestats>(s => s.PokemonId);
            });

            modelBuilder.Entity<Sprites>(entity => {
                entity.HasKey(e => e.Id).HasName("sprites_pkey");
                entity.ToTable("sprites");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.PokemonId).HasColumnName("pokemonid");
                entity.Property(e => e.Front_Default).HasColumnName("front_default").HasMaxLength(255);
                entity.Property(e => e.Front_Female).HasColumnName("front_female").HasMaxLength(255);
                entity.Property(e => e.Front_Shiny).HasColumnName("front_shiny").HasMaxLength(255);
                entity.Property(e => e.Front_Shiny_Female).HasColumnName("front_shiny_female").HasMaxLength(255);
                entity.Property(e => e.Back_Default).HasColumnName("back_default").HasMaxLength(255);
                entity.Property(e => e.Back_Female).HasColumnName("back_female").HasMaxLength(255);
                entity.Property(e => e.Back_Shiny).HasColumnName("back_shiny").HasMaxLength(255);
                entity.Property(e => e.Back_Shiny_Female).HasColumnName("back_shiny_female").HasMaxLength(255);
                entity.HasOne<Pokemon>().WithOne(p => p.Sprites).HasForeignKey<Sprites>(s => s.PokemonId);
            });

            modelBuilder.Entity<Type>(entity => {
                entity.HasKey(e => e.Id).HasName("type_pkey");
                entity.ToTable("types");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.PokemonId).HasColumnName("pokemonid");
                entity.Property(e => e.Name).HasColumnName("name").HasMaxLength(50);
                entity.HasOne<Pokemon>().WithMany(p => p.Types).HasForeignKey(t => t.PokemonId);
            });

            modelBuilder.Entity<Ability>(entity => {
                entity.HasKey(e => e.Id).HasName("ability_pkey");
                entity.ToTable("abilities");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.PokemonId).HasColumnName("pokemonid");
                entity.Property(e => e.Name).HasColumnName("name").HasMaxLength(255);
                entity.HasOne<Pokemon>().WithMany(p => p.Abilities).HasForeignKey(a => a.PokemonId);
            });

            modelBuilder.Entity<GameIndex>(entity => {
                entity.HasKey(e => e.Id).HasName("game_index_pkey");
                entity.ToTable("game_indices");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.PokemonId).HasColumnName("pokemonid");
                entity.Property(e => e.Game_Index).HasColumnName("game_index");
                entity.Property(e => e.Name).HasColumnName("version_name").HasMaxLength(255);
                entity.HasOne<Pokemon>().WithMany(p => p.GameIndices).HasForeignKey(g => g.PokemonId);
            });
        }
    }
}