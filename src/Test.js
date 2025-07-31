import React from "react";
import './Test.css'
import { useState } from 'react';
import axios from 'axios';

function Test()
{
    const [questionsCount, setQuestionCount] = useState(10);
    const [questionsArray, setQuestions] = useState([]);
    const [currentQuestion, setQuestionIndex] = useState(0);
    const [answers, setAnswersArray] = useState([]);
    const [indicies, setIndiciesArray] = useState([]);

    function StartTest(e)
    {
        let apiUrl = process.env.REACT_APP_API_URL + 'api/question';

        axios(
            {
                method:'get',
                url: apiUrl
            }).then(response=>
                {
                    console.log('resultData = ' + response.data);
                    setQuestions(response.data);
                }
                );
    }

    function SelectChoice(index)
    {
        setAnswersArray([...answers, index]);
        setIndiciesArray([...indicies,questionsArray[currentQuestion].questionId]);

        console.log(index);
        console.log(questionsArray[currentQuestion].questionId);

        if((currentQuestion + 1) < questionsCount)
        {
            setQuestionIndex(currentQuestion + 1);
        }
        else 
        {
            const apiUrl = process.env.REACT_APP_API_URL + 'api/question';
            console.log(apiUrl);
            axios({
                method: 'post',
                url: apiUrl,
                data: {
                    indicies: indicies,
                    answers: answers
                }
            }).then(response => {
                setQuestions([]);
                setAnswersArray([]);
                setIndiciesArray([]);
                setQuestionCount(10);
                setQuestionIndex(0);
                alert("Оценка за тест - "+ response.data.result);
            })
        }
    }

    return(
        <div>
                <h1>Тест по русскому языку</h1>

                {questionsArray.length == 0 ? (
                <div>
                    <h3>Тест по русскому языку состоит из 10 вопросов. Вопросы появляются поочереди, чтобы перейти к новому вопросу необходимо ответить на 
                        текущий вопрос. После прохождения теста оценка появится на экране. Чтобы начать тест нажмите на кнопку.
                    </h3>
                    <button onClick={StartTest}>Начать тест</button>
                </div>
            ) : (
                    <div>
                        <h3>Вопрос номер {currentQuestion + 1} из {10}</h3>
                        <h3>{questionsArray[currentQuestion].textQuestion}</h3>
                        <button width="500" onClick={() => SelectChoice(0)}> {questionsArray[currentQuestion].answer1} </button>
                        <button width="500" onClick={() => SelectChoice(1)}> {questionsArray[currentQuestion].answer2} </button>
                        <button width="500" onClick={() => SelectChoice(2)}> {questionsArray[currentQuestion].answer3} </button>
                        <button width="500" onClick={() => SelectChoice(3)}> {questionsArray[currentQuestion].answer4} </button>
                    </div>
                )}
        </div>
        
    );
}

export default Test;