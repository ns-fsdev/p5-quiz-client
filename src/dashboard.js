import logo from './logo.svg';
import './App.css';

import React, {useEffect, useState} from "react";

import { Button, List, Collapse, Breadcrumb } from 'antd';
const { Panel } = Collapse;


function Dashboard() {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [questions, setQuestions] = useState();

    const [questionTxt, setQuestionTxt] = useState('');

    const [token, setToken] = useState();

    const [userId, setUserId] = useState();

    let apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';


    const fetchCategories = async () => {
        console.log('this will fetch the categories');

        // let res = await fetch('http://localhost:3000/api/v1/categories');
        //   https://cohort11a-capstone-api.herokuapp.com
        //   console.log(process.env.API_URL)
        //   console.log(process.env.REACT_APP_API_URL)
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

    const isLoggedIn = () => {
        if(localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));

            fetchUserId()

            return true;
        } else {
            return false;
        }

    };

    useEffect(() => {
        // this code will run only once on component mount
        if(isLoggedIn()){
            fetchCategories()
        } else {
            window.location.href = '/'
        }
    }, [])

    useEffect(() => {
        // this code is going to run whenever the selectedCategory changes
        // fetchQuestions() TheTodo: fetch and show the questions
    }, [selectedCategory])

    // useEffect(() => {
    //   // this code will run every time the someStateVariable changes
    //   // this code will run every time var2 OR someStateVariable changes
    //   // write code here that reloads the page as a side effect of var2 OR someStateVariable changing
    // }, [someStateVariable, var2])


    const fetchQuestionsForCategory = async (id) => {
        console.log('fetch questions for this category id', id);
        console.log('userId', userId)
        let res = await fetch(`http://localhost:3000/api/v1/categories/${id}/questions?token=${token}&userId=${userId}`);
        let data = await res.json();
        console.log(data);
        data = data.reverse()
        setQuestions(data);
        // setCategories(data);

    };

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

        // the usual fetch request / HINT : look up the stock API request
        // 1. Make a POST request to create a question
        // 2. Once the call is successful
        // 3. Fetch the questions for a category again (reload the questions)
        // 4. done!
    };


    const createANewAnswer = async () => {
        // you will need something called selectedQuestion to keep a track of the question that has been selected
        // a state variable to store the answer text that the user types in

        // the usual fetch request / HINT : look up the stock API request
        // 1. Make a POST request to create an answer
        // 2. Once the call is successful
        // 3. Fetch the questions for a category again (reload the questions)
        // 4. done!


        // - Try to delete the question
        // Try to delete an answer
    };

    const logout = async () => {
        localStorage.removeItem('token');
        window.location.href = '/';

    };


    // 1. Hide the Ui unless the user is logged in


    return (
        <>
            <div className="grid grid-cols-12">
                <div className={'col-span-full border p-5'}>
                    <h1 className={'text-center text-3xl'}>
                        Questions App

                        &nbsp;&nbsp;<Button onClick={logout}>Log out</Button>
                    </h1>
                </div>

            </div>

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
                        header={<div className={'font-bold'}>Categories List</div>}
                        // footer={<div>Footer</div>}
                        bordered
                        dataSource={categories}
                        renderItem={category => <List.Item>
                            <div className={category.id == selectedCategory ? 'cursor-pointer text-blue-500 font-bold' : 'cursor-pointer'} onClick={() => {
                                setSelectedCategory(category.id);
                                fetchQuestionsForCategory(category.id)
                            }}>
                                {category.name}
                            </div>

                        </List.Item>}
                    />


                </div>

                <div className={'col-span-full md:col-span-9 lg:col-span-10 border p-5'}>

                    {/*<button className={'border p-2 pl-4 pr-4 bg-gray-200'} onClick={createNewQuestion}>New Question</button>*/}

                    {/*<Breadcrumb>*/}
                    {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>*/}
                    {/*        <a href="">Application Center</a>*/}
                    {/*    </Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>*/}
                    {/*        <a href="">Application List</a>*/}
                    {/*    </Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>An Application</Breadcrumb.Item>*/}
                    {/*</Breadcrumb>*/}


                    <div className={'border h-80'}>
                        <h1 className={'text-4xl'}>this is a box</h1>
                        <h1 className={'text-4xl'}>this is a box</h1>
                        <h1 className={'text-4xl'}>this is a box</h1>
                        <h1 className={'text-4xl'}>this is a box</h1>
                        <h1 className={'text-4xl'}>this is a box</h1>
                        <h1 className={'text-4xl'}>this is a box</h1>
                        <h1 className={'text-4xl'}>this is a box</h1>
                        <h1 className={'text-4xl'}>this is a box</h1>
                        <h1 className={'text-4xl'}>this is a box</h1>
                        <h1 className={'text-4xl'}>this is a box</h1>
                        <h1 className={'text-4xl'}>this is a box</h1>

                    </div>

                    <br/>
                    <br/>
                    <br/>
                    {selectedCategory && <div>
                        <input value={questionTxt} onChange={(ev) => {
                            setQuestionTxt(ev.currentTarget.value);
                        }} type="text" className={'border p-1 mr-5 w-2/3'}/>
                        <Button type={'primary'} onClick={createNewQuestion}>Create new question</Button>
                        <br/>
                        <br/>
                    </div>}


                    {/*<ul>*/}
                    {/*    {questions && questions.map((question) => {*/}
                    {/*        return <li key={question.id}>*/}
                    {/*            /!*{question.questionTxt} - {question.Answers.length}*!/*/}
                    {/*            {question.questionTxt} {question.Answers.length >0 && <span>- <span>{question.Answers.length}</span></span>}*/}
                    {/*        </li>*/}
                    {/*    })}*/}
                    {/*</ul>*/}



                    {selectedCategory && <Collapse accordion>
                        {questions && questions.map((question, index) => {
                            return <Panel header={question.questionTxt} key={index}>


                                <List
                                    size="small"
                                    // header={<div className={'font-bold'}>Answers List</div>}
                                    footer={<div>
                                        <input value={questionTxt} onChange={(ev) => {
                                            setQuestionTxt(ev.currentTarget.value);
                                        }} type="text" className={'border p-1 mr-5 w-2/3'}/>
                                        <Button type={'primary'} onClick={createANewAnswer}>Add Answer</Button>
                                    </div>}
                                    bordered
                                    dataSource={question.Answers}
                                    renderItem={answer => <List.Item>
                                        <div>
                                            {answer.answerTxt}
                                        </div>

                                    </List.Item>}
                                />


                            </Panel>
                        })}
                    </Collapse>}

                    {!selectedCategory && <h1 className={'text-center text-xl uppercase tracking-wider text-blue-500'}>Select a category to get started</h1>}

                    {/*{questions && <p>{JSON.stringify(questions)}</p>}*/}
                </div>

            </div>

        </>
    );
}

export default Dashboard;
