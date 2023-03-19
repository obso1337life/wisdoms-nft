import React, { useState, useEffect } from 'react'

import Dash from './Dash';
import Info from './Info';
import Visual from './Visual';

import {
    extrapolateAndReturnValuesFromString,
    generateAndReturnWisdomVariables
} from './WisdomUtils';

import './App.css';

// set the base values for the wisdom tokens, these will be affected by modifier values (which are created from the wisdom hash)
const baseWisdomModifiers = {
    scale: 0.5,
    scale_speed: 0.1,
    scale_offset: 0.05,
    float_speed: 1,
    float_rotation_intensity: 1,
    float_intensity: 0.5,
    float_range_start: -1,
    float_range_end: 1,
    particle_speed: 0.0001
};

function App() {
    const [id, setId] = useState('yeyeye1000');
    // particles count
    const [value, setValue] = useState(50);
    // name
    const [name, setName] = useState('Chev Chelios');
    const [perc1, setPerc1] = useState(null);
    const [perc2, setPerc2] = useState(null);
    const [perc3, setPerc3] = useState(null);
    const [perc4, setPerc4] = useState(null);
    const [r1, setR1] = useState(null);
    const [g1, setG1] = useState(null);
    const [b1, setB1] = useState(null);
    const [a1, setA1] = useState(null);
    const [r2, setR2] = useState(null);
    const [g2, setG2] = useState(null);
    const [b2, setB2] = useState(null);

    const [wisdomValues, setWisdomValues] = useState(null);
    const [modifiers, setModifiers] = useState(null);

    const [baseModifiers, setBaseModifiers] = useState({ ...baseWisdomModifiers });

    useEffect(() => {

        const generatedValues = extrapolateAndReturnValuesFromString(id);
        setWisdomValues(generatedValues);

        const valuesToSet = generateAndReturnWisdomVariables(id, generatedValues);

        setPerc1(valuesToSet.perc1);
        setPerc2(valuesToSet.perc2);
        setPerc3(valuesToSet.perc3);

        setR1(valuesToSet.r1);
        setG1(valuesToSet.g1);
        setB1(valuesToSet.b1);
        setA1(valuesToSet.a1);
        setR2(valuesToSet.r2);
        setG2(valuesToSet.g2);
        setB2(valuesToSet.b2);

        setModifiers(valuesToSet.mods);
    }, [id]);

    return (
        <div
            id="app"
            style={{
                background: `linear-gradient(${perc1}deg, rgba(${r1}, ${g1}, ${b1}, 1) 7%, rgba(${r2}, ${g2}, ${b2}, ${a1}) 25%, rgba(${r1}, ${g2}, ${b2}, 1) 64%)`
            }}
        >
            <Dash
                id={id}
                setId={setId}
                name={name}
                setName={setName}
                value={value}
                setValue={setValue}
                baseModifiers={baseModifiers}
                setBaseModifiers={setBaseModifiers}
                baseWisdomModifiers={{ ...baseWisdomModifiers }}
            />
            <Info
                id={id}
                perc1={perc1}
                r1={r1}
                r2={r2}
                g1={g1}
                g2={g2}
                b1={b1}
                b2={b2}
                a1={a1}
            />
            <div
                id="visual"
                style={{
                    background: `radial-gradient(circle, rgba(${r2}, ${g2}, ${b2}, 0.8) 15%, transparent 64%)`
                }}
            >
                <Visual
                    id={id}
                    value={value}
                    name={name}
                    perc1={perc1}
                    perc2={perc2}
                    perc3={perc3}
                    r1={r1}
                    r2={r2}
                    g1={g1}
                    g2={g2}
                    b1={b1}
                    b2={b2}
                    a1={a1}
                    // TODO: need to apply these values
                    modifiers={modifiers}
                    baseModifiers={baseModifiers}
                />
            </div>
        </div>
    );
}

export default App;
