import React from "react";
import classes from "../containers/App.module.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";

import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';

//state in class based component - default way
class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
  }

  // can be put inside the constructor
  state = {
    persons: [
      { id: "abc123", name: "Vine", age: 28 },
      { id: "defg456", name: "Marco", age: 29 },
      { id: "hij789", name: "Erin", age: 18 },
    ],
    otherState: "some other value",
    showPersons: false,
    showCockpit: true,
    changedCounter: 0,
    authenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps", props);
    return state;
  }

  // componentWillUnmount() {
  //   console.log('[App.js] componentWillMount')
  // }

  // most important for updating lifecycle
  componentDidMount() {
    console.log("[App.js] componentDidMount");
  }

  // most important for updating lifecycle
  // can be used for performance improvements
  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.js] shouldComponentUpdate");
    return true; // returning false will not update cause we're preventing it
  }

  // most important for updating lifecycle
  componentDidUpdate() {
    console.log("[App.js] componentDidUpdate");
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });
    const person = { ...this.state.persons[personIndex] };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return { 
        persons: persons, 
        changedCounter: prevState.changedCounter + 1 // best practice for changing state that depends on prevState
      };
    })
    } 

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    // spread operator
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    console.log("[App.js] render");
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          isAuthenticated={this.state.authenticated}
        />
      );
    }

    return (
      <Aux>
        {/* Add button just to demonstrate how to remove cockpit and trigger use effet */}
        <button
          onClick={() => {
            this.setState({ showCockpit: false });
          }}
        >
          Remove Cockpit
        </button>
        <AuthContext.Provider value={ { authenticated: this.state.authenticated,
           login: this.loginHandler } }>
        {this.state.showCockpit ? (
          <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonHandler}
            login={this.loginHandler}
          />
        ) : null}
        {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, classes.App);
