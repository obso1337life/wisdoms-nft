import React, { useEffect, useState } from 'react'
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

    return (
        <div id="info">
            <div id="sidebar">
                <div style={{textShadow: `0px 0px 5px rgb(${r1}, ${g1}, ${b1})`}}>#</div>
                <div style={{textShadow: `0px 0px 5px rgb(${r1}, ${g1}, ${b1})`}}>#</div>
                <div style={{textShadow: `0px 0px 5px rgb(${r1}, ${g1}, ${b1})`}}>#</div>
                <div style={{textShadow: `0px 0px 5px rgb(${r1}, ${g1}, ${b1})`}}>#</div>
                <div style={{textShadow: `0px 0px 5px rgb(${r1}, ${g1}, ${b1})`}}>#</div>
            </div>
            <div id="blur"></div>
            <div id="name">
                <p style={{textShadow: `0px 0px 5px rgb(${r1}, ${g1}, ${b1})`}}>centerpoint 2979461337</p>
            </div>
        </div>
    )

}