import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import "./Button.css";

class ButtonComponent extends Component {

    render() {
        return (
            <div>

                <Button className="operator Button GrayButton" name="C" onClick={e => this.props.onClick(e.target.name)}>C</Button>
                <Button className="operator Button GrayButton" name="CE" onClick={e => this.props.onClick(e.target.name)}>CE</Button>
                <Button className="operator Button GrayButton " name="(" onClick={e => this.props.onClick(e.target.name)}>(</Button>
                <Button className="operator Button GrayButton" name=")" onClick={e => this.props.onClick(e.target.name)}>)</Button>
                <br/>

                <Button className="Button BlackButton" name="7" onClick={e => this.props.onClick(e.target.name)}>7</Button>
                <Button className="Button BlackButton" name="8" onClick={e => this.props.onClick(e.target.name)}>8</Button>
                <Button className="Button BlackButton" name="9" onClick={e => this.props.onClick(e.target.name)}>9</Button>
                <Button className="operator Button OrangeButton" name="*" onClick={e => this.props.onClick(e.target.name)}>x</Button><br/>

                <Button className="Button BlackButton" name="4" onClick={e => this.props.onClick(e.target.name)}>4</Button>
                <Button className="Button BlackButton" name="5" onClick={e => this.props.onClick(e.target.name)}>5</Button>
                <Button className="Button BlackButton" name="6" onClick={e => this.props.onClick(e.target.name)}>6</Button>
                <Button className="operator Button OrangeButton" name="-" onClick={e => this.props.onClick(e.target.name)}>-</Button><br/>

                <Button  className="Button BlackButton" name="1" onClick={e => this.props.onClick(e.target.name)}>1</Button>
                <Button className="Button BlackButton" name="2" onClick={e => this.props.onClick(e.target.name)}>2</Button>
                <Button name="3" className="Button BlackButton"  onClick={e => this.props.onClick(e.target.name)}>3</Button>
                <Button className="operator Button OrangeButton" name="+" onClick={e => this.props.onClick(e.target.name)}>+</Button><br/>






                <Button className="operator Button GrayButton" name="." onClick={e => this.props.onClick(e.target.name)}>.</Button>
                <Button className="Button BlackButton" name="0" onClick={e => this.props.onClick(e.target.name)}>0</Button>
                <Button className="operator Button GrayButton" name="=" onClick={e => this.props.onClick(e.target.name)}>=</Button>
                <Button className="operator Button OrangeButton" name="/" onClick={e => this.props.onClick(e.target.name)}>÷</Button><br/>
            </div>
        );
    }
}


export default ButtonComponent;
