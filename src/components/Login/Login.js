import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  // argument: notre last state et l'action qui etait dispatché et on return un nouveau state ici on decide de retourner un objet
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") }; // on update value et isValid when ever i receive USER_INPUT
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") }; //utilisation du dernier state que React nous fournit, donc j'aurais la derniere valeur qui a ete entré pour l'adresse courriel and et pour la validité j'utilise isValid: state.value.includes('@')
  }
  return { value: "", isValid: false }; // default state
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false }; // default state
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // premier argument, je pointe vers ma fonction (emailState), cette fonction peut etre declaré en dehors du compiosant. En deuxieme argument on met notre state initial soit: {value: "",isValid: false,} c'est notre state initial pour notre emailState snapshot
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      // this clean up function runs before the useEffect function runs but not before the first time it runs!
      console.log("EFFECT CLEANUP");
    };
  }, []); // if i had an empty array here, so no dependencies, effect would run once and the cleanup function would run when the component is removed (if im logged in)

  const { isValid: emailIsValid } = emailState; // assignation a un alias pour la destructuration de l'objet afin de storer la valeur
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking form validity!");
      setFormIsValid(
        // enteredEmail.includes("@") && enteredPassword.trim().length > 6
        // emailState.isValid && passwordState.isValid
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      // clean up function when useEffect execute the next time
      console.log("CLEAN-UP");
      clearTimeout(identifier); // clearTimeout function built-in the browser, i clear the timer out.
    };
    // }, [enteredEmail, enteredPassword]); // si nos dependances changent
    // }, [emailState, passwordState]);
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value }); // val to save what user intered (a payload to this action)
    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   // enteredEmail.includes("@") && event.target.value.trim().length > 6
    //   // emailState.value.includes("@") && event.target.value.trim().length > 6 // emailState.value c'est ici que l'on va stocker la valeur entrée par l'utilisateur
    //   emailState.isValid && event.target.value.trim().length > 6 // utilisation de isValid pour simplifier
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes("@"));
    // setEmailIsValid(enteredEmail.isValid); // utilisation de isValid pour simplifier
    dispatchEmail({ type: "INPUT_BLUR" }); // dispatch d'une action sur validateEmailHandler egalement ici pas besoin de value
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(enteredEmail, enteredPassword);
    props.onLogin(emailState.value, passwordState.value); // here we want to forward the value with emailState.value et enfin dans le jsx au lieu d'avoir  emailIsValid === false ? classes.invalid : "" -> emailState.isValid === false ? classes.invalid : "" (idem pour le value dans le input)
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            // emailIsValid === false ? classes.invalid : ""
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            // value={enteredEmail}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            // passwordIsValid === false ? classes.invalid : ""
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            // value={enteredPassword}
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
