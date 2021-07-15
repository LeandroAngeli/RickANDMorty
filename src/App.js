import React, { useState, useEffect } from 'react';
import Header from './components/ui/header'
import Card from './components/Card/Card';
import Spinner from './components/ui/Spinner';
import { getCharacter, getAllCharacter } from './Services/character';
import './App.css';

function App() {
  const [characterData, setCharacterData] = useState([])
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialURL = 'https://rickandmortyapi.com/api/character/'
  

  useEffect(() => {
    async function fetchData() {
    let data = await getAllCharacter(initialURL)
    setNextUrl(data.info.next);
    setPrevUrl(data.info.prev);
    await loadCharacter(data.results);
    setLoading(false);
    }
  fetchData();
     
    
  }, [])

  const next = async () => {
    setLoading(true);
    let data = await getAllCharacter(nextUrl);
    await loadCharacter(data.results);
    setNextUrl(data.info.next);
    setPrevUrl(data.info.prev);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllCharacter(prevUrl);
    await loadCharacter(data.results);
    setNextUrl(data.info.next);
    setPrevUrl(data.info.prev);
    setLoading(false);
  }

  const loadCharacter = async (data) => {
    let _characterData = await Promise.all(data.map(async character => {
      let characterRecord = await getCharacter(character)
      return characterRecord
    }))
    setCharacterData(_characterData);
  }

  return (
    <>
      <Header />

      <div>
        {loading ? <h1 style={{ textAlign: 'center' }}><Spinner/> </h1> : (
          <>
            <div className="btn">
              <button onClick={prev}>Prev</button>
              <button onClick={next}>Next</button>
            </div>
            
            

            <div className="grid-container">
              {characterData.map((character, i) => {
                return <Card key={i} character={character} />
              })}
            </div>

            <div className="btn">
              <button onClick={prev}>Prev</button>
              <button onClick={next}>Next</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;