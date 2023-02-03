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
};

function App() {

    const [id, setId] = useState('obso1337 rul3s!');
    // texture
    const [type, setType] = useState('01');
    // particles count
    const [value, setValue] = useState(50);
    // name
    const [name, setName] = useState('Chev Chelios');
    // base object
    const [object, setObject] = useState('ring');

    // const [intVal, setIntVal] = useState(null)
    // const [charString, setCharString] = useState(null)
    // const [charVal, setCharVal] = useState(null)
    // const [long, setLong] = useState(null)
    // const [short, setShort] = useState(null)
    // const [longInt, setLongInt] = useState(null)
    // const [shortInt, setShortInt] = useState(null)
    // const [high, setHigh] = useState(null)
    // const [low, setLow] = useState(null)
    const [perc1, setPerc1] = useState(null);
    const [perc2, setPerc2] = useState(null);
    // const [perc3, setPerc3] = useState(null)
    // const [perc4, setPerc4] = useState(null)
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

    // const makeRGBVal = (val1, val2) => {
    //     let big = val1 >= val2 ? val1 : val2;
    //     let small = big === val1 ? val2 : val1;
    //     let perc = (small / big);
    //     let val = 255 * perc;
    //     return Math.floor(val);
    // };

    // useEffect(() => {
    //     const int = setInterval(() => {
    //         setValue(value => value + 10);
    //     }, 60000);
    //     return () => clearInterval(int);
    // }, []);

    useEffect(() => {

        const generatedValues = extrapolateAndReturnValuesFromString(id);
        // console.log('generatedValues', generatedValues);
        setWisdomValues(generatedValues);

        const valuesToSet = generateAndReturnWisdomVariables(id, generatedValues);

        // console.log('valuesToSet', valuesToSet);

        setPerc1(valuesToSet.perc1);
        setPerc2(valuesToSet.perc2);
        
        setR1(valuesToSet.r1);
        setG1(valuesToSet.g1);
        setB1(valuesToSet.b1);
        setA1(valuesToSet.a1);
        setR2(valuesToSet.r2);
        setG2(valuesToSet.g2);
        setB2(valuesToSet.b2);

        setModifiers(valuesToSet.mods);

        // let iV = id.replace(/\D/g, '')
        // let cS = id.replace(/\d/g, '')
        // setIntVal(iV)
        // setCharString(cS)

        // let cV = 0;
        // for (let i = 0; i < cS.length; i++) {
        //     cV += cS.charCodeAt(i);
        // };
        // cV += '';
        // setCharVal(cV)

        // let l = iV.length >= cV.length ? iV : cV
        // let s = l === iV ? cV : iV
        // l = l.slice(0, s.length)
        // setLong(l)
        // setShort(s)

        // let lI = parseInt(l)
        // let sI = parseInt(s)
        // setLongInt(lI)
        // setShortInt(sI)

        // let h = lI >= sI ? lI : sI;
        // let lo = h === lI ? sI : lI;
        // setHigh(h)
        // setLow(lo)

        // setPerc1(parseInt(s.slice(0, 2)) / 2)
        // setPerc2(parseInt(l.slice(0, 2)) / 2)
        // setR1(makeRGBVal(parseInt(s.slice(0, 1)), parseInt(l.slice(l.length - 2, l.length - 1))))
        // setG1(makeRGBVal(parseInt(s.slice(1, 2)), parseInt(l.slice(l.length - 1, l.length))))
        // setB1(makeRGBVal(parseInt(l.slice(0, 1)), parseInt(s.slice(1, 2))))
        // setA1(1 / parseInt(s.slice(0, 1)))
        // setPerc3(parseInt(l.slice(0, 2)))
        // setPerc4(parseInt(s.slice(0, 2)))
        // setR2(makeRGBVal(parseInt(l.slice(1, 2)), parseInt(s.slice(s.length - 1, s.length))))
        // setG2(makeRGBVal(parseInt(s.slice(s.length - 2, s.length - 1)), parseInt(l.slice(l.length - 2, l.length - 1))))
        // setB2(makeRGBVal(parseInt(l.slice(0, 1)), parseInt(s.slice(0, 1))))

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
                type={type}
                setType={setType}
                name={name}
                setName={setName}
                object={object}
                setObject={setObject}
                value={value}
                setValue={setValue}
                baseModifiers={baseModifiers}
                setBaseModifiers={setBaseModifiers}
                baseWisdomModifiers={{ ...baseWisdomModifiers }}
            />
            <Info
                id={id}
                type={type}
                perc1={perc1}
                r1={r1}
                r2={r2}
                g1={g1}
                g2={g2}
                b1={b1}
                b2={b2}
                a1={a1}
            />
            <Visual
                id={id}
                type={type}
                value={value}
                name={name}
                object={object}
                perc1={perc1}
                perc2={perc2}
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
    );
}

export default App;
