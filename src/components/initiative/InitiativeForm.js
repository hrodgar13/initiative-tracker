import {useState} from "react";
import {InitiativeWrapper} from "./InitiativeWrapper";
import {Input} from "../shared/Input";

export function InitiativeForm({initiativeList, onSubmitForm}) {
    const [initiative, setInitiative] = useState('')
    const [formCorrect, setFormCorrect] = useState(!!initiative && !initiativeList.find(item => item.initiative === initiative))

    function handleSubmit(e) {
        e.preventDefault()

        onSubmitForm(initiative)
    }

    function handleOnChange(value) {
        const newInitiative = Number(value)

        setFormCorrect(!!newInitiative && !initiativeList.find(item => item.initiative === newInitiative))
        setInitiative(newInitiative)
    }

    return <InitiativeWrapper>
        <form className='create-initiative' onSubmit={handleSubmit}>
            <Input label={'Ініціатива: '} type={'number'} initValue={initiative} onChange={handleOnChange}/>
            <button disabled={!formCorrect}>Створити</button>
        </form>
    </InitiativeWrapper>
}
