using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using pokedex;
using pokedex.BackEnd.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DbSource>(options =>
{
    options.UseNpgsql("Server=localhost;Port=5432;Database=root;User Id=root;Password=secret;");
});

builder.Services.AddCors(opt=>
{
opt.AddPolicy("CorsPolicy",policy =>
{
policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
});
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddTransient<AddPokeService>();
builder.Services.AddControllers().AddJsonOptions(config =>
{
   config.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    config.JsonSerializerOptions.AllowTrailingCommas = true;
    config.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");
app.UseRouting();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
