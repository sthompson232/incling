import { 
    Select
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'


const TileFilter = ({ updateFilter }) => {
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        updateFilter(filter)
    }, [filter, updateFilter])

    return (
            <Select
                bg="white"
                as="select"
                onChange={e => {setFilter(e.target.value)}}
                maxWidth="300px"
            >
                <option value="all">Filter Tile by status</option>
                <option value="Archived">Archived</option>
                <option value="Pending">Pending</option>
                <option value="Live">Live</option>
            </Select>
    )
}

export default TileFilter
