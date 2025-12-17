export const handleGetCardDamage = (card, value) => {
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
