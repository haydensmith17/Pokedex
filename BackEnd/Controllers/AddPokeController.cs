using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using pokedex.BackEnd.Models;
using pokedex.BackEnd.Services;

namespace pokedex.BackEnd.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AddPokeController : ControllerBase
    {
        private readonly AddPokeService _addPokeService;
        public AddPokeController(AddPokeService addPokeService)
        {
            _addPokeService = addPokeService;
        }

        [HttpPost("new")]
        public IActionResult AddPoke([FromBody] Pokemon pokemon)
        {
            _addPokeService.AddPoke(pokemon);
            return Ok("Ok");
        }
    }
}