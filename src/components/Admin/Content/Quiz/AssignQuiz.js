import Select from "react-select";
import { useState, useEffect } from "react";
import {
  getAllQuizForAdmin,
  getAllUsers,
  postAssignQuiz,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";
const AssignQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    fetchListQuiz();
    fetchUser();
  }, []);

  const fetchListQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}-${item.name}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };
  const fetchUser = async () => {
    let res = await getAllUsers();
    if (res && res.EC === 0) {
      let users = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}-${item.username}-${item.email}`,
        };
      });
      setListUser(users);
    }
  };
  const handleAssign = async () => {
    let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      //   setSelectedQuiz({});
      //   setSelectedUser({});
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="assign-quiz-container row">
      {" "}
      <div className="col-6 form group">
        <label className="mb-2">Select Quiz:</label>
        <Select
          classNamePrefix="select"
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "white",
            }),

            menu: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "white",
              zIndex: 9999,
            }),

            menuList: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "white",
            }),

            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: state.isFocused ? "#ddd" : "white",
              color: "black",
              cursor: "pointer",
            }),
          }}
        />
      </div>
      <div className="col-6 form group">
        <label className="mb-2">Select Quiz:</label>
        <Select
          classNamePrefix="select"
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "white",
            }),

            menu: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "white",
              zIndex: 9999,
            }),

            menuList: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "white",
            }),

            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: state.isFocused ? "#ddd" : "white",
              color: "black",
              cursor: "pointer",
            }),
          }}
        />
      </div>
      <div className="btn btn-warning mt-3" onClick={() => handleAssign()}>
        Assign
      </div>
    </div>
  );
};
export default AssignQuiz;
