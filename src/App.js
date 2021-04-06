import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Dashboard from "./dashboard";

import React, {useEffect, useState} from "react";

import {Button, List, Collapse, Breadcrumb, Row, Col, Divider, notification} from 'antd';
const { Panel } = Collapse;



function Auth () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    const onSignIn = async (event) => {
        event.preventDefault();
        console.log(email)
        console.log(password)
        let res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({email, password})
        })
        let data = await res.json();
        console.log(data);
        if(data.token){
            localStorage.setItem('token', data.token);
            window.location.href = '/dashboard'
        }


    };

    const onSignUp = async (event) => {
        event.preventDefault();
        console.log(email)
        console.log(password)
        console.log(retypePassword)
        let res = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({email, password})
        })
        let data = await res.json();
        console.log(data);
        if(data.success){
            // Show a success message use ANT design success message?
            notification['success']({
                message: 'Thanks',
                description:
                    'You are all set. You can now login using your credentials.',
            });

        }

    };

    return (
        <div>

            <h1 className={'text-3xl text-center'}>Login Form</h1>

            <form onSubmit={onSignIn}>
                <Row type={'flex'} align={'center'} className={'mt-5'}>
                    <Col span={24}>
                        <input type="email" value={email} onChange={(ev) => setEmail(ev.currentTarget.value)} required className={'border w-full rounded'} placeholder={'Email address'}/>
                    </Col>
                    <Col span={24} className={'mt-5'}>
                        <input type="password" value={password} onChange={(ev) => setPassword(ev.currentTarget.value)} required className={'border w-full rounded'} placeholder={'Password'}/>
                    </Col>
                    <Col span={24} className={'mt-5'}>
                        <Button htmlType={'submit'} className={'border-0 bg-edorble-yellow-500 hover:bg-edorble-yellow-600 hover:text-black w-full rounded font-bold'}>Submit</Button>
                    </Col>
                </Row>
            </form>


            <Divider />

            <h1 className={'text-3xl text-center'}>Signup Form</h1>

            <form onSubmit={onSignUp}>
                <Row type={'flex'} align={'center'} className={'mt-5'}>
                    <Col span={24}>
                        <input type="email" value={email} onChange={(ev) => setEmail(ev.currentTarget.value)} required className={'border w-full rounded'} placeholder={'Email address'}/>
                    </Col>
                    <Col span={24} className={'mt-5'}>
                        <input type="password" value={password} onChange={(ev) => setPassword(ev.currentTarget.value)} required className={'border w-full rounded'} placeholder={'Password'}/>
                    </Col>
                    <Col span={24} className={'mt-5'}>
                        <input type="password" value={retypePassword} onChange={(ev) => setRetypePassword(ev.currentTarget.value)} required className={'border w-full rounded'} placeholder={'Retype Password'}/>
                        {(password != retypePassword) && <small className={'text-red-500 font-bold'}>Passwords don't match</small>}
                    </Col>
                    <Col span={24} className={'mt-5'}>
                        <Button  htmlType={'submit'} disabled={password != retypePassword} className={'border-0 bg-edorble-yellow-500 hover:bg-edorble-yellow-600 hover:text-black w-full rounded font-bold'}>Submit</Button>
                        {/*<Button loading={loading} disabled={password != retypePassword} type="primary" htmlType={'submit'} className={'border-0 w-full rounded font-bold'}>Submit</Button>*/}
                    </Col>
                </Row>
            </form>

        </div>
    )
}

function App() {


  return (
      <Router>
          <div>

              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Switch>
                  <Route path="/dashboard">
                      <Dashboard />
                  </Route>
                  <Route path="/">
                      <Auth />
                  </Route>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
