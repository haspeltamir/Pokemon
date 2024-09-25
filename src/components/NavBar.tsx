import { HStack, Text } from '@chakra-ui/react';
import { Fragment } from 'react';
import ChangeColorMode from './ChangeColorMode';




// const NavBar = (props: Props) => {
function NavBar() {
    return (
        <Fragment>
            <HStack justifyContent={"space-between"} p={10}
            >


                <Text fontSize="2xl">Pokedex</Text>

                <ChangeColorMode />

            </HStack>
        </Fragment>
    )
}

export default NavBar;