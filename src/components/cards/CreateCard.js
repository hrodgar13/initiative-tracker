import {useState} from "react";
import {CardWrapper} from "./CardWrapper";
import {CreateCardForm} from "./CreateCardForm";

export function CreateCard({onCreateCard}) {
    const [showForm, setShowForm] = useState(false)

    function handleViewForm() {
        setShowForm(show => !show)
    }

    function onSubmitForm(card) {
        onCreateCard(card)
        setShowForm(false)
    }

    return <CardWrapper>
        {
            showForm
                ? <CreateCardForm onCloseForm={handleViewForm} onSubmitForm={onSubmitForm}/>
                : <div className='create-card-button-wrapper'>
                    <button onClick={handleViewForm}>+</button>
                </div>
        }
    </CardWrapper>
}
