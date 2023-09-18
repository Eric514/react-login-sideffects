import React, { useRef } from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  const inputRef = useRef();

  const activate = () => {
    // inputRef.current.focus();
    inputRef.current.focus({ preventScroll: true });
  };

  return (
    <div
      className={`${classes.control} ${
        // emailIsValid === false ? classes.invalid : ""
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        // value={enteredEmail}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default Input;
