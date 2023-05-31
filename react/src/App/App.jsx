// 🌌 React
import React, { useState, useMemo } from "react";

// 🧱 Components
import Table from '../components/Table';

// 📊 Data
import dummyData from '../data/dummyData';
import { DataContext } from '../contexts/dataContext'

const App = () => {
    const [people, setPeople] = useState(JSON.parse(localStorage.getItem("manageo_users_data")) || dummyData);
    const data = useMemo( () => ({ people, setPeople }), [people, setPeople] );

	return (
        <DataContext.Provider value={data}>
            <div className='app'>
                <div className="wrapper">
                    <div className="content">
                        <Table data={data} />
                    </div>
                </div>
            </div>
        </DataContext.Provider>
	);
};

export default App;
