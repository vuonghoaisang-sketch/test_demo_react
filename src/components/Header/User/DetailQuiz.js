import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../../services/apiServices";
import "./DetailQuiz.scss";
import _ from "lodash";
import Question from "./Question";
import ModelResult from "./ModelResult";
import RightContent from "./Content/RightContent";
const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();
  const [dataQuiz, setdataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowMoDalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});
  useEffect(() => {
    fetchQuestions();
  }, [quizId]);
  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          answers = _.orderBy(answers, ["id"], ["asc"]);
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      setdataQuiz(data);
    }
  };
  const handlePrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };
  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
  };
  const handleFinishQuiz = async () => {
    //     {
    //     "quizId": 1,
    //     "answers": [
    //         {
    //             "questionId": 1,
    //             "userAnswerId": [3]
    //         },
    //         {
    //             "questionId": 2,
    //             "userAnswerId": [6]
    //         }
    //     ]
    // }
    console.log("check dataQuiz: ", dataQuiz);
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        let questionId = question.questionId;
        let userAnswerId = [];

        //todo:userAnswerId
        question.answers.forEach((answer) => {
          if (answer.isSelected === true) {
            userAnswerId.push(+answer.id);
          }
        });
        answers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
      });
      payload.answers = answers;
      let res = await postSubmitQuiz(payload);
      console.log("check res submit: ", res);
      if (res && res.EC === 0) {
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setIsShowModalResult(true);
      } else {
        alert("Something wrongs...");
      }
    }
  };
  const handleCheckbox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz); // deep clone sao chep sau 1 mang ( vi 1 mang no bao gom nhieu mang con...)
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId,
    );
    if (question && question.answers) {
      question.answers = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId,
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setdataQuiz(dataQuizClone);
    }
  };
  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId} : {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="q-body">
          <img src="" alt="" />
        </div>
        <div className="q-content">
          <Question
            index={index}
            handleCheckbox={handleCheckbox}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={() => handlePrev()}>
            Previous
          </button>
          <button className="btn btn-primary mr-3" onClick={() => handleNext()}>
            Next
          </button>
          <button
            onClick={() => handleFinishQuiz()}
            className="btn btn-warning"
          >
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">
        <RightContent
          dataQuiz={dataQuiz}
          handleFinishQuiz={handleFinishQuiz}
          setIndex={setIndex}
        />
      </div>
      <ModelResult
        show={isShowMoDalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
      />
    </div>
  );
};

export default DetailQuiz;
