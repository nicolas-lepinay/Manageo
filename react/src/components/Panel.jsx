// 🌌 React
import { useState, useEffect, useContext } from 'react'

// 🅱️ Bootstrap components
import OffCanvas, {
    OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle 
} from './bootstrap/OffCanvas';
import Button from './bootstrap/Button';
import Icon from './icon/Icon';
import Input from './bootstrap/forms/Input';
import InputGroup, { InputGroupText } from './bootstrap/forms/InputGroup';
import FormGroup from './bootstrap/forms/FormGroup';

// 📑 Formik
import { useFormik } from 'formik';

// 🦸‍♀️ Data Context :
import { DataContext } from '../contexts/dataContext';

const Panel = ( { item, togglePanel, setTogglePanel }) => {

    const { people, setPeople } = useContext(DataContext);

    const formik = useFormik({
        initialValues: {
            id: '',
            first_name: '',
            last_name: '',
            email_address: '',
        },
        onSubmit: (values, { resetForm }) => {
            // Return if no values :
            if(!values?.first_name || !values?.last_name || !values?.email_address)
                return

            if(!values.id)
                values.id = Math.max(...people.map(person => Number(person.id))) + 1; // New id = largest id + 1
            
            item ? handleUpdate(values) : handlePost(values);

            setTogglePanel(false);
            resetForm({ values: ''});
        }
    });

    const handleUpdate = async (values) => {
        const updatedPeople = people.map(person => {
            if(person.id === values.id)
                return values
            else
                return person;
        })

        setPeople(updatedPeople);
        localStorage.setItem('manageo_users_data', JSON.stringify(updatedPeople));
    }

    const handleDelete = async (id) => {
        const updatedPeople = people.filter(person => person.id !== id)
        setPeople(updatedPeople);
        localStorage.setItem('manageo_users_data', JSON.stringify(updatedPeople));
    }

    const handlePost = async (values) => {
        const updatedPeople = [...people, values];
        setPeople(updatedPeople);
        localStorage.setItem('manageo_users_data', JSON.stringify(updatedPeople));
    }

    useEffect(() => {
        if(item) {
            formik.setValues({
                id: item?.id,
                first_name: item?.first_name,
                last_name: item?.last_name,
                email_address: item?.email_address,
            });
        } else {
            formik.resetForm( { values: ''})
        }
        return () => {};
    }, [item, togglePanel]);
    
    return (
        <OffCanvas
            setOpen={(status) => { setTogglePanel(status) }}
            isOpen={togglePanel}
            titleId='canvas-title'>
        <OffCanvasHeader
            setOpen={(status) => { setTogglePanel(status) }}
            className='p-4'>
            <OffCanvasTitle id='canvas-title' tag='h3'>
                {item ? `${item?.first_name} ${item?.last_name}` : 'Ajouter une personne'}
            </OffCanvasTitle>
        </OffCanvasHeader>
        <OffCanvasBody 
            tag='form' 
            onSubmit={formik.handleSubmit} 
            className='p-4'
        >
                <div className='row g-4'>
                    <FormGroup
                        className='col-md-6'
                        id='first_name'
                        label='Prénom'>
                        <Input
                            placeholder='Prénom'
                            onChange={formik.handleChange}
                            value={formik.values.first_name}
                        />
                    </FormGroup>

                    <FormGroup
                        className='col-md-6'
                        id='last_name'
                        label='Nom de famille'>
                        <Input
                            placeholder='Nom de famille'
                            onChange={formik.handleChange}
                            value={formik.values.last_name}
                        />
                    </FormGroup>
                </div>

                <div className="mt-5">
                    <FormGroup
                        id='email_address'
                        label='Adresse e-mail'>
                        <Input
                            placeholder='Adresse e-mail'
                            onChange={formik.handleChange}
                            value={formik.values.email_address}
                        />
                    </FormGroup>
                </div>

                <div className='d-flex align-items-center justify-content-between py-4 my-5'>
                    <div>
                        <Button
                            color='info'
                            icon='Save'
                            type='submit'
                            disabled={!formik.values.first_name 
                                || !formik.values.last_name 
                                || !formik.values.email_address
                            }
                        >
                            Confirmer
                        </Button>
                    </div>
                    {item && <div>
                        <Button
                            color='danger'
                            icon='Delete'
                            isOutline
                            onClick={ () => { handleDelete(item?.id); setTogglePanel(false) } }
                        >
                            Supprimer
                        </Button>
                    </div>}
                </div>
        </OffCanvasBody>
    </OffCanvas>
  )
}

export default Panel