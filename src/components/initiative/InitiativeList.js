import {Initiative} from "./Initiative";

export function InitiativeList({initiativeList, onCardChange, onCreateCard, onInitiativeStart, onRemoveCard}) {
    return <ul className='initiative-list'>
        {initiativeList.map(initiative =>
            <Initiative initiativeItem={initiative} key={initiative.id} onCardChange={onCardChange}
                        onCreateCard={onCreateCard} onInitiativeStart={onInitiativeStart} onRemoveCard={onRemoveCard} />
        )}
    </ul>
}
