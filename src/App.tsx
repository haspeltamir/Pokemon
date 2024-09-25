// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ChakraProvider, Container } from '@chakra-ui/react';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import NavBar from './components/NavBar';

function App() {
  return (
    // <ChakraProvider>
    <>
      <Router>
        <NavBar />
        {/* <Container maxW="container.xl" py={5}> */}
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
        {/* </Container> */}
      </Router>
    </>
    // </ChakraProvider>
  );
}

export default App;
