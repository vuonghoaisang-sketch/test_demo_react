//class component
//function component
import React from "react";

class MyComponent extends React.Component {
  state = {
    name: "Eric",
    address: "Hoi dan it",
    age: 26,
  };
  handleClick(event) {
    console.log("Click me okey");
    console.log("random", Math.floor(Math.random() * 100 + 1));
  }
  handleOnMoverOver(event) {
    console.log(event.pageX);
  }
  handleOnchangeInput = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };
  //JSX
  render() {
    return (
      <div>
        my name is {this.state.name} and I'm from {this.state.address}
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <input
            type="text"
            onChange={(event) => this.handleOnchangeInput(event)}
          ></input>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default MyComponent;
