import { useEffect, useState } from 'react'
import Task from './Task'
import TileForm from './TileForm'
import TaskForm from './TaskForm'
import { axiosDelete, axiosGet } from '../utils/axios'
import { 
    Box,
    Text,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Flex,
    Badge,
    Button
} from '@chakra-ui/react'
import {
    DeleteIcon
} from '@chakra-ui/icons'


const Tile = ({ tile, updateData }) => {
    const [tasks, setTasks] = useState([])
    const [tasksLength, setTasksLength] = useState()
    const [activeTask, setActiveTask] = useState(0)
    const tileDate = new Date(tile.launch_date)

    const deleteTile = () => {
        axiosDelete('tiles/', {
            "tileId": tile.id
        })
        .then(() => updateData())
    }

    useEffect(() => {
        axiosGet(`tasks/?tile=${tile.id}`)
        .then(res => {
            setTasks(res.data.sort((a, b) => parseInt(a.order) > parseInt(b.order) ? 1 : -1));
            setTasksLength(res.data.length - 1);
        })
    }, [tile])

    const resetActiveTask = () => {
        setActiveTask(0)
    }
    
    return (
        <Box boxShadow="xl" p={4} h="450px">
            <Box textAlign="end">
                <TaskForm updateData={updateData} tile={tile} />
            </Box>
            <Box h="280px">
                <Task task={tasks[activeTask]} updateData={updateData} resetActiveTask={resetActiveTask} />
            </Box>
            {tasksLength > 0 ?
            <Slider 
                defaultValue={activeTask} 
                min={0} 
                max={tasksLength} 
                step={1} 
                onChange={(value => setActiveTask(value))}
            >
            <SliderTrack bg="red.100">
                <Box position="relative" right={10} />
                <SliderFilledTrack bg="tomato" />
            </SliderTrack>
            <SliderThumb boxSize={6} />
            </Slider>
            : 
            ''
            }
            <Flex justify='space-between'>
                <Text fontSize='sm'>{tileDate.toLocaleDateString("en-UK")}</Text>
                <Badge 
                    colorScheme={tile.status === "Live" ? "green" : (tile.status === "Pending" ? "yellow" : "red")}
                >
                    {tile.status}
                </Badge>
            </Flex>
            <Flex justify="space-between" mt={4}>
                <TileForm updateInstance tile={tile} updateData={updateData} />
                <Button size="sm" rightIcon={<DeleteIcon />} onClick={() => deleteTile()}>
                    Delete Tile
                </Button>
            </Flex>
        </Box>
    )
}

export default Tile
