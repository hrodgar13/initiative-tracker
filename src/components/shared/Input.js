import {useState} from "react";

export function Input({label, type, placeholder = '', initValue = '', onChange, onPressEnter}) {
    const [value, setValue] = useState(initValue)

    function handleKeyDown(e) {
        if (onPressEnter && e.key === 'Enter') {
            onPressEnter(value)
            setValue('')
        }
    }

    function handleChangeValue(e) {
        setValue(e.target.value)

        if (onChange) {
            onChange(e.target.value)
        }
    }

    return <div className='input-container'>
        <label>{label}</label>
        <input type={type} placeholder={placeholder} value={value} onChange={handleChangeValue}
               onKeyDown={handleKeyDown}/>
    </div>
}
