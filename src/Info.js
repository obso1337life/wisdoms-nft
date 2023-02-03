import React, { useEffect, useState, useRef } from 'react'
import './Info.css';

export default function Dash(props) {

    const {
        id,
        type,
        perc1,
        r1,
        r2,
        g1,
        g2,
        b1,
        b2,
        a1
    } = props

    const [flash, setFlash] = useState(false)
    const nameRef = useRef()

    const rando = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    useEffect(() => {
        setTimeout(() => setFlash(!flash), 5000)
    }, [])

    useEffect(() => {
        let delay = flash ? rando(1000, 5000) : rando(10000, 50000)
        setTimeout(() => setFlash(!flash), delay)
    }, [flash])

    return (
        <div id="info">
            {/* <div id="sidebar">
                <div style={{ textShadow: `0px 0px 5px rgb(${r1}, ${g1}, ${b1})` }}>#</div>
                <div style={{ textShadow: `0px 0px 5px rgb(${r1}, ${g1}, ${b1})` }}>#</div>
                <div style={{ textShadow: `0px 0px 5px rgb(${r1}, ${g1}, ${b1})` }}>#</div>
                <div style={{ textShadow: `0px 0px 5px rgb(${r1}, ${g1}, ${b1})` }}>#</div>
                <div style={{ textShadow: `0px 0px 5px rgb(${r1}, ${g1}, ${b1})` }}>#</div>
            </div> */}
            <div id="blur"></div>
            {/* <div id="name">
                <div
                    style={{ 
                        bottom: flash ? `${rando(0, 80)}%` : '-40px',
                        animation: flash ? 'slide 5s ease-out infinite' : ''
                }}
                >
                    <p
                        style={{
                            textShadow: `0px 0px 5px rgb(${r1}, ${g1}, ${b1})`,
                            animation: flash ? 'flash 0.2s linear infinite' : ''
                        }}
                    >
                        top-level bossman
                    </p>
                </div>
            </div> */}
        </div>
    )

}