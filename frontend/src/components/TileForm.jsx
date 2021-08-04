import { useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
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
    FormErrorMessage
} from '@chakra-ui/react'
import {
    AddIcon,
    EditIcon
} from '@chakra-ui/icons'
import { axiosPost, axiosPut } from '../utils/axios'


const TileForm = ({ updateData, updateInstance, tile }) => {
    const [date, setDate] = useState(updateInstance ? Date.parse(tile.launch_date) : Date.parse(new Date()))
    const [status, setStatus] = useState(updateInstance ? tile.status : undefined)
    const [formCompleted, setFormCompleted] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [submitting, setSubmitting] = useState(false)

    const submitForm = () => {
        if (updateInstance) {
            if (date && status) {
                setSubmitting(true)
                axiosPut('tiles/', {
                    "tileId": tile.id,
                    "date": date,
                    "status": status
                })
                .then(() => updateData())
                .then(() => setSubmitting(false))
                .then(() => onClose())
            } else {
                setFormCompleted(true)
            }
        } else {
            if (date && status) {   
                setSubmitting(true)     
                axiosPost('tiles/', {
                    "date": date,
                    "status": status
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
                {updateInstance ? 'Edit Tile' : 'Add Tile'}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>{updateInstance ? 'Edit Tile' : 'Add new tile'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text><b>Select a date</b></Text>
                    <DatePicker 
                        dateFormat="dd/MM/yyyy"
                        selected={date} 
                        onChange={value => setDate(Date.parse(value))} 
                        style={{ "backgroundColor": "red" }}
                    />    
                    <Text mt={6}><b>Select a status</b></Text>
                    <FormControl isInvalid={formCompleted ? (status ? false : true) : false} isRequired>
                    <Select
                        bg="white"
                        as="select"
                        onChange={e => {setStatus(e.target.value)}}
                        maxWidth="300px"
                        placeholder="Select a status"
                        defaultValue={updateInstance && status}
                    >
                            <option value="Archived">Archived</option>
                            <option value="Pending">Pending</option>
                            <option value="Live">Live</option>
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
                        {updateInstance ? 'Update Tile' : 'Add Tile'}
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            
        </div>
    )
}

export default TileForm
