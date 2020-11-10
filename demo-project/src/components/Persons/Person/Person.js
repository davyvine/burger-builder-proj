// built in Aux component=React.Fragment in new versions of React 16.x
import React, { Component } from "react";
import PropTypes from 'prop-types';
//import Person from './Person.css'
//import styled from "styled-components";
//import Radium from 'radium';
import classes from "./Person.module.css";
import AuthContext from '../../../context/auth-context';


//Aux is an empty wrapper, when you want to have adjacent elements without an extra DOM element being rendered to the real DOM
import Aux from "../../../hoc/Aux";

import withClass from '../../../hoc/withClass';

// const StyledDiv = styled.div`
//   width: 60%;
//   margin: 16px auto;
//   border: 1px solid #eee;
//   box-shadow: 0 2px 3px #ccc;
//   padding: 16px;
//   text-align: center;

//   @media (min-width: 500px) {
//     .Person {
//       width: 450px;
//     }
//   }
// `;

class Person extends Component {
  constructor(props) {
    super(props)
    this.inputElementRef = React.createRef(); // newer version
  }

  // special static property, static means can be accessed outside without instantiating
  // used in class based components not available in functional components
  static contextType = AuthContext; // allows react to automatically trigger context behind the scene 

  componentDidMount() {
    this.inputElementRef.current.focus();
    console.log(this.context.authenticated);
  }

  render() {
    console.log("[Person.js] rendering . . . ");
    return (
    //<div className='Person' style={style}>
    //<div className={classes.Person}>

    <Aux>
      
          {this.context.authenticated ?  <p>Authenticated!</p> : <p>Please log in</p>}
       
      <p key="i1" onClick={this.props.click}>
        I'm {this.props.name} and I am {this.props.age} years old!
      </p>
      <p key="i2">{this.props.children}</p>
      <input
        key="i3"
       // ref={(inputEl) => {this.inputElement = inputEl}} //older version
       ref={this.inputElementRef}
        type="text"
        onChange={this.props.changed}
        value={this.props.name}
      />
    </Aux>
    );
    //</div>

  }
}

// Provide info about the props that you are using
Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
}

//converted functional component into class based component
// props.var will be this.props in class based
//const person = (props) => {
// not needed when using styled components
//   const style = {
//     "@media (min-width: 500px)": {
//       width: "450px",
//     },
//   };

// return (
//   //<div className='Person' style={style}>
//   <div className={classes.Person}>
//     <p onClick={props.click}>
//       I'm {props.name} and I am {props.age} years old!
//     </p>
//     <p>{props.children}</p>
//     <input type="text" onChange={props.changed} value={props.name} />
//   </div>
// );
// }

// update person to Person when using classBased
export default withClass(Person, classes.Person);
