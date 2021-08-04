import React from 'react'
import TileFilter from './TileFilter'
import TileForm from './TileForm'
import {
    Box,
    Flex
} from '@chakra-ui/react'


const Nav = ({ updateFilter, updateData }) => {
    return (
        <Box p={4} mb={4} bg="black">
            <Flex justify="space-between" alignItems="center">
                <TileFilter updateFilter={updateFilter} />
                <TileForm updateData={updateData}/>
            </Flex>
        </Box>
    )
}

export default Nav
