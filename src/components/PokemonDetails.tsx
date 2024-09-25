import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Text, Spinner, HStack, VStack, Heading } from '@chakra-ui/react';
import axios from 'axios';

interface PokemonDetailsData {
    name: string;
    sprites: {
        front_default: string;
        back_default: string;
        front_shiny: string;
        back_shiny: string;
    };
    types: { type: { name: string } }[];
    weight: number;
    height: number;
}

const PokemonDetails = () => {
    const { name } = useParams<{ name: string }>();
    const [pokemon, setPokemon] = useState<PokemonDetailsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPokemonDetails() {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            setPokemon(response.data);
            setLoading(false);
            console.log(response.data);
        }
        fetchPokemonDetails();
    }, [name]);

    if (loading) {
        return <Spinner />;
    }

    if (!pokemon) {
        return <Text>Pokémon not found.</Text>;
    }

    return (
        <Box textAlign="center" w={['90%', '80%', '70%', '60%']} mx="auto">
            <Heading fontSize={['2xl', '3xl', '4xl', '5xl']}>{pokemon.name}</Heading>
            <VStack spacing={[4, 6, 8]} my={[4, 6, 8]}>
                <HStack justify="center" mb={[4, 6, 8]}>
                    <Image
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        boxSize={['100px', '150px', '200px', '250px']}
                    />
                    <Image
                        src={pokemon.sprites.back_default}
                        alt={pokemon.name}
                        boxSize={['100px', '150px', '200px', '250px']}
                    />
                </HStack>
                <HStack>
                    <Image
                        src={pokemon.sprites.front_shiny}
                        alt={pokemon.name}
                        boxSize={['100px', '150px', '200px', '250px']}
                    />
                    <Image
                        src={pokemon.sprites.back_shiny}
                        alt={pokemon.name}
                        boxSize={['100px', '150px', '200px', '250px']}
                    />
                </HStack>
            </VStack>
            <Text fontSize={['lg', 'xl', '2xl', '3xl']}>
                Type: {pokemon.types.map((type) => type.type.name).join(', ')}
            </Text>

            <Box>
                <Text fontSize={['lg', 'xl', '2xl', '3xl']}>Weight: {pokemon.weight}</Text>
                <Text fontSize={['lg', 'xl', '2xl', '3xl']}>Height: {pokemon.height}</Text>

            </Box>
        </Box>
    );
};

export default PokemonDetails;
