import { useState, useEffect } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Button,
    ModalCloseButton,
    Text,
    Select,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Textarea,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from '@chakra-ui/react'
import {
    AddIcon,
    EditIcon
} from '@chakra-ui/icons'
import { axiosPost, axiosPut } from '../utils/axios'


const TaskForm = ({ updateData, updateInstance, task, tile }) => {
    const [title, setTitle] = useState(updateInstance ? task.title : '')
    const [order, setOrder] = useState(updateInstance ? task.order : 0)
    const [description, setDescription] = useState(updateInstance ? task.description : '')
    const [taskType, setTaskType] = useState(updateInstance ? task.taskType : '')
    const [formCompleted, setFormCompleted] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (task) {
            setTitle(task.title)
            setOrder(task.order)
            setDescription(task.description)
            setOrder(task.order)
            setTaskType(task.taskType)
        }
    }, [task])

    const submitForm = () => {
        if (updateInstance) {
            if (title && order && description && taskType) {
                setSubmitting(true)
                axiosPut('tasks/', {
                    "taskId": task.id,
                    "title": title,
                    "order": order,
                    "description": description,
                    "taskType": taskType
                })
                .then(() => updateData())
                .then(() => setSubmitting(false))
                .then(() => onClose())
            } else {
                setFormCompleted(true)
            }
        } else {
            if (title && order && description && taskType) {   
                setSubmitting(true)     
                axiosPost('tasks/', {
                    "tileId": tile.id,
                    "title": title,
                    "order": order,
                    "description": description,
                    "taskType": taskType
                })
                .then(() => updateData())
                .then(() => setSubmitting(false))
                .then(() => onClose())
            } else {
                setFormCompleted(true)
            }
        }
    }

    return (
        <div>
            <Button onClick={onOpen} size="sm" rightIcon={updateInstance ? <EditIcon /> : <AddIcon />}>
                {updateInstance ? 'Edit Task' : 'Add Task'}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>{updateInstance ? 'Edit Task' : 'Add a new task'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>  

                    <FormControl isRequired isInvalid={formCompleted ? (title ? false : true) : false}>
                        <FormLabel>Task Title</FormLabel>
                        <Input 
                            value={title}
                            placeholder="Title" 
                            onChange={e => setTitle(e.target.value)}
                        />
                        <FormErrorMessage>Field Required</FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={formCompleted ? (description ? false : true) : false}>
                        <FormLabel>Task Description</FormLabel>
                        <Textarea 
                            placeholder="Description" 
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <FormErrorMessage>Field Required</FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={formCompleted ? (order ? false : true) : false}>
                        <FormLabel>Task Order</FormLabel>
                    <NumberInput
                        value={order}
                        onChange={value => setOrder(value)}
                        step={1}
                    >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>Field Required</FormErrorMessage>
                    </FormControl>

                    <Text mt={6}><b>Select a status</b></Text>
                    <FormControl isInvalid={formCompleted ? (taskType ? false : true) : false} isRequired>
                    <Select
                        bg="white"
                        as="select"
                        onChange={e => {setTaskType(e.target.value)}}
                        maxWidth="300px"
                        placeholder="Select a task type"
                        value={taskType}
                    >
                            <option value="Survey">Survey</option>
                            <option value="Discussion">Discussion</option>
                            <option value="Diary">Diary</option>
                    </Select> 
                    <FormErrorMessage>Field Required</FormErrorMessage>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button 
                        isLoading={submitting}
                        colorScheme="blue" 
                        mr={3} 
                        onClick={() => submitForm()}
                    >
                        {updateInstance ? 'Update Task' : 'Add Task'}
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default TaskForm
