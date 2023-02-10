import React, { 
    useEffect, 
    useState,
    useRef
} from 'react'

import './Dash.css';

// (╯°益°)╯彡┻━┻ -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

const dash_test_id = [
    'DFDFDAHSABBANPNs2WH5Gw9NZ34598aW20c0dfhhj475nnf',
    'tz1YggPNs9WH5Gw9NZj6BgdaW2hPwQ6YjWUnf',
    '0PNs2WH5G45678daWffhPwQzzzzzzzzzzz',
    'abcdef9876566klklklklklnf',
    'az999999w9NZj6BgdaW2hPwQ597jasasasnf',
    'f71YMPNs2Whell666NZj6BgggaW2hPwQ6Yj555poop',
    'tz1YMPNs2WH5Gw9NZj6BgdaW2hPwQ6YjWUnf'
];

// (╯°益°)╯彡┻━┻ -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

export default function Dash(props) {
    const {
        id,
        setId,
        name,
        setName,
        value,
        setValue,
        baseModifiers,
        setBaseModifiers,
        baseWisdomModifiers
    } = props;

    const txtAreaRefName = useRef();
    const txtAreaRefString = useRef();
    const inptRngeRefValue = useRef();
    const inptRngeRefS = useRef();
    const inptRngeRefSS = useRef();
    const inptRngeRefSO = useRef();
    const inptRngeRefFS = useRef();
    const inptRngeRefFRI = useRef();
    const inptRngeRefFI = useRef();
    const inptRngeRefFRS = useRef();
    const inptRngeRefFRE = useRef();
    const inptRngeRefPS = useRef();

    const [dashVisible, setDashVisble] = useState(false);

    // (╯°益°)╯彡┻━┻ -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

    // handle changing test name
    const handleDashTestName = tst_nme => {
        if (txtAreaRefName && txtAreaRefName.current && txtAreaRefName.current.value.length) {
            setName(txtAreaRefName.current.value);
        };
    };

    // handle changing test string
    const handleDashTestString = tst_str => {
        let valToSet = null;

        // if no value, using text area value
        if (!tst_str) {
            if (txtAreaRefString && txtAreaRefString.current && txtAreaRefString.current.value && txtAreaRefString.current.value.length) {
                valToSet = txtAreaRefString.current.value;
            };
        // use preset value
        } else {
            valToSet = tst_str
        };

        if (valToSet !== null) {
            setId(valToSet);
            // update text area value
            if (txtAreaRefString && txtAreaRefString.current) txtAreaRefString.current.value = valToSet;
        };
    };

    // handle changing test value
    const handleDashTestValue = e => {
        setValue(e.target.value);
    };

    // handle changin a base modifier value
    const handleDashBaseModifierChange = e => {
        let baseModifiersClone = { ...baseModifiers };

        baseModifiersClone[e.target.name] = e.target.value;
       
        setBaseModifiers(baseModifiersClone);
    };

    // handle resetting the test value
    const handleDashValueReset = () => {
        setValue(50);
        if (value && inptRngeRefValue && inptRngeRefValue.current) inptRngeRefValue.current.value = 50;
    };

    // handle resetting the base modifier values
    const handleDashBaseModifierReset = () => {
        setBaseModifiers({ ...baseWisdomModifiers });
        if (inptRngeRefS && inptRngeRefS.current) inptRngeRefS.current.value = baseWisdomModifiers.scale;
        if (inptRngeRefSS && inptRngeRefSS.current) inptRngeRefSS.current.value = baseWisdomModifiers.scale_speed;
        if (inptRngeRefSO && inptRngeRefSO.current) inptRngeRefSO.current.value = baseWisdomModifiers.scale_offset;
        if (inptRngeRefFS && inptRngeRefFS.current) inptRngeRefFS.current.value = baseWisdomModifiers.float_speed;
        if (inptRngeRefFRI && inptRngeRefFRI.current) inptRngeRefFRI.current.value = baseWisdomModifiers.float_rotation_intensity;
        if (inptRngeRefFI && inptRngeRefFI.current) inptRngeRefFI.current.value = baseWisdomModifiers.float_intensity;
        if (inptRngeRefFRS && inptRngeRefFRS.current) inptRngeRefFRS.current.value = baseWisdomModifiers.float_range_start;
        if (inptRngeRefFRE && inptRngeRefFRE.current) inptRngeRefFRE.current.value = baseWisdomModifiers.float_range_end;
        if (inptRngeRefPS && inptRngeRefPS.current) inptRngeRefPS.current.value = baseWisdomModifiers.particle_speed;
    };

    // (╯°益°)╯彡┻━┻ -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

    // on mount set initial values of text area refs
    useEffect(() => {
        if (name && txtAreaRefName && txtAreaRefName.current) txtAreaRefName.current.value = name;
        if (id && txtAreaRefString && txtAreaRefString.current) txtAreaRefString.current.value = id;
        if (value && inptRngeRefValue && inptRngeRefValue.current) inptRngeRefValue.current.value = value;
        if (inptRngeRefS && inptRngeRefS.current) inptRngeRefS.current.value = baseModifiers.scale;
        if (inptRngeRefSS && inptRngeRefSS.current) inptRngeRefSS.current.value = baseModifiers.scale_speed;
        if (inptRngeRefSO && inptRngeRefSO.current) inptRngeRefSO.current.value = baseModifiers.scale_offset;
        if (inptRngeRefFS && inptRngeRefFS.current) inptRngeRefFS.current.value = baseModifiers.float_speed;
        if (inptRngeRefFRI && inptRngeRefFRI.current) inptRngeRefFRI.current.value = baseModifiers.float_rotation_intensity;
        if (inptRngeRefFI && inptRngeRefFI.current) inptRngeRefFI.current.value = baseModifiers.float_intensity;
        if (inptRngeRefFRS && inptRngeRefFRS.current) inptRngeRefFRS.current.value = baseModifiers.float_range_start;
        if (inptRngeRefFRE && inptRngeRefFRE.current) inptRngeRefFRE.current.value = baseModifiers.float_range_end;
        if (inptRngeRefPS && inptRngeRefPS.current) inptRngeRefPS.current.value = baseModifiers.particle_speed;
    }, []);

    // (╯°益°)╯彡┻━┻ -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

    return (
        <div 
            id="dash"
            className={dashVisible ? 'dash-expand' : null}
        >
            <div onClick={() => setDashVisble(!dashVisible)} id="dash-toggle">☯️</div>

            <div 
                id="dash-controls"
                className={dashVisible ? 'dash-controls-visible' : null}
            >
                <h5 id="dash-controls-start">obso1337_con7roll3r_</h5>

                <hr></hr>

                <h5>_test_name</h5>

                <div id="dash-txt-area-wrap">
                    <div onClick={handleDashTestName}>🚹</div>
                    <textarea 
                        onInput={e => e.target.value = e.target.value.replace(/[^A-z\s]/g, '')}
                        placeholder="input test name" 
                        ref={txtAreaRefName} 
                        id="dash-txt-area"
                    ></textarea>
                </div>

                <hr></hr>

                <h5>_test_id</h5>

                {dash_test_id.map((tst_str, idx) => <p key={tst_str} onClick={() => handleDashTestString(tst_str)} className={`dash-test-p${id === tst_str ? ' dash-test-p-selected' : ''}`}>id_{idx + 1}</p>)}
                
                <div id="dash-txt-area-wrap">
                    <div onClick={() => handleDashTestString(null)}>❇️</div>
                    <textarea 
                        placeholder="input test id" 
                        ref={txtAreaRefString} 
                        id="dash-txt-area"
                    ></textarea>
                </div>
                
                <hr></hr>

                <div className="dash-title-button">
                    <h5>_test_value</h5>

                    <div onClick={handleDashValueReset}>🆘</div>
                </div>

                <div className="dash-slider-wrap"> 
                    <p>value</p>

                    <div className="dash-slider">
                        <input 
                            min="0"
                            max="100"
                            type="range"
                            onChange={handleDashTestValue}
                            ref={inptRngeRefValue}
                        ></input>

                        <p>{value}%</p>
                    </div>
                </div>

                <hr></hr>

                <div className="dash-title-button">
                    <h5>_base_modifiers</h5>

                    <div onClick={handleDashBaseModifierReset}>📴</div>
                </div>

                <div className="dash-slider-wrap"> 
                    <p>scale</p>

                    <div className="dash-slider">
                        <input 
                            min="0.1"
                            max="1"
                            step="0.1"
                            type="range"
                            name="scale"
                            onChange={handleDashBaseModifierChange}
                            ref={inptRngeRefS}
                        ></input>

                        <p>{baseModifiers ? baseModifiers.scale : '?'}</p>
                    </div>
                </div>

                <div className="dash-slider-wrap"> 
                    <p>scale_speed</p>

                    <div className="dash-slider">
                        <input 
                            min="0.1"
                            max="1"
                            step="0.1"
                            type="range"
                            name="scale_speed"
                            onChange={handleDashBaseModifierChange}
                            ref={inptRngeRefSS}
                        ></input>

                        <p>{baseModifiers ? baseModifiers.scale_speed : '?'}</p>
                    </div>
                </div>

                <div className="dash-slider-wrap"> 
                    <p>scale_offset</p>

                    <div className="dash-slider">
                        <input 
                            min="0.01"
                            max="0.1"
                            step="0.01"
                            type="range"
                            name="scale_offset"
                            onChange={handleDashBaseModifierChange}
                            ref={inptRngeRefSO}
                        ></input>

                        <p>{baseModifiers ? baseModifiers.scale_offset : '?'}</p>
                    </div>
                </div>

                <div className="dash-slider-wrap"> 
                    <p>float_speed</p>

                    <div className="dash-slider">
                        <input 
                            min="0.1"
                            max="5"
                            step="0.1"
                            type="range"
                            name="float_speed"
                            onChange={handleDashBaseModifierChange}
                            ref={inptRngeRefFS}
                        ></input>

                        <p>{baseModifiers ? baseModifiers.float_speed : '?'}</p>
                    </div>
                </div>

                <div className="dash-slider-wrap"> 
                    <p>float_rotation_intensity</p>

                    <div className="dash-slider">
                        <input 
                            min="0.1"
                            max="5"
                            step="0.1"
                            type="range"
                            name="float_rotation_intensity"
                            onChange={handleDashBaseModifierChange}
                            ref={inptRngeRefFRI}
                        ></input>

                        <p>{baseModifiers ? baseModifiers.float_rotation_intensity : '?'}</p>
                    </div>
                </div>

                <div className="dash-slider-wrap"> 
                    <p>float_intensity</p>

                    <div className="dash-slider">
                        <input 
                            min="0.1"
                            max="3"
                            step="0.1"
                            type="range"
                            name="float_intensity"
                            onChange={handleDashBaseModifierChange}
                            ref={inptRngeRefFI}
                        ></input>

                        <p>{baseModifiers ? baseModifiers.float_intensity : '?'}</p>
                    </div>
                </div>

                <div className="dash-slider-wrap"> 
                    <p>{'float_range (start and end)'}</p>

                    <div className="dash-slider-double">
                        <div className="dash-slider">
                            <input 
                                min="-2"
                                max="-0.1"
                                step="0.1"
                                type="range"
                                name="float_range_start"
                                onChange={handleDashBaseModifierChange}
                                ref={inptRngeRefFRS}
                            ></input>

                            <p>{baseModifiers ? baseModifiers.float_range_start : '?'}</p>
                        </div>

                        <div className="dash-slider">
                            <input 
                                min="0.1"
                                max="2"
                                step="0.1"
                                type="range"
                                name="float_range_end"
                                onChange={handleDashBaseModifierChange}
                                ref={inptRngeRefFRE}
                            ></input>

                            <p>{baseModifiers ? baseModifiers.float_range_end : '?'}</p>
                        </div>
                    </div>
                </div>

                <div className="dash-slider-wrap"> 
                    <p>particle_speed</p>

                    <div className="dash-slider">
                        <input 
                            min="0.0001"
                            max="0.01"
                            step="0.0001"
                            type="range"
                            name="particle_speed"
                            onChange={handleDashBaseModifierChange}
                            ref={inptRngeRefPS}
                        ></input>

                        <p>{baseModifiers ? baseModifiers.particle_speed : '?'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};