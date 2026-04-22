//class component
//function component
import React from "react";
import AddUserinfor from "./AddUserinfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
  state = {
    listUser: [
      { id: 1, name: "Hoi Dan IT", age: "30" },
      { id: 2, name: "Eric", age: "40" },
      { id: 3, name: "Dev", age: "50" },
    ],
  };
  handleAddNewUser = (userObj) => {
    console.log(">>>>Checkdata:", userObj);
    this.setState({
      listUser: [userObj, ...this.state.listUser],
    });
  };
  handleDeleteUser = (userID) => {
    let listUserClone = this.state.listUser;
    listUserClone = listUserClone.filter((item) => item.id !== userID);
    this.setState({
      listUser: listUserClone,
    });
  };
  //JSX
  render() {
    //DRY: don't repeat yourself
    const test = { name: "eric", age: 45 };
    return (
      <>
        {JSON.stringify(test)}
        <div>
          <AddUserinfor handleAddNewUser={this.handleAddNewUser} />
          <br /> <br />
          <DisplayInfor
            listUser={this.state.listUser}
            handleDeleteUser={this.handleDeleteUser}
          ></DisplayInfor>
        </div>
        <div className="b"></div>
      </>
    );
  }
}

export default MyComponent;
