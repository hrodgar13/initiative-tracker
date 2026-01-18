import {useState} from "react";
import {Input} from "../shared/Input";

export function CreateCardForm({onCloseForm, onSubmitForm}) {
    const [name, setName] = useState('')
    const [HP, setHP] = useState(0)

    function submitForm(e) {
        e.preventDefault()

        const newCard = {
            id: crypto.randomUUID(),
            hp: {current: HP, max: HP},
            name,
            periodicalHpChange: {heal: 0, damage: 0}
        }

        onSubmitForm(newCard)
    }

    return <form className={'create-card'} onSubmit={submitForm}>
        <div className={'create-card-inputs-wrapper'}>
            <Input label="Ім'я Ворога" type='text' initValue={name} onChange={value => setName(value)}/>
            <Input label="Максимальні ХП ворога" type='number' onChange={value => setHP(Number(value))}/>
        </div>
        <button disabled={!name || HP <= 0}>Create</button>
        <button type='button' onClick={onCloseForm}>Close</button>
    </form>
}
