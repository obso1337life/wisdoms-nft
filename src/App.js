import React, { useState, useEffect } from 'react'

import Dash from './Dash';
import Info from './Info';
import Visual from './Visual';
import './App.css';

function App() {

    const [id, setId] = useState('DFDFDAHSABBANPNs2WH5Gw9NZ34598aW20c0dfhhj475nnf')
    const [type, setType] = useState('01')

    const [intVal, setIntVal] = useState(null)
    const [charString, setCharString] = useState(null)
    const [charVal, setCharVal] = useState(null)
    const [long, setLong] = useState(null)
    const [short, setShort] = useState(null)
    const [longInt, setLongInt] = useState(null)
    const [shortInt, setShortInt] = useState(null)
    const [high, setHigh] = useState(null)
    const [low, setLow] = useState(null)
    const [perc1, setPerc1] = useState(null)
    const [perc2, setPerc2] = useState(null)
    const [perc3, setPerc3] = useState(null)
    const [perc4, setPerc4] = useState(null)
    const [a1, setA1] = useState(null)
    const [r1, setR1] = useState(null)
    const [r2, setR2] = useState(null)
    const [g1, setG1] = useState(null)
    const [g2, setG2] = useState(null)
    const [b1, setB1] = useState(null)
    const [b2, setB2] = useState(null)

    const makeRGBVal = (val1, val2) => {
        let big = val1 >= val2 ? val1 : val2;
        let small = big === val1 ? val2 : val1;
        let perc = (small / big);
        let val = 255 * perc;
        return val;
    };

    useEffect(() => {

        console.log('id');

        let iV = id.replace(/\D/g, '')
        let cS = id.replace(/\d/g, '')
        setIntVal(iV)
        setCharString(cS)

        let cV = 0;
        for (let i = 0; i < cS.length; i++) {
            cV += cS.charCodeAt(i);
        };
        cV += '';
        setCharVal(cV)

        let l = iV.length >= cV.length ? iV : cV
        let s = l === iV ? cV : iV
        l = l.slice(0, s.length)
        setLong(l)
        setShort(s)

        let lI = parseInt(l)
        let sI = parseInt(s)
        setLongInt(lI)
        setShortInt(sI)

        let h = lI >= sI ? lI : sI;
        let lo = h === lI ? sI : lI;
        setHigh(h)
        setLow(lo)

        setPerc1(parseInt(s.slice(0, 2)) / 2)
        setPerc2(parseInt(l.slice(0, 2)) / 2)
        setR1(makeRGBVal(parseInt(s.slice(0, 1)), parseInt(l.slice(l.length - 2, l.length - 1))))
        setG1(makeRGBVal(parseInt(s.slice(1, 2)), parseInt(l.slice(l.length - 1, l.length))))
        setB1(makeRGBVal(parseInt(l.slice(0, 1)), parseInt(s.slice(1, 2))))
        setA1(1 / parseInt(s.slice(0, 1)))
        setPerc3(parseInt(l.slice(0, 2)))
        setPerc4(parseInt(s.slice(0, 2)))
        setR2(makeRGBVal(parseInt(l.slice(1, 2)), parseInt(s.slice(s.length - 1, s.length))))
        setG2(makeRGBVal(parseInt(s.slice(s.length - 2, s.length - 1)), parseInt(l.slice(l.length - 2, l.length - 1))))
        setB2(makeRGBVal(parseInt(l.slice(0, 1)), parseInt(s.slice(0, 1))))

    }, [id])

    return (
        <div
            id="app"
            style={{
                // backgroundColor: 'blue',
                // background: `radial-gradient(ellipse at ${perc1}% ${perc2}%, rgba(${r1}, ${g1}, ${b1}, ${a1}, red))`
                background: `linear-gradient(${perc1}deg, rgba(${r1}, ${g1}, ${b1}, 1) 7%, rgba(${r2}, ${g2}, ${b2}, ${a1}) 25%, rgba(${r1}, ${g2}, ${b2}, 1) 64%)`
            }}
        >
            <Dash
                setId={setId}
                setType={setType}
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
            />
        </div>
    );
}

export default App;
