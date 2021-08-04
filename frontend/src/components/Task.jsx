import TaskForm from './TaskForm'
import { 
    Box,
    UnorderedList,
    ListItem,
    Heading,
    Text,
    Button
} from '@chakra-ui/react'
import {
    DeleteIcon
} from '@chakra-ui/icons'
import { axiosDelete } from '../utils/axios'

const Task = ({ task, updateData, resetActiveTask }) => {

    const deleteTile = () => {
        axiosDelete('tasks/', {
            "taskId": task.id
        })
        .then(() => updateData())
        .then(() => resetActiveTask())
    }

    return (
        <div>
            {task ?
            <Box>
                <Heading>{task.title}</Heading>
                <Text>{task.description}</Text>
                <UnorderedList my={2}>
                    <ListItem><small>Task ID: {task.id}</small></ListItem>
                    <ListItem><small>Task Type: {task.task_type}</small></ListItem>
                    <ListItem><small>Task Order: {task.order}</small></ListItem>
                </UnorderedList>
                    <TaskForm updateInstance task={task} updateData={updateData} />
                    <Button mt={2} size="sm" rightIcon={<DeleteIcon />} onClick={() => deleteTile()} display="block">
                        Delete Task
                    </Button>
            </Box>
            :
            ''
            }
        </div>
    )
}

export default Task
