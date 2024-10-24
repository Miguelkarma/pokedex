import React, { useEffect, useState } from "react";
import axios from "axios";
import './Style.css';

const Pokemon = () => {
  const [nameInput, setNameInput] = useState('');  
  const [searchName, setSearchName] = useState(''); 
  const [name, setName] = useState('');
  const [moves, setMoves] = useState(0);
  const [types, setTypes] = useState([]);
  const [stats, setStats] = useState([]);
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    async function getData() {
      if (searchName) {
        try {
          const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchName.toLowerCase()}`);
          setName(res.data.name);
          setMoves(res.data.moves.length);
          setTypes(res.data.types.map(typeInfo => typeInfo.type.name));  
          setStats(res.data.stats.map(statInfo => ({
            name: statInfo.stat.name,  
            baseStat: statInfo.base_stat 
          })));
          setShowModal(false); 
        } catch (error) {
          console.error("Error fetching data:", error);
          setName(''); 
          setMoves(0); 
          setTypes([]); 
          setStats([]); 
          setShowModal(true); 
        }
      }
    }
    getData();
  }, [searchName]);

  const handleSearch = () => {
    setSearchName(nameInput.trim());
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  return (
    <>
    
      <div className="content img">
        <section className='sabo'>
          <h1>
            <span>Pokédex : {searchName}</span>
          </h1>
        
          <h2>
            Pokémon : <span>{name}</span> 
          </h2>
          <h2>
            Moves: <span>{moves}</span> 
          </h2>

          <h2>
            Type : <span>{types.join(', ')}</span>  
          </h2>

          <h2>Stats :</h2> 
          {stats.map((stat, index) => (
            <span className="stat" key={index}>{stat.name}: {stat.baseStat + '|'}</span>  
          ))}
        </section>
        <input
          className="input"
          maxLength={10}
          type="text"
          placeholder="Enter Pokémon name or #"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)} 
        />
        <button className="btn" onClick={handleSearch}>
          Submit
        </button>
      </div>

      {showModal && ( 
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <p>Unknown Pokémon. Please check the name and #, try again.</p>
          </div>
        </div>
      )}

      <footer className="footer">
        Copyright©Miguelkarma
      </footer>
    </>
  );
};

export default Pokemon;
