import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiServices";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
const TableQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const [isShowModDalUpdate, setIsShowModalUpdate] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  useEffect(() => {
    fetchListQuiz();
  }, []);

  const fetchListQuiz = async () => {
    let res = await getAllQuizForAdmin();
    console.log("res", res);
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };
  const handleUpdate = (item) => {
    setDataUpdate(item);
    setIsShowModalUpdate(true);
  };
  const handleDelete = (item) => {
    setDataDelete(item);
    setIsShowModalDelete(true);
  };
  return (
    <>
      <div>List Quizzes: </div>
      <table className="table table-hover table-bordered my-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td style={{ display: "flex", gap: "15px" }}>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalUpdateQuiz
        show={isShowModDalUpdate}
        setShow={setIsShowModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        fetchQuiz={fetchListQuiz}
      />
      <ModalDeleteQuiz
        show={isShowModalDelete}
        setShow={setIsShowModalDelete}
        dataDelete={dataDelete}
        fetchQuiz={fetchListQuiz}
      />
    </>
  );
};
export default TableQuiz;
