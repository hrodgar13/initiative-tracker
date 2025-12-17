import {useState} from "react";
import './index.css'

export default function App() {
    const [initiativeList, setInitiativeList] = useState([])

    const [showForm, setShowForm] = useState(false)

    function handleShowForm() {
        setShowForm(show => !show)
    }

    function handleCreateInitiative(initiative) {
        const isInitiativeExist = !!initiativeList.find(item => item.initiative === initiative)

        if (isInitiativeExist) {
            alert('This initiative already exists!')
            return
        }

        const newInitiative = {
            id: Math.random(),
            initiative,
            cards: []
        }

        setInitiativeList(list => [...list, newInitiative].sort((a, b) => b.initiative - a.initiative))
        setShowForm(false)

        localStorage.setItem('initiativeList', initiativeList)
    }

    function handleCardChange(changedCard){
        setInitiativeList(list => {

            return list.map(initiative => {

                const changedCards = initiative.cards.map(card => {
                    if(card. id === changedCard.id) return {...changedCard}

                    return {...card}
                })

                return {...initiative, cards: changedCards}
            })
        })

        localStorage.setItem('initiativeList', initiativeList)
    }

    function handleCreateCard({card, initiativeId}) {
        setInitiativeList(list => {
            return list.map(initiative => {
                if(initiative.id === initiativeId) {
                    const newCards = [...initiative.cards, card]

                    return {...initiative, cards: newCards}
                }

                return initiative
            })
        })

        localStorage.setItem('initiativeList', initiativeList)
    }

    return (
        <div className="App">
            <InitiativeList initiativeList={initiativeList} onCardChange={handleCardChange} onCreateCard={handleCreateCard}/>
            {showForm && <InitiativeForm initiativeList={initiativeList} onSubmitForm={handleCreateInitiative}/>}
            <button onClick={handleShowForm}> {showForm ? 'Закрити' : 'Додати ініціативу'} </button>
        </div>
    );
}

function InitiativeForm({initiativeList, onSubmitForm}) {
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

function InitiativeList({initiativeList, onCardChange, onCreateCard}) {
    return <ul className='initiative-list'>
        {initiativeList.map(initiative =>
            <Initiative initiativeItem={initiative} key={initiative.id} onCardChange={onCardChange} onCreateCard={onCreateCard}/>
        )}
    </ul>
}

function Initiative({initiativeItem, onCardChange, onCreateCard}) {
    function handleCreateCard(card) {
        onCreateCard({card, initiativeId: initiativeItem.id})
    }

    return <InitiativeWrapper>
        <h3>Ініціатива: {initiativeItem.initiative}</h3>
        <div className='cards-container'>
            {initiativeItem.cards.map(card => <Card card={card} key={card.id} onCardChange={onCardChange} onCloneCard={handleCreateCard}/>)}
            <CreateCard onCreateCard={handleCreateCard} />
        </div>
    </InitiativeWrapper>
}

function CreateCard({onCreateCard}) {
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

function CreateCardForm({onCloseForm, onSubmitForm}) {
    const [name, setName] = useState('')
    const [HP, setHP] = useState(0)

    function submitForm(e) {
        e.preventDefault()

        const newCard = {
            id: Math.random(),
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

function InitiativeWrapper({children}) {
    return <li className='initiative-item'>
        {children}
    </li>
}

function Card({card, onCardChange, onCloneCard}) {

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
                <Input label='Шкода' type='number' initValue={card.periodicalHpChange.damage} onChange={handleSetPeriodicalDamage}></Input>
                <Input label='Хіл' type='number' initValue={card.periodicalHpChange.damage} onChange={handleSetPeriodicalHeal}></Input>
            </div>
            <div>
                <button onClick={handleCloneCard}>Клонувати</button>
            </div>
        </div>
    </CardWrapper>
}

function CardWrapper({children}) {
    return <div className='card'>
        {children}
    </div>
}

function Input({label, type, placeholder = '', initValue='', onChange, onPressEnter}) {
    const [value, setValue] = useState(initValue)

    function handleKeyDown(e) {
        if(onPressEnter && e.key === 'Enter') {
            onPressEnter(value)
            setValue('')
        }
    }

    function handleChangeValue(e) {
        setValue(e.target.value)

        if(onChange) {
            onChange(e.target.value)
        }
    }

    return <div className='input-container'>
        <label>{label}</label>
        <input type={type} placeholder={placeholder} value={value} onChange={handleChangeValue} onKeyDown={handleKeyDown}/>
    </div>
}

const handleGetCardDamage = (card, value) => {
    const changedCard = {...card}

    changedCard.hp.current = changedCard.hp.current + Number(value)

    if(changedCard.hp.current > changedCard.hp.max) {
        changedCard.hp.current = changedCard.hp.max
    }

    if (changedCard.hp.current < 0) {
        changedCard.hp.current = 0
    }

    return changedCard
}
