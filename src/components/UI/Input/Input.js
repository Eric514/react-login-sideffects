import React, { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  // useImperativeHandle() permet de définir une fonction qui sera accessible depuis l'extérieur du composant
  // 1er argument: la référence vers le composant
  // 2ème argument: une fonction qui retourne un objet qui contient les fonctions que l'on souhaite rendre accessible depuis l'extérieur du composant
  useImperativeHandle(ref, () => {
    return {
      focus: activate, // pointe vers la fonction aqctivate accessible a l'exterieur par 'focus' (choix perso du nom 'focus')
    };
  });

  return (
    <div
      className={`${classes.control} ${
        // emailIsValid === false ? classes.invalid : ""
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        // value={enteredEmail}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
