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
                <div>#</div>
                <div>#</div>
                <div>#</div>
                <div>#</div>
                <div>#</div>
            </div>
            {/* <p>{id}</p> */}
            <div id="blur"></div>
        </div>
    )

}