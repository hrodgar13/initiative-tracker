import {InitiativeWrapper} from "./InitiativeWrapper";
import {Card} from "../cards/Card";
import {CreateCard} from "../cards/CreateCard";

export function Initiative({initiativeItem, onCardChange, onCreateCard}) {
    function handleCreateCard(card) {
        onCreateCard({card, initiativeId: initiativeItem.id})
    }

    return <InitiativeWrapper>
        <h3>Ініціатива: {initiativeItem.initiative}</h3>
        <div className='cards-container'>
            {initiativeItem.cards.map(card => <Card card={card} key={card.id} onCardChange={onCardChange}
                                                    onCloneCard={handleCreateCard}/>)}
            <CreateCard onCreateCard={handleCreateCard}/>
        </div>
    </InitiativeWrapper>
}
