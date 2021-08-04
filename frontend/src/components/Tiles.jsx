import { useEffect, useState } from 'react'
import TileCard from './TileCard'
import { SimpleGrid } from '@chakra-ui/layout'

const Tiles = ({ tileFilter, tiles, updateData }) => {
    const [filteredTiles, setFilteredTiles] = useState([])

    useEffect(() => {
        if (tileFilter === 'all') {
            setFilteredTiles(tiles)
        } else {
            setFilteredTiles([])
            for (const tile of tiles) {
                if (tile.status === tileFilter) {
                    setFilteredTiles(prevState => [...prevState, tile])
                }
            }
        }
    }, [tileFilter, tiles])

    return (
        <SimpleGrid columns={[1, 1, 2, 2, 3]} spacing={10}>
        {filteredTiles && filteredTiles.map(tile => (
            <TileCard key={tile.id} tile={tile} updateData={updateData} />
        ))}
        </SimpleGrid>
    )
}

export default Tiles
