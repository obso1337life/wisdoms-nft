// import * as THREE from 'three';

// convert random int value into modifier value based on mod sway
const convertSineToModSway = (value, sway) => 1 + ((Math.sin(value) * (sway * 10)) / 10);

const generateAndReturnRGBVals = (val1, val2) => {
    let big = val1 >= val2 ? val1 : val2;
    let small = big === val1 ? val2 : val1;
    let perc = (small / big);
    let val = 255 * perc;
    return Math.floor(val);
};

export function extrapolateAndReturnValuesFromString(stringToUse) {
    // only int values from string
    let iV = stringToUse.replace(/\D/g, '');
    // only char values from string
    let cS = stringToUse.replace(/\d/g, '');

    // creates a string of integers based on the char values of the original string
    let cV = 0;
    for (let i = 0; i < cS.length; i++) {
        cV += cS.charCodeAt(i);
    };
    cV += '';
    
    // if no number values were in the string > overwrite this value
    if (!iV) iV = ((parseInt(cV) * 3.7 + 0.69) + 0.69) + ''

    // determine long and short values
    let l = iV.length >= cV.length ? iV : cV;
    let s = l === iV ? cV : iV;
    l = l.slice(0, s.length);

    // parse long and short values to integers
    let lI = parseInt(l);
    let sI = parseInt(s);

    // determine high and low values
    let h = lI >= sI ? lI : sI;
    let lo = h === lI ? sI : lI;

    return {
        iV,
        cS,
        cV,
        l,
        s,
        lI,
        sI,
        h,
        lo
    };
};

export function generateAndReturnWisdomVariables(stringToUse, valuesToUse) {
    if (!stringToUse) return null;

    try {
        const {
            iV,
            cS,
            cV,
            l,
            s,
            lI,
            sI,
            h,
            lo
        } = valuesToUse;

        // determine percentile values
        let perc1 = parseInt(s.slice(0, 2)) / 2;
        let perc2 = parseInt(l.slice(0, 2)) / 2;
        let perc3 = parseInt(l.slice(0, 2));
        let perc4 = parseInt(s.slice(0, 2));

        // determine first rgba value
        let r1 = generateAndReturnRGBVals(parseInt(s.slice(0, 1)), parseInt(l.slice(l.length - 2, l.length - 1)));
        let g1 = generateAndReturnRGBVals(parseInt(s.slice(1, 2)), parseInt(l.slice(l.length - 1, l.length)));
        let b1 = generateAndReturnRGBVals(parseInt(l.slice(0, 1)), parseInt(s.slice(1, 2)));
        let a1 = Math.sin(parseInt(s)) >= 0 ? Math.sin(parseInt(s)) : Math.sin(parseInt(s)) * -1;

        // determine second rgb value
        let r2 = generateAndReturnRGBVals(parseInt(l.slice(1, 2)), parseInt(s.slice(s.length - 1, s.length)));
        let g2 = generateAndReturnRGBVals(parseInt(s.slice(s.length - 2, s.length - 1)), parseInt(l.slice(l.length - 2, l.length - 1)));
        let b2 = generateAndReturnRGBVals(parseInt(l.slice(0, 1)), parseInt(s.slice(0, 1)));

        // generate the modifiers for the base values
        let sMod = convertSineToModSway(parseInt(iV) - 100, 0.4);
        let ssMod = convertSineToModSway(g1, 0.6);
        let soMod = convertSineToModSway(b1 * 2, 0.4);
        let fiMod = convertSineToModSway(sI + 4.20, 0.9);
        let frMod = convertSineToModSway(parseInt(iV) / 0.69, 0.1);
        let friMod = convertSineToModSway((lI + lo) * 1337, 0.9);
        let fsMod = convertSineToModSway(r1 + b1, 0.8);
        let psMod = convertSineToModSway((g1 * 1337) + (b1 * 3), 0.6);
        let ryMod = 0.25 + (0.1 * Math.sin(perc1 + lI / 2));

        let nMod = (Math.sin((g2 * 4 + b1) - (b2 * 1.3)) * 0.05) + 0.05;

        // TODO: return backup values if generated values are unusable
        // or if using min max mod && greater / less than use min max vals

        return {
            perc1,
            perc2,
            perc3,
            perc4,
            r1,
            g1,
            b1,
            a1,
            r2,
            g2,
            b2,
            mods: {
                sMod,
                ssMod,
                soMod,
                fiMod,
                frMod,
                friMod,
                fsMod,
                psMod,
                ryMod,
                nMod
            }
        };  
    } catch (error) {
        console.error('error caught @ generateAndReturnWisdomVariables:', error);
    };
};


// test code 

// Choose geometry
// export function chooseGeometry(val) {

//     const geometries = [
//         new THREE.CapsuleGeometry( 1, 1, 4, 8 ),
//         new THREE.ConeGeometry( 1, 2, 32, 16 ),
//         new THREE.IcosahedronGeometry( 10, 0 ),
//         new THREE.TorusGeometry( 10, 3, 16, 100 ),
//         new THREE.TorusKnotGeometry( 10, 3, 100, 16 ),
//         new THREE.SphereGeometry( 1, 32, 16 ),
//         new THREE.BoxGeometry( 1, 1, 1 ),
//         new THREE.PlaneGeometry( 1, 1, 150, 150 ),
//         new THREE.RingGeometry( 1, 5, 32 ),
//         new THREE.CylinderGeometry( 5, 5, 20, 32 )
//     ];

//     return geometries[val];
// };

// let geometries = [
//     {
//         name: THREE.CapsuleGeometry,
//         arguments: [
//             {
//                 min: 0,
//                 max: 1
//             },
//             {
//                 min: 1,
//                 max: 2
//             },
//             {
//                 min: 1,
//                 max: 4
//             },
//             {
//                 min: 3,
//                 max: 8
//             },
//         ]
//     },
// ];