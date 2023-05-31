// import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';
// import { ThemeProvider } from 'react-jss';
// import { useFullscreen } from 'react-use';
// import { TourProvider } from '@reactour/tour';
// import ThemeContext from '../contexts/themeContext';
// import Wrapper from '../layout/Wrapper/Wrapper';
// import Portal from '../layout/Portal/Portal';
// import { Toast, ToastContainer } from '../components/bootstrap/Toasts';
// import useDarkMode from '../hooks/useDarkMode';
// import COLORS from '../common/data/enumColors';
// import { getOS } from '../helpers/helpers';
// import steps, { styles } from '../steps';
// import AsideRoutes from '../layout/Aside/AsideRoutes';

// 🌌 React
import { useState, useMemo, useEffect } from "react";

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
