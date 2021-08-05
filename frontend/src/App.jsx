import Tiles from './components/Tiles'
import Nav from './components/Nav'
import { Container } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { axiosGet } from './utils/axios'
import { Center, Spinner } from '@chakra-ui/react'

const App = () => {
  const [tiles, setTiles] = useState([])
  const [tileFilter, setTileFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axiosGet('tiles')
    .then(res => setTiles(res.data))
    .then(() => setLoading(false))
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
            {!loading ?
            <Tiles tileFilter={tileFilter} tiles={tiles} updateData={updateData} />
            :
            <Center h="90vh"><Spinner size="xl" /></Center> 
            }
        </Container>
      </div>
  );
}

export default App;
