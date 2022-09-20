import React, { useEffect, useState } from 'react'
import './Dash.css';

export default function Dash(props) {

    const {
        setId,
        setType
    } = props

    return (
        <div id="dash">
            
            <select id="id" name="id" onChange={(e) => setId(e.target.value) }>
                <option value="DFDFDAHSABBANPNs2WH5Gw9NZ34598aW20c0dfhhj475nnf">id 1</option>
                <option value="tz1YggPNs9WH5Gw9NZj6BgdaW2hPwQ6YjWUnf">id 2</option>
                <option value="0PNs2WH5G45678daWffhPwQzzzzzzzzzzz">id 3</option>
            </select>

            <select id="type" name="type" onChange={(e) => setType(e.target.value) }>
                <option value="01">design 1</option>
                <option value="02">design 2</option>
                <option value="02a">design 2a</option>
                <option value="03">design 3</option>
                <option value="04">design 4</option>
                <option value="05">design 5</option>
                <option value="06">design 6</option>
                <option value="07">design 7</option>
                <option value="08">design 8</option>
                <option value="09">design 9</option>
                <option value="10">design 10</option>
                <option value="11">design 11</option>
                <option value="12">design 12</option>
                <option value="13">design 13</option>
                <option value="14">design 14</option>
                <option value="15">design 15</option>
            </select>

        </div>
    )

}