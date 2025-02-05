import './App.css';
import { Routes, Route, Link, useLocation  } from "react-router-dom"
import MyPokedex from './pokedex';
import Details from './details';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

function App() {
  const location = useLocation();
  const pokemon1 = [
    {
      id: 1,
    name: "bulbasaur",
    moves: ["LV 1 tackle", "LV 1 growl", "LV 10 vine whip"],
    sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    types: ["grass", "poison"],
    baseStats: [
      "HP: 45",
      "Attack: 49",
      "Defense: 49",
      "Sp. Atk: 65",
      "Sp. Def: 65",
      "Speed: 45",
      "Total: 318"
    ],
    evoLevel: ["Level 16 --> Ivysaur"],
    abilities: ["overgrow", "chlorophyll"],
    games: ["red", "blue", "yellow", "gold", "silver", "crystal"]
  }
]

  return (
    <div className='background'>
      <div className="app-container">
        <h1>Welcome to Prof. Oak's Pokédex</h1>
        <p className='disclaimer'>*all information consolidated from hundreds of unpaid 10-year-old kids*</p>
        <div className="back-button">
        {location.pathname.startsWith('/details') && (
            <Link to="/" >
              <button className='backButtonElement'>
                <KeyboardBackspaceIcon className='icon' style={{ color: 'red', fontSize: '30px',   }} />
              </button>
            </Link>
          )}
        </div>
        <div className='card'>
          <Routes>
            <Route path="/" element={<MyPokedex pokemon1={pokemon1} />} />
            <Route path="/details/:id" element={<Details pokemon1={pokemon1}/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
