import { ChangeEvent, useEffect, useState } from 'react';
import { Input, Box, Button, List, ListItem, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

interface Pokemon {
    name: string;
    url: string;
}

const PokemonList = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        async function fetchPokemon() {
            // const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0.');
            setPokemons(response.data.results);
        }
        fetchPokemon();
    }, []);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };


    const handleSort = () => {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        setPokemons((prevPokemons) =>
            [...prevPokemons].sort((a, b) =>
                sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
            )
        );
    };

    const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box maxW={['95%', '80%', '70%', '60%']} mx="auto" mt={4}>
            <Input
                placeholder="Search Pokémon"
                value={searchTerm}
                onChange={handleSearchChange}
                mb={4}
                size={['sm', 'md', 'lg', 'lg']}
            />
            <Button onClick={handleSort} mb={4} size={['sm', 'md', 'lg', 'lg']}>
                Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
            </Button>
            <List spacing={3}>
                {filteredPokemons.map((pokemon) => (
                    <ListItem key={pokemon.name} _hover={{ bg: 'gray.100' }} fontSize={['sm', 'md', 'lg', 'xl']}>
                        <Link as={RouterLink} to={`/pokemon/${pokemon.name}`}>
                            {pokemon.name}
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
export default PokemonList;
