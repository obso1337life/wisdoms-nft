import React, { useState, useEffect } from 'react'

import Dash from './Dash';
import Visual from './Visual';
import './App.css';

function App() {

    const [id, setId] = useState('DFDFDAHSABBANPNs2WH5Gw9NZ34598aW20c0dfhhj475nnf')
    const [type, setType] = useState('01')

    return (
        <>
            <Dash
                setId={setId}
                setType={setType}
            />
            <Visual 
                id={id}
                type={type}
            />
        </>
    );
}

export default App;
