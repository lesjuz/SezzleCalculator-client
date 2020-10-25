import React from "react";
import PointTarget from 'react-point'
import {Button} from 'react-bootstrap';


class CalculatorKey extends React.Component {
    render() {
        const { onPress, className, ...props } = this.props

        return (
            <PointTarget onPoint={onPress}>
                <Button className={`calculator-key ${className}`} {...props}/>
            </PointTarget>
        )
    }
}
export default CalculatorKey;