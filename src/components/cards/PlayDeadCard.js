export default function PlayDeadCard({onRemoveCard}) {
    return <div className='play-dead'>
        <button onClick={onRemoveCard}>❌</button>
        <h3>Мертвий</h3>
        <img src="./playDead.png" alt="Dead"/>
    </div>
}
