import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../store/auth-context";
import Input from "../UI/Input/Input";

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

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef(); // une reference pour le courriel et une reference pour le mdp puis ajout du Ref Input dans le jsx
  const passwordInputRef = useRef();

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
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value); // here we want to forward the value with emailState.value et enfin dans le jsx au lieu d'avoir  emailIsValid === false ? classes.invalid : "" -> emailState.isValid === false ? classes.invalid : "" (idem pour le value dans le input)
    } else if (!emailIsValid) {
      emailInputRef.current.focus(); // focus sur le courriel
    } else {
      passwordInputRef.current.focus(); // focus sur le mdp
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef} // ajout de la reference
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          {/* <Button type="submit" className={classes.btn} disabled={!formIsValid}> */}
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

// Adding Nested Properties As Dependencies To useEffect
// In the previous lecture, we used object destructuring to add object properties as dependencies to useEffect().

// const { someProperty } = someObject;
// useEffect(() => {
//   // code that only uses someProperty ...
// }, [someProperty]);
// This is a very common pattern and approach, which is why I typically use it and why I show it here (I will keep on using it throughout the course).

// I just want to point out, that they key thing is NOT that we use destructuring but that we pass specific properties instead of the entire object as a dependency.

// We could also write this code and it would work in the same way.

// useEffect(() => {
//   // code that only uses someProperty ...
// }, [someObject.someProperty]);
// This works just fine as well!

// But you should avoid this code:

// useEffect(() => {
//   // code that only uses someProperty ...
// }, [someObject]);
// Why?

// Because now the effect function would re-run whenever ANY property of someObject changes - not just the one property (someProperty in the above example) our effect might depend on.
