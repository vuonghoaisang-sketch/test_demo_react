import React from "react";
import Userinfor from "./AddUserinfor";
import { use } from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";

class DisplayInfor extends React.Component {
  state = {
    isShowListUser: true,
  };
  handleShowHide = () => {
    this.setState({
      isShowListUser: !this.state.isShowListUser,
    });
  };
  render() {
    const { listUser } = this.props;
    console.log(listUser);
    //props=>viet tat properties
    return (
      <div className="display-infor-container">
        {/* <img src={logo} /> */}
        <div>
          <span
            onClick={() => {
              this.handleShowHide();
            }}
          >
            {this.state.isShowListUser === true
              ? "Hide list users: "
              : "show list users:"}
          </span>
        </div>
        {this.state.isShowListUser && (
          <div>
            {listUser.map((user) => {
              return (
                <div key={user.id} className={+user.age > 40 ? "green" : "red"}>
                  <div>
                    <div>My name's {user.name}</div>
                    <div>My age's {user.age} </div>
                  </div>
                  <div>
                    <button
                      onClick={() => this.props.handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                  <p></p>
                  <hr />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
export default DisplayInfor;
