//class component
//function component
import React from "react";
import Userinfor from "./Userinfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
  //JSX
  render() {
    return (
      <div>
        <Userinfor />
        <br /> <br />
        <DisplayInfor name="Hoi Dan IT" age="30"></DisplayInfor>
      </div>
    );
  }
}

export default MyComponent;
