import './App.css';
import { Routes, Route, Link } from "react-router-dom"
import Pokedex from './pokedex';
import Details from './details';
import RandomPokedex from './randomPokedex';

function App() {
  return (
    <div className='background'>
      <div className="app-container">
        <h1>Welcome to Prof. Oak's Pokedex</h1>
        <p className='disclaimer'>*all information consolidated from hundreds of unpaid 10-year-olds*</p>
        <div className="buttons">
          <button onClick={() => window.location.reload()}>
            <Link to="/pokedex">to pokedex</Link>
          </button>
          <button onClick={() => window.location.reload()}>
            <Link to="/randomPokedex">Surprise Me!</Link>
          </button>
        </div>

        <div className='card'>
        <Routes>
          <Route path="/" element={<h1>hello world</h1>} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/randomPokedex" element={<RandomPokedex />} />
        </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;
