import React, { useEffect, useRef, useContext } from "react";

import classes from "./Cockpit.module.css";
import AuthContext from '../../context/auth-context';
// to manage state use useState
// useEffect-for lifecycle second most important react hook next to useState-a react hook
// useEffect combines functionality of all class based 
// to prevent re rendering in functional based component equivalent to shouldComponentUpdate use React.memo

const Cockpit = (props) => {
  const toggleBtnRef = useRef(null);
  
  // equivalent to static contextType
  const authContext = useContext(AuthContext);
  console.log(authContext.authenticated)

  //runs after every render
  useEffect(() => {
    console.log('[Cockpit.js] useEffect')
    // http request... can be used
    // const timer = setTimeout(() => {
    //   alert('saved data to cloud!')
    // }, 1000)
    // if you want to do some cleanups
    // will run after every render cycle
    // runs before the main useEffect function run but after first render cycle
    toggleBtnRef.current.click();
    return () => {
      //clearTimeout(timer)
      console.log('[Cockpit.js] cleanup work in useEffect')
    }
  }, []) //[props.persons] - add only the one which changes so that useEffect will not run everytime
  // useful for controlling when it will only execute)
  // passing empty array - this effect has no dependencies and will only run if dependencies changes if no dependecies it will not run, will run for the first time as default but will not run after that
  // if there is a dependency pass it in the array argument

// can have multiple useEffect
// no second argument will run every render cycle
useEffect(() => {
  console.log('[Cockpit.js] 2nd useEffect')
  return () => {
    console.log('[Cockpit.js] cleanup work in useEffect')
  }
})

  const classStyle = [];
  let btnClass = "";

  if (props.showPersons) {
    btnClass = classes.Red;
  }

  if (props.personsLength <= 2) {
    classStyle.push(classes.red); //classStyle = ['red']
  }
  if (props.personsLength <= 1) {
    classStyle.push(classes.bold); //classStyle = ['red','bold']
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={classStyle.join(" ")}> This is really working! </p>
      <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>
     
        <button onClick={authContext.login}>Log in</button>
      
    </div>
  );
};

export default React.memo(Cockpit);
