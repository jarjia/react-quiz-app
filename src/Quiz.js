import React from 'react'
import {nanoid} from "nanoid"
import './style.css'

export default function Quiz(props) {
    let styles;
    let answers = props.answers
    let displayAnswers = answers.map(item => {
        if(item.isSelected === true) {
            if(item.isSelected && props.end !== true) {
                styles = {
                    backgroundColor: '#D6DBF5'
                }    
            }
            if(item.isWrong) {
                styles = {
                    backgroundColor: '#F8BCBC'
                }
            }
        }else if(item.isCorrect) {
            styles = {
                backgroundColor: '#94D7A2'
            }
        }else {
            styles = {
                backgroundColor: 'none'
            }
        }

        return <div
            key={nanoid()}
            style={styles}
            className="check"
            onClick={() => props.click(answers, item)}
        >{item.value}</div>
    })

    return (
        <div className="quiz">
            <div className="quiz-wrapper">
                <h2 className="quiz-h2">{props.task}</h2>
                <div className='quiz-div'>
                    {displayAnswers}
                </div>
            </div>
        </div>
    )
}