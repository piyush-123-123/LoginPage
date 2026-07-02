import React, { useState, useReducer, useEffect ,useContext ,useRef} from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.payload, isValid: action.payload.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type == "USER_PASS") {
  return {value:action.payload,isValid:action.payload.length>6}
  }
  if (action.type == "PASS_BLUR"){
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
}

const Login = (props) => {

  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null
  });

  //const InputRef=useRef(null);
  //useEffect(()=>{
   // InputRef.current.focus();
  //},[]);
  const emailRef=useRef();
  const passwordRef=useRef();

  const {isValid:emailValid}=emailState;
  const {isValid:passwordValid}=passwordState;


  useEffect(()=>{
   const timer=setTimeout(()=>{
    console.log("Checking form");
    setFormIsValid(emailState.isValid && passwordState.isValid);
   })

  },[emailValid,passwordValid])
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", payload: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_PASS", payload: event.target.value })
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "PASS_BLUR" });
  };

  const authCtx=useContext(AuthContext);
  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
    authCtx.onLogin(emailState.value, passwordState.value);}
    else if(!emailValid){
        emailRef.current.focus();
    }else{
        passwordRef.current.focus();
    }
  };

  
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
   
         type="email" id="email" label="E-Mail"
         value={emailState.value}
         ref={emailRef}
         onChange={emailChangeHandler}
         onBlur={validateEmailHandler}
         />
         <Input     
         type="password" id="password" label="Password"
         value={passwordState.value}
         ref={passwordRef}
         onChange={passwordChangeHandler}
         onBlur={validatePasswordHandler}
         />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
