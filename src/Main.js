import React from 'react'
import Quiz from './Quiz'
import {nanoid} from "nanoid"
import './style.css'
//hey its me marioo
export default function Main(props) {
    const [data, setData] = React.useState([])
    const [start, setStart] = React.useState(true)
    const [endGame, setEndgame] = React.useState(false)
    const [everySelect, setEverySelect] = React.useState(false)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
            fetch(`https://opentdb.com/api.php?amount=5&type=multiple`)
                .then(res => res.json())
                .then(data => setData(data.results))
    }, []) 
    
    function toggleStart() {
            setData(prev => prev.map(item => {
                let newArr = []
                let correct = item.correct_answer
                let incorrect = item.incorrect_answers
                let random = Math.floor(Math.random() * 4)
                for(let i = 0; i < incorrect.length; i++) {
                    newArr.push(incorrect[i])
                }
                newArr.splice(random, 0, correct)
                item.all_answers = newArr.map(ans => {
                    return {
                        value: ans,
                        isSelected: false,
                        isCorrect: false,
                        isWrong: false
                    }
                })
                return item
            }))
            setStart(false) 
        }
        function playAgain() {
            window.location.reload(false);
        }

        function selectAnswer(answers, id) {
                setData(prev => prev.map(item => {
                    answers.map(ans => {
                        if(ans.value === id.value) {
                            ans.isSelected = !ans.isSelected
                        }else if(ans.value !== id.value) {
                            ans.isSelected = false
                        }else {
                            return ans
                        }
                        return ans
                    })
                    return item
                }))
        }

        function check() {
            setData(prev => prev.map(item => {
                item.all_answers.map(ans => {
                    if(ans.value === item.correct_answer) {
                        ans.isSelected = false
                        setCount(prev => prev + 1)
                        return ans.isCorrect = true
                    }else if(ans.isSelected === true && ans.value !== item.correct_answer) {
                        setCount(prev => prev - 1)
                        return ans.isWrong = true
                    }
                    return ans
                })
                return item
            }))
            setEndgame(true)
        }
        
        let display = data.map(item => {
            return <Quiz 
                key={nanoid()} 
                task={item.question}
                answers={item.all_answers}
                correct={item.correct_answer}
                click={selectAnswer}
                end={endGame}
            />
        })
       
    return (
        <>
            {start ? <div className="start">
                <div className="start-quiz">
                    <h1 className="start-h1">Quizzical</h1>
                    <h4 className='start-h4'>Please wait a second before clicking start</h4>
                    <button className="start-btn" onClick={toggleStart}>Start Quiz</button>
                </div>
            </div> :
            <div className="main">
                {display} 
                <div className="check-div">
                    {
                        endGame ?
                        <>
                            <p className="p">{`You scored ${count}/5 correct answers`}</p>
                            <button className="check-btn" onClick={playAgain}>Play again</button> 
                        </> : 
                        <button className="check-btn" onClick={check}>Check</button>
                    }
                </div>        
            </div>
            }
        </>
    )
}
