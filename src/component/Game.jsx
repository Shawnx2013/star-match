import utils from '../utils';
import useGameState from '../hook/useGameState';
import Num from './Num';
import StarDisplay from './StarsDisplay';
import PlayAgain from './PlayAgain';

function Game(props) {
    
    const [stars, availableNums, candidateNums, timer, setGameState] = useGameState();

    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameStatus = availableNums.length === 0 ? 'won' : timer === 0 ? 'lost' : 'active';

    function numberStatus(number){
        if(!availableNums.includes(number)){
            return 'used';
        }
        if(candidateNums.includes(number)){
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available';
    }

    function onNumberClick(number, currStatus){
        if(gameStatus !== 'active' || currStatus === 'used'){
            return;
        }
        const newCandidateNums = currStatus === 'available' ? candidateNums.concat(number) : candidateNums.filter(num => num !== number);
        
        setGameState(newCandidateNums);
    }

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    { gameStatus !== 'active' ? (
                        <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus}/>
                    ) : (
                        <StarDisplay count={stars}/>
                    )}
                    
                </div>
                <div className="right">
                    {utils.range(1, 9).map(number =>
                        <Num 
                            key={number} 
                            number={number} 
                            status={numberStatus(number)}
                            onClick={onNumberClick}
                        />
                    )}
                </div>
            </div>
            <div className="timer">Time Remaining: {timer}</div>
        </div>
    )
}

export default Game;