/*
   Quiz-CLIENT
   Dashboard.js

   after authentication ,
   dashboard.js is called - shows main body of app
*/



import './App.css';

import React, {useEffect, useState} from "react";

import { Button, List, Collapse } from 'antd';
import { CloseCircleTwoTone } from '@ant-design/icons';
const { Panel } = Collapse;


function Dashboard() {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();

    const [questions, setQuestions] = useState();
    const [questionTxt, setQuestionTxt] = useState('');



    const [questionId, setQuestionId] = useState();
    const [answerTxt, setAnswerTxt] = useState('');
    const [answers, setAnswers] = useState();

    const [token, setToken] = useState();

    const [userId, setUserId] = useState();
    // HEROKU env var for React App URL
    let apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000' ;


    const fetchCategories = async () => {
        console.log('call fetchCategories');

        // let res = await fetch('http://localhost:3000/api/v1/categories');
        //   https://cohort11a-capstone-api.herokuapp.com

        console.log(`${apiUrl}/api/v1/categories`)
        let res = await fetch(`${apiUrl}/api/v1/categories?token=${localStorage.getItem('token')}`);
        let data = await res.json();
        console.log(data);
        setCategories(data);
    };

    const fetchUserId = async () => {
        let userRes = await fetch(`${apiUrl}/api/v1/users/me?token=${localStorage.getItem('token')}`);
        let u = await userRes.json()
        console.log('the current user is', u);
        setUserId(u.userId);
    };


    /*    LOGIN Status    */
    const isLoggedIn = () => {
        if(localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));

            fetchUserId()

            return true;
        } else {
            return false;
        }

    };
    // get Categories, loads once only on app start
    useEffect(() => {

        if(isLoggedIn()){
            fetchCategories()
        } else {
            window.location.href = '/'
        }
    }, [])


    useEffect(() => {
        // this code is going to run whenever the selectedCategory changes

    }, [selectedCategory])



    const fetchQuestionsForCategory = async (id) => {
        console.log('fetch questions for this category id', id);
        console.log('userId', userId)
        let res = await fetch(`${apiUrl}/api/v1/categories/${id}/questions?token=${token}&userId=${userId}`);
        let data = await res.json();
        console.log(data);
        setQuestions(data);


    };

    // ADD QUESTION     -    call server
    const createNewQuestion = async () => {
        console.log('create a question for the category id', selectedCategory)

        let res = await fetch(`${apiUrl}/api/v1/categories/${selectedCategory}/questions?token=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({questionTxt: questionTxt, userId: userId})
        });
        fetchQuestionsForCategory(selectedCategory);
        setQuestionTxt('')

    };


    //  ADD ANSWER
    const createANewAnswer = async () => {

        console.log('call createNewAnswer')
        console.log('quest id')
        console.log(questionId)
        let res = await fetch(`${apiUrl}/api/v1/categories/${selectedCategory}/questions/${questionId}/answers?token=${token}`, {
          method: 'POST',
          headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
          body: JSON.stringify({answerTxt: answerTxt, questionId: questionId})
        });

        fetchQuestionsForCategory(selectedCategory);
        setAnswerTxt('')
    };


    //  DELETE ANSWER
    const deleteAnswer = async (answer_id) => {

        console.log('call deleteAnswer')
        console.log('sel category ', selectedCategory)
        let res = await fetch(`${apiUrl}/api/v1/categories/${selectedCategory}/answers?token=${token}`, {
            method: 'DELETE',
            headers: {
                      'Content-Type': 'application/json'
                     },
            body: JSON.stringify( {answerId: answer_id} )
        });

        fetchQuestionsForCategory(selectedCategory);
    };


    //  DELETE QUESTION
    const deleteQuestion = async (question_id) => {
      console.log('Calling deleteQuestion,  ques ID: ', question_id);

        let res = await fetch(`${apiUrl}/api/v1/categories/${selectedCategory}/questions?token=${token}`, {
            method: 'DELETE',
            headers: {
                      'Content-Type': 'application/json'
                     },
            body: JSON.stringify( {questionId: question_id} )
        });

        fetchQuestionsForCategory(selectedCategory);
    };



    //    LOGOUT
    const logout = async () => {
        localStorage.removeItem('token');
        window.location.href = '/';

    };



     //  return  USER Interface  UI


    return (
        <>
            {/* TITLE BAR */}
            <div className="grid grid-cols-12">
                <div className={'col-span-full border p-5'}>
                    <h1 className={'text-center text-3xl'}>
                        Questions App

                        &nbsp;&nbsp;<Button onClick={logout}>Log out</Button>
                    </h1>
                </div>

            </div>


            {/*   CATEGORY WINDOW (Left)   */}
            <div className="grid grid-cols-12">

                <div className={'col-span-full md:col-span-3 lg:col-span-2 border p-5'}>


                    {/*<Button type={'primary'}>Submit</Button>*/}
                    {/*<h1 className={'text-center text-3xl'}>Currently selected category is: {selectedCategory}</h1>*/}
                    {/*  <ul>*/}
                    {/*      {categories.map((category, index) => {*/}
                    {/*          return <li key={index} className={category.id == selectedCategory ? 'border p-5 cursor-pointer bg-gray-200' : 'border p-5 cursor-pointer'} onClick={() => {*/}
                    {/*              setSelectedCategory(category.id);*/}
                    {/*              fetchQuestionsForCategory(category.id)*/}
                    {/*          }}>*/}
                    {/*              {category.name}*/}
                    {/*          </li>*/}
                    {/*      })}*/}
                    {/*  </ul>*/}



                    <List
                        size="large"
                        header={<div className={'font-bold'}> Categories List </div>}
                        bordered
                        dataSource={categories}
                        renderItem={category => <List.Item>
                                                <div className={category.id == selectedCategory ? 'cursor-pointer text-blue-500 font-bold' : 'cursor-pointer'} onClick={() => {
                                                     setSelectedCategory(category.id);
                                                    fetchQuestionsForCategory(category.id)
                                                }}>
                                                {category.name}
                                                </div>

                                                </List.Item> }
                    />


                </div>


                {/* QUESTIONS Window */}
                <div className={'col-span-full md:col-span-9 lg:col-span-10 border p-5'}>




                    <br/>
                    <br/>
                    <br/>

                    {selectedCategory &&
                        <div>
                                {/* INPUT FIELD and  BUTTON -  Create New Question  */}
                                <input value={questionTxt} onChange={(ev) => {
                                    setQuestionTxt(ev.currentTarget.value);
                                }}
                                type="text" className={'border p-1 mr-5 w-2/3'}/>
                                <Button type={'primary'} onClick={createNewQuestion}>Create new question</Button>
                                <br/>
                                <br/>
                        </div>
                    }





                    {/*      DISPLAY QUES ACCORDION        */}

                    {selectedCategory && <Collapse accordion>
                        {questions && questions.map((question, index) => {

                            /*      DISPLAY QUESTION text      */

                            return <Panel
                                        header= {<div>
                                                    {question.questionTxt}
                                                </div>}
                                        key={index}>


                                {/*  ANSWER Input and Button */}
                                <List
                                    size="small"
                                    // header={<div className={'font-bold'}>Answers List</div>}
                                    footer={<div>
                                                <input value={answerTxt} onChange={(ev) => {
                                                  setAnswerTxt(ev.currentTarget.value);
                                                  setQuestionId(question.id)
                                                  }}
                                                  type="text" className={'border p-1 mr-5 w-2/3'}/>

                                                <Button type={'primary'} onClick={createANewAnswer}> Add Answer </Button>

                                                <Button type={'primary'} onClick={ ()=> { deleteQuestion(question.id) }}> Delete Ques </Button>

                                            </div> }
                                    // bordered
                                    dataSource={question.Answers}
                                    renderItem={answer =>  <List.Item>
                                                              {/*       DISPLAY ANSWER   &  DELETE ICON      */}
                                                              <div>
                                                                    <div> {answer.answerTxt}  <CloseCircleTwoTone onClick={() => {

                                                                        deleteAnswer(answer.id);

                                                                      }} />
                                                                    </div>
                                                                    {/* <div> {answer.id} </div>  */}
                                                              </div>
                                                           </List.Item>}
                                />


                            </Panel>
                        })}
                    </Collapse>}

                    {!selectedCategory && <h1 className={'text-center text-xl uppercase tracking-wider text-blue-500'}>Select a category to get started</h1>}

                </div>

            </div>

        </>
    );
}

export default Dashboard;

{/* End */}
