import './App.css';
import Navbar from './components/navbar'
import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ViewHandicrafts from "./components/pages/ViewHandicrafts";
import CreateNft from "./components/pages/creat-nft";
import ShowOwnedNfts from "./components/pages/owned-handicrafts";
import PersonalNftsThatAreListed from "./components/pages/personal-listed-nft";

function App() {
  return (
    <>
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<ViewHandicrafts/>} />
                <Route path="/create-nft" element={<CreateNft/>} />
                <Route path="/owned-handicrafts" element={<ShowOwnedNfts/>} />
                <Route path="/personal-listed-nft" element={<PersonalNftsThatAreListed/>} />
            </Routes>
        </Router>
    </>
  );
}

export default App;
