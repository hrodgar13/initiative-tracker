import {handleGetCardDamage} from "../../utils/handleGetCardDamage";
import {CardWrapper} from "./CardWrapper";
import {Input} from "../shared/Input";

export function Card({card, onCardChange, onCloneCard}) {

    function handleGetDamage(damage) {
        const changedCard = handleGetCardDamage(card, -Number(damage))

        onCardChange(changedCard)
    }

    function handleGetHeal(heal) {
        const changedCard = handleGetCardDamage(card, Number(heal))

        onCardChange(changedCard)
    }

    function handleSetPeriodicalDamage(damage) {
        const newCard = {...card, periodicalHpChange: {...card.periodicalHpChange, damage: Number(damage)}}

        onCardChange(newCard)
    }

    function handleSetPeriodicalHeal(heal) {
        const newCard = {...card, periodicalHpChange: {...card.periodicalHpChange, heal: Number(heal)}}

        onCardChange(newCard)
    }

    function handleCloneCard() {
        const newCard = {...card, hp: {max: card.hp.max, current: card.hp.max}, id: Math.random()}

        onCloneCard(newCard)
    }

    return <CardWrapper>
        <h4>{card.name}</h4>
        <h5>ХП: <span>{card.hp.max}/{card.hp.current}</span></h5>
        <div className='change-hp'>
            <span>Змінити ХП</span>
            <Input label='Шкода' type='number' initValue={''} onPressEnter={handleGetDamage}/>
            <Input label='Хіл' type='number' initValue={''} onPressEnter={handleGetHeal}/>
        </div>
        <div className='card-bottom'>
            <span>Періодичні зміни</span>
            <div className='periodical-damage'>
                <Input label='Шкода' type='number' initValue={card.periodicalHpChange.damage}
                       onChange={handleSetPeriodicalDamage}></Input>
                <Input label='Хіл' type='number' initValue={card.periodicalHpChange.damage}
                       onChange={handleSetPeriodicalHeal}></Input>
            </div>
            <div>
                <button onClick={handleCloneCard}>Клонувати</button>
            </div>
        </div>
    </CardWrapper>
}
