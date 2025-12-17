import {useState} from "react";
import '../index.css'
import {InitiativeForm} from "./initiative/InitiativeForm";
import {InitiativeList} from "./initiative/InitiativeList";

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

        // localStorage.setItem('initiativeList', initiativeList)
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

        // localStorage.setItem('initiativeList', initiativeList)
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

        // localStorage.setItem('initiativeList', initiativeList)
    }

    function onInitiativeStart(initiativeId) {
        setInitiativeList(list => {
            return list.map(initiative => {
                if(initiative.id === initiativeId) {
                    const cards = initiative.cards.map(card => {
                        let newHpCurrent = card.hp.current

                        if(card.periodicalHpChange.damage) {
                            const newHp = newHpCurrent - Math.abs(card.periodicalHpChange.damage)
                            newHpCurrent = newHp < 0 ? 0 : newHp
                        }

                        if(card.hp.current !== 0 && !!card.periodicalHpChange.heal) {
                            const newHp = newHpCurrent + Math.abs(card.periodicalHpChange.heal)
                            newHpCurrent = newHp > card.hp.max ? card.hp.max : newHp
                        }

                        return {
                            ...card,
                            hp: {
                                ...card.hp,
                                current: newHpCurrent
                            }
                        }
                    })

                    return {...initiative, cards}
                }

                return initiative
            })
        })
    }

    return (
        <div className="App">
            <InitiativeList initiativeList={initiativeList} onCardChange={handleCardChange} onCreateCard={handleCreateCard} onInitiativeStart={onInitiativeStart}/>
            {showForm && <InitiativeForm initiativeList={initiativeList} onSubmitForm={handleCreateInitiative}/>}
            <button onClick={handleShowForm}> {showForm ? 'Закрити' : 'Додати ініціативу'} </button>
        </div>
    );
}

