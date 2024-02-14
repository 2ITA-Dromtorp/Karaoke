import Melvin from './images/placeholder_melvin.jpg';

function SongCard({sangNavn, lengde, index={index}, bilde, beskrivelse}) {
    console.log(sangNavn)
    return (
        // <div className="blackjackplayerprofile-main">
        //     <div className='blackjackplayerprofile-top-icon'>
        //         <img src={cardSymbols[index]} alt=''/>
        //         <h1>{name}</h1>
        //     </div>
        //     <div className='blackjackplayerprofile-information'>
        //         <div className='blackjackplayerprofile-cards'>
        //             {cards&&cards.map((card, index) => <p>{card}</p>)}
        //         </div>
        //         <div className='blackjackplayerprofile-money'>
        //             {moneyBet&&<p>Money bet: {moneyBet}</p>}
        //             <p>Money left: {money}</p>
        //         </div>     
        //     </div>
        //     <div className='blackjackplayerprofile-bottom-icon'>
        //         <img src={cardSymbols[index]} alt=''/>
        //     </div>
        // </div>

        <div className="karaokeCard">
            <h1>{sangNavn}</h1>
            <h1>oifaoifh</h1>
            {/* <img src={song} alt="Melvin" className="bilde"/> */}
        </div>
    );
}

export default SongCard;