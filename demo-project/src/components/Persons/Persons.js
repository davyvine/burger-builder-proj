import React, { PureComponent } from "react";

import Person from "./Person/Person";
import AuthContext from "../../context/auth-context";

//Pure Component - normal component that already implement shouldComponentUpdate with a complete props check

class Persons extends PureComponent {
  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Persons.js] getDerivedStateFromProps')
  //   return state; // no state just empty object
  // }

  // componentWillReceiveProps(props) {
  //   console.log('[Persons.js] componentWillReceiveProps', props)
  // }

  //upcomingUpdate, upcomingState
  // evaluate code when using this to optimize

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("[Persons.js] shouldComponentUpdate");
  //   // check what changed
  //   if (
  //     nextProps.persons !== this.props.persons ||
  //     nextProps.changed !== this.props.changed ||
  //     nextProps.clicked !== this.props.clicked
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }

  // have to return true or false doing nothing is not an option
  // don't hardcode true or false instead use conditions
  //return true // for now just return true..
  // }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("[Persons.js] getSnapShotBeforeUpdate");
    return { message: "Snapshot!" };
  }

  // should not be used anymore but used in past react versions
  // componentWillUpdate() {

  // }

  // this hook will be used most often
  // after update finished when you need to fetch new data from server
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("[Persons.js] componentDidUpdate");
    console.log(snapshot);
  }

  // Useful for cleanups work
  componentWillUnmount() {
    console.log("[Persons.js] componentWillUnmount");
  }

  render() {
    console.log("[Persons.js] rendering . . .");
    return(

    this.props.persons.map((person, index) => {
      return (
        <Person
          key={person.id}
          click={() => this.props.clicked(index)}
          name={person.name}
          age={person.age}
          changed={(event) => this.props.changed(event, person.id)}
        />
      );
    })
    )
  }
}

// const persons = (props) => {
//   console.log("[Person.js] rendering . . .");

//   return props.persons.map((person, index) => {
//     return (
//       <Person
//         key={person.id}
//         click={() => props.clicked(index)}
//         name={person.name}
//         age={person.age}
//         changed={(event) => props.changed(event, person.id)}
//       />
//     );
//   });
// };

export default Persons;
