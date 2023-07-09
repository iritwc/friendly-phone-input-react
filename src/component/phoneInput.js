import { useState, useRef, useEffect } from 'react';
import { ignoreNotAllowedKeys, formatPhone, repositionStart } from './phone'; 

import './phoneInput.css';

export default function PhoneInput() {
    const [value, setValue] = useState('');
    const [start, setStart] = useState(0);
    const ref = useRef(null);
    
    useEffect(() => {
        ref.current.setSelectionRange(start, start);
    }, [start]);

    function handleKeyDown(e) {
        ignoreNotAllowedKeys(e);
    }

    function handleChange(e) {

        const {value, selectionStart} = e.target;
        const format = formatPhone(value);
        const start = repositionStart(value, format, selectionStart);

        setValue(format);
        setStart(start);
    }

    return ( 
        <div className="container text-center">
            <input 
                value={value} 
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                ref={ref}
                type="tel"
                id="phone" 
                maxLength="16" 
                placeholder="mobile number" 
                autoComplete="off" />
            <div><label htmlFor="phone" >(123) 456-7890</label></div>
        </div>);
}