import React from "react";

class AddUserinfor extends React.Component {
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
  handleOnchangeAge = (event) => {
    this.setState({
      age: event.target.value,
    });
  };
  handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.props.handleAddNewUser({
      id: Date.now() + "-random",
      name: this.state.name,
      age: this.state.age,
    });
  };
  render() {
    return (
      <div>
        {" "}
        My name is {this.state.name} and I'm {this.state.age}
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <label>Your name: </label>
          <input
            value={this.state.name}
            type="text"
            onChange={(event) => this.handleOnchangeInput(event)}
          ></input>
          <label>Your age: </label>
          <input
            value={this.state.age}
            type="text"
            onChange={(event) => this.handleOnchangeAge(event)}
          ></input>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default AddUserinfor;
