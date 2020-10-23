import React, { useState } from 'react';

import ButtonComponent from "../Button/ButtonComponent";
import Display from "../Display/Display";
import "./Calculator.css"
import chatAPI from "../../services/chatapi";
import {randomColor} from "../../utils/common";
import {Col, Container, Row} from "react-bootstrap";
import SockJsClient from "react-stomp";
import Messages from "../Messages";

import LoginForm from "../LoginForm";


const SOCKET_URL = 'http://localhost:8080/ws-chat/';


const Calculator =()=> {


    const [messages, setMessages] = useState([])
    const [user, setUser] = useState(null)
    const [result,setResult]=useState("")


    let onConnected = () => {
        console.log("Connected!!")
    }

    let onMessageReceived = (msg) => {
        chatAPI.getMessages().then(res => {
            setMessages(res.data);
        }).catch(err => {
            console.log('Error Occured while sending message to api');
        })

    }

    let onSendMessage = (msgText) => {
        chatAPI.sendMessage(user.username, msgText).then(res => {
        }).catch(err => {
            console.log('Error Occured while sending message to api');
        })
    }

    let handleLoginSubmit = (username) => {


        setUser({
            username: username,
            color: randomColor()
        })

    }

    let onClick = button => {

        if(button === "="){
            calculate()
            reset()
        }

        else if(button === "C"){
            reset()
        }
        else if(button === "CE"){
            backspace()
        }

        else {
            setResult(result + button)
        }
    };
    let reset = () => {
        setResult("");
    };

    let backspace = () => {
        setResult(result.slice(0, -1))
    };
    let calculate = () => {
        try {
            if(result !== "")
            {// eslint-disable-next-line
                setResult( (eval(result) || "" ) + ""
                )
                // eslint-disable-next-line
                let expression = result + "="+ eval(result);
                onSendMessage(expression);

            }
        } catch (e) {
            setResult("error")

        }


    };


    return (
        <div>
            <Container>
                <Row className="rows">
                    <Col className="columns" lg={12} >
                        <h1 className="App-header">Sezzle App</h1>
                    </Col>
                </Row>
                <Row className="rows">
                    {!!user ?
                        (
                            <>

                                <SockJsClient
                                    url={SOCKET_URL}
                                    topics={['/topic/group']}
                                    onConnect={onConnected}
                                    onMessage={msg=>onMessageReceived(msg)}
                                    debug={false}
                                />
                                <Col className="columns" lg={6} sm={12}>

                                    <h2>Calculator</h2>
                                    <div className="Calculator">
                                        <Display display={result}/>
                                        <ButtonComponent onClick={onClick}/>
                                    </div>
                                </Col>
                                <Col className="columns" lg={6} sm={12}>
                                    <h2>Chats</h2>
                                    <Messages
                                        messages={messages}
                                        currentUser={user}
                                    />
                                </Col>
                            </>
                        ) :
                        <Col className="columns" lg={12} >
                            <LoginForm onSubmit={handleLoginSubmit} />
                        </Col>

                    }

                </Row>
            </Container>

        </div>


    )

}

export default Calculator;