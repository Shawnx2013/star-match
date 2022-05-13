import { useState, useEffect } from "react";
import utils from "../utils";
function useGameState(){
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandiateNums] = useState([]);
    const [timer, setTimer] = useState(10);

    useEffect(() => {
        if(timer > 0 && availableNums.length > 0) {
            const timerId = setTimeout(() => {
                setTimer(timer - 1);
            }, 1000)
            return () => clearTimeout(timerId);
        }
    }, [timer, availableNums])

    const setGameState = (newCandidateNums) => {
        if(utils.sum(newCandidateNums) !== stars){
            setCandiateNums(newCandidateNums);
        } else {
            const newAvailableNums = availableNums.filter(num => !newCandidateNums.includes(num));
            setStars(utils.randomSumIn(newAvailableNums, 9));
            setAvailableNums(newAvailableNums);
            setCandiateNums([]);
            
        }
    }

    return [stars, availableNums, candidateNums, timer, setGameState]
}

export default useGameState;