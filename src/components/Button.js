import React from "react";
import './Button.scss';

function Button(props){
    const {className ='', ...buttonProps} = props;
    return <button {...buttonProps} className={'custom-button ' + className }/>
}

export default Button;