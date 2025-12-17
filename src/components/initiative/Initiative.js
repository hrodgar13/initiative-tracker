import {InitiativeWrapper} from "./InitiativeWrapper";
import {Card} from "../cards/Card";
import {CreateCard} from "../cards/CreateCard";

export function Initiative({initiativeItem, onCardChange, onCreateCard, onInitiativeStart, onRemoveCard}) {
    function handleCreateCard(card) {
        onCreateCard({card, initiativeId: initiativeItem.id})
    }

    return <InitiativeWrapper>
        <div className='initiative-header'>
            <h3>Ініціатива: {initiativeItem.initiative}</h3>
            <button onClick={() =>onInitiativeStart(initiativeItem.id)}>Записати періодичний урон</button>
        </div>
        <div className='cards-container'>
            {initiativeItem.cards.map(card => <Card card={card} key={card.id} onCardChange={onCardChange}
                                                    onCloneCard={handleCreateCard} onRemoveCard={onRemoveCard} />)}
            <CreateCard onCreateCard={handleCreateCard}/>
        </div>
    </InitiativeWrapper>
}
