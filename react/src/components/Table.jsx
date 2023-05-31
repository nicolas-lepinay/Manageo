// 🌌 React
import { useState, useEffect } from "react";

// 🅱️ Bootstrap components
import Card, { CardHeader, CardLabel, CardTitle, CardActions, CardBody } from './bootstrap/Card';
import Button from './bootstrap/Button';
import Icon from './icon/Icon';

// 🧱 Components
import Panel from './Panel';

const Table = ({ data: { people, setPeople } }) => {

    const [selectedPerson, setSelectedPerson] = useState([]);
    const [togglePanel, setTogglePanel] = useState(false);

    useEffect(() => {
        if(!togglePanel) 
            setSelectedPerson(null);
        
        return () => {};
    }, [selectedPerson, togglePanel]);

    return (
        <div className="container col-xl-7 my-5">
            <Card className='shadow-3d-info'>
                <CardHeader borderSize={1}>
                    <CardLabel icon='People'>
                        <CardTitle tag='h4' className='h5 mx-2'>
                            Personnes
                        </CardTitle>
                    </CardLabel>
                    <CardActions>
                        <Button
                            color='info'
                            icon='Add'
                            isLight
                            onClick={() => { setTogglePanel(true) }}
                        >
                            Nouveau
                        </Button>
                    </CardActions>
                </CardHeader>
                <CardBody>
                    <div className='table-responsive'>
                        <table className='table table-modern table-hover b-0'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>ID</th>
                                    <th
                                        //onClick={() => requestSort('date')}
                                        className='cursor-pointer text-decoration-underline'>
                                        Nom{' '}
                                        <Icon
                                            size='lg'
                                            icon='KeyboardArrowDown'
                                            />
                                    </th>
                                    <th>Prénom</th>
                                    <th>Adresse e-mail</th>
                                </tr>
                            </thead>

                            <tbody>
                            {people.map((item) => (
                                <tr key={`person-${item?.id}`}>
                                    <td className='align-top'>
                                        <Button
                                            color='light'
                                            icon='Edit'
                                            isLight
                                            onClick={() => {
                                                setSelectedPerson(item);
                                                setTogglePanel(true);
                                            }}
                                            //aria-label='Detailed information'
                                            />
                                        </td>
                                    <td className='align-top'>
                                        {item?.id}
                                    </td>

                                    <td className='align-top'>
                                        {item?.last_name}
                                    </td>

                                    <td className='align-top'>
                                        {item?.first_name}
                                    </td>

                                    <td className='align-top'>
                                        {item?.email_address}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>

            <Panel 
                item={selectedPerson}
                togglePanel={togglePanel}
                setTogglePanel={setTogglePanel}
            />
        </div>
    )
}

export default Table;