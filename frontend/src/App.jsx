import Tiles from './components/Tiles'
import Nav from './components/Nav'
import { Container } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { axiosGet } from './utils/axios'

const App = () => {
  const [tiles, setTiles] = useState([])
  const [tileFilter, setTileFilter] = useState('all')

  useEffect(() => {
    axiosGet('tiles').then(res => setTiles(res.data))
  }, [])

  const updateFilter = (filterType) => {
    setTileFilter(filterType)
  }

  const updateData = () => {
    axiosGet('tiles').then(res => setTiles(res.data))
}

  return (
      <div className="App">
        <Nav updateFilter={updateFilter} updateData={updateData} />
        <Container maxW="6xl">
            <Tiles tileFilter={tileFilter} tiles={tiles} updateData={updateData} />
        </Container>
      </div>
  );
}

export default App;
