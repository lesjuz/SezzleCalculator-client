import React, {useEffect, useState} from 'react';


import "./Calculator.css"
import "../Button/Button.css";
import {Col, Container, Row} from "react-bootstrap";

import CalculatorDisplay from "../Display/Display";
import CalculatorKey from "../Button/CalculatorKey";
import CalculatorOperations from "./Operation";
import chatAPI from "../../services/chatapi";
import {randomColor} from "../../utils/common";
import LoginForm from "../LoginForm";
import Messages from "../Messages";
import SockJsClient from "react-stomp";


const SOCKET_URL = 'https://sezzle-cal-server.herokuapp.com/ws-chat/';


const Calculator=()=> {

    const [messages, setMessages] = useState([])
    const [user, setUser] = useState(null)
    const [value,setValue]=useState(null)
    const [displayValue, setDisplayValue] = useState('0')
    const [operator, setOperator] = useState(null)
    const [waitingForOperand,setWaitingForOperand]=useState(false)


    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    })

    let clearAll= ()=>{

        setValue(null)
        setDisplayValue("0")
        setOperator(null)
        setWaitingForOperand(false)
    }

    let clearDisplay =()=> {
        setDisplayValue('0')
    }

    let clearLastChar = ()=>{

        let displayValues=displayValue.substring(0, displayValue.length - 1) || '0'
        setDisplayValue(displayValues)
    }

    let toggleSign= ()=> {

        const newValue = parseFloat(displayValue) * -1

        setDisplayValue(String(newValue))
    }

    let inputPercent= ()=> {

        const currentValue = parseFloat(displayValue)

        if (currentValue === 0)
            return

        const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
        const newValue = parseFloat(displayValue) / 100
        const result = newValue.toFixed(fixedDigits.length + 2)
        setDisplayValue(String(result))
        let expression = currentValue + "/100=" +result;
        onSendMessage(expression);

    }

    let inputDot= ()=> {


        if (!(/\./).test(displayValue)) {

            setDisplayValue(displayValue + '.')
            setWaitingForOperand(false)
        }
    }

    let inputDigit=(digit)=> {


        if (waitingForOperand) {

            setDisplayValue(String(digit))
            setWaitingForOperand(false)
        } else {

            setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit)
        }
    }

    let performOperation=(nextOperator)=> {

        const inputValue = parseFloat(displayValue)

        if (value == null) {
            setValue(inputValue)
        } else if (operator) {
            const currentValue = value || 0
            const newValue = CalculatorOperations[operator](currentValue, inputValue)

            setValue(newValue)
            setDisplayValue(String(newValue))
            if(operator!=="="){
                let expression = currentValue + operator+ inputValue +"="+newValue;
                onSendMessage(expression);
            }

        }


        setWaitingForOperand(true)
        setOperator(nextOperator)
    }

    let handleKeyDown = (event) => {
        let { key } = event

        if (key === 'Enter')
            key = '='

        if ((/\d/).test(key)) {
            event.preventDefault()
            inputDigit(parseInt(key, 10))
        } else if (key in CalculatorOperations) {
            event.preventDefault()
            performOperation(key)
        } else if (key === '.') {
            event.preventDefault()
            inputDot()
        } else if (key === '%') {
            event.preventDefault()
            inputPercent()
        } else if (key === 'Backspace') {
            event.preventDefault()
            clearLastChar()
        } else if (key === 'Clear') {
            event.preventDefault()

            if (displayValue !== '0') {
                clearDisplay()
            } else {
                clearAll()
            }
        }
    };
    let onConnected =()=> {
        console.log("Connected!!")
        onMessageReceived()
    }

    let onMessageReceived =()=> {
        chatAPI.getMessages().then(res => {
            setMessages(res.data)
        }).catch(() => {
            console.log('Error Occured while sending message to api');
        })

    }

    let onSendMessage =(msgText)=> {
        chatAPI.sendMessage(user.username, msgText).then(() => {
        }).catch(() => {
            console.log('Error Occured while sending message to api');
        })
    }

    let handleLoginSubmit=(username)=> {
        setUser({
            username: username,
            color: randomColor()
        })


    }








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
                                onMessage={()=>onMessageReceived()}
                                debug={false}
                            />
                                <Col className="columns" lg={6} sm={12}>

                                    <h2>Calculator</h2>
                                    <div className="Calculator">
                                        <CalculatorDisplay value={displayValue}/>
                                        <div>

                                            <CalculatorKey className="operator Button GrayButton" onPress={() =>clearLastChar()}>C</CalculatorKey>
                                            <CalculatorKey className="operator Button GrayButton" onPress={() =>clearAll()}>CA</CalculatorKey>
                                            <CalculatorKey className="operator Button GrayButton" onPress={() =>toggleSign()}>±</CalculatorKey>
                                            <CalculatorKey className="operator Button OrangeButton" onPress={() =>inputPercent()}>%</CalculatorKey>
                                            <br/>
                                            <CalculatorKey className="Button BlackButton" onPress={() => inputDigit(7)}>7</CalculatorKey>
                                            <CalculatorKey className="Button BlackButton" onPress={() => inputDigit(8)}>8</CalculatorKey>
                                            <CalculatorKey className="Button BlackButton" onPress={() => inputDigit(9)}>9</CalculatorKey>
                                            <CalculatorKey className="operator Button OrangeButton" onPress={() => performOperation('*')}>×</CalculatorKey>
                                            <br/>

                                            <CalculatorKey className="Button BlackButton" onPress={() => inputDigit(4)}>4</CalculatorKey>
                                            <CalculatorKey className="Button BlackButton" onPress={() => inputDigit(5)}>5</CalculatorKey>
                                            <CalculatorKey className="Button BlackButton" onPress={() => inputDigit(6)}>6</CalculatorKey>
                                            <CalculatorKey className="operator Button OrangeButton" onPress={() => performOperation('-')}>−</CalculatorKey>
                                            <br/>
                                            <CalculatorKey className="Button BlackButton" onPress={() => inputDigit(1)}>1</CalculatorKey>
                                            <CalculatorKey className="Button BlackButton" onPress={() => inputDigit(2)}>2</CalculatorKey>
                                            <CalculatorKey className="Button BlackButton" onPress={() => inputDigit(3)}>3</CalculatorKey>
                                            <CalculatorKey className="operator Button OrangeButton" onPress={() => performOperation('+')}>+</CalculatorKey>

                                            <br/>
                                            <CalculatorKey className="operator Button GrayButton" onPress={() => inputDot()}>.</CalculatorKey>
                                            <CalculatorKey className="Button BlackButton" onPress={() => inputDigit(0)}>0</CalculatorKey>
                                            <CalculatorKey className="operator Button GrayButton" onPress={() => performOperation('=')}>=</CalculatorKey>
                                            <CalculatorKey className="operator Button OrangeButton" onPress={() => performOperation('/')}>÷</CalculatorKey>


                                        </div>

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


        );

}

export default Calculator;