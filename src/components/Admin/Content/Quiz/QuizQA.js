import React, { useEffect } from "react";
import Select from "react-select";
import { useState } from "react";
import "./QuizQA.scss";
import { TbHeartPlus } from "react-icons/tb";
import { TbCirclePlusFilled } from "react-icons/tb";
import { BsPatchMinusFill } from "react-icons/bs";
import _ from "lodash";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import Lightbox from "react-awesome-lightbox";
import { toast } from "react-toastify";
import {
  getAllQuizForAdmin,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuiz,
  getQuizWithQA,
  postUpsertQA,
} from "../../../../services/apiServices";
const QuizQA = (props) => {
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [{ id: uuidv4(), description: "", isCorrect: false }],
    },
  ];
  const [questions, setQuestions] = useState(initQuestions);
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  console.log("CLT", selectedQuiz);
  useEffect(() => {
    fetchListQuiz();
  }, []);
  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
  }, [selectedQuiz]);
  // Source - https://stackoverflow.com/a/38935990
  // Posted by cuixiping, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-07-15, License - CC BY-SA 4.0

  // return a promise that resolves with a File instance
  function urltoFile(url, filename, mimeType) {
    if (url.startsWith("data:")) {
      var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  }

  //Usage example:

  const fetchQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    if (res && res.EC === 0) {
      //convert
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question-${q.id}.png`;
          q.imageFile = await urltoFile(
            `data:image/png;base64,${q.imageFile}`,
            `Question-${q.id}.png`,
            "image/png",
          );
        }
        newQA.push(q);
      }
      setQuestions(newQA);
      console.log("Check rs: ", res);
    }
  };
  const fetchListQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}-${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };
  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [{ id: uuidv4(), description: "", isCorrect: false }],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };
  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }
    if (type === "REMOVE") {
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (item) => item.id !== answerId,
      );
      setQuestions(questionsClone);
    }
  };
  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };
  const handleOnChangeFileQuestion = (questionId, event) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionsClone[index].imageFile = event.target.files[0];
      questionsClone[index].imageName = event.target.files[0].name;
      setQuestions(questionsClone);
    }
  };
  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        },
      );
      setQuestions(questionsClone);
    }
  };

  const handleSubmitQuestionForQuiz = async () => {
    //todo
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz");
      return;
    }
    //validate answer
    let isValidAnswer = true;
    let indexQ = 0,
      indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexA = j;
          break;
        }
      }
      indexQ = i;
      if (isValidAnswer === false) break;
    }
    if (isValidAnswer === false) {
      toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`);
      return;
    }
    //validate question
    let isValidQ = true;
    let indexQ1 = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQ = false;
        indexQ1 = i;
        break;
      }
    }
    if (isValidQ === false) {
      toast.error(`Not empty description for questions ${indexQ1 + 1}`);
      return;
    }
    //submit questions
    let questionsClone = _.cloneDeep(questions);
    for (let i = 0; i < questionsClone.length; i++) {
      if (questionsClone[i].imageFile) {
        questionsClone[i].imageFile = await toBase64(
          questionsClone[i].imageFile,
        );
      }
    }
    let res = await postUpsertQA({
      quizId: selectedQuiz.value,
      questions: questionsClone,
    });
    if (res && res.EC === 0) {
      toast.success(res.EM);
      fetchQuizWithQA();
    }
    console.log(">>> check rs: ", res);

    // toast.success("Create questions and answers success!");
    // setQuestions(initQuestions);
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  const handlePreviewImage = (questionId) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataImagePreview({
        url: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName,
      });
      setIsPreviewImage(true);
    }
  };
  return (
    <div className="questions-container">
      <div className="add-new-question">
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
        <div className="mt-3 mb-2"> Add Questions:</div>
        {questions &&
          questions.length > 0 &&
          questions.map((q, index) => {
            return (
              <div key={q.id} className="q-main mb-4">
                <div className="questions-content">
                  <div className="form-floating description">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={q.description}
                      onChange={(event) =>
                        handleOnChange("QUESTION", q.id, event.target.value)
                      }
                    />
                    <label>Question {index + 1}'s Description</label>
                  </div>
                  <div className="group-upload">
                    <label htmlFor={`${q.id}`}>
                      <RiImageAddFill className="label-up" />
                    </label>
                    <input
                      id={`${q.id}`}
                      onChange={(event) =>
                        handleOnChangeFileQuestion(q.id, event)
                      }
                      type={"file"}
                      hidden
                    />
                    <span>
                      {q.imageName ? (
                        <span
                          style={{ cursor: "Pointer" }}
                          onClick={() => handlePreviewImage(q.id)}
                        >
                          {q.imageName}
                        </span>
                      ) : (
                        "0 File is uploaded"
                      )}
                    </span>
                  </div>
                  <div className="btn-add">
                    {" "}
                    <span onClick={() => handleAddRemoveQuestion("ADD", "")}>
                      <TbHeartPlus className="icon-add" />
                    </span>
                    {questions.length > 1 && (
                      <span
                        onClick={() => handleAddRemoveQuestion("REMOVE", q.id)}
                      >
                        <BsPatchMinusFill className="icon-remove" />
                      </span>
                    )}
                  </div>
                </div>
                {q.answers &&
                  q.answers.length > 0 &&
                  q.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        <input
                          className="form-check-input isCorrect"
                          type="checkbox"
                          checked={answer.isCorrect}
                          onChange={(event) =>
                            handleAnswerQuestion(
                              "CHECKBOX",
                              answer.id,
                              q.id,
                              event.target.checked,
                            )
                          }
                        />
                        <div className="form-floating answers-name">
                          <input
                            value={answer.description}
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            onChange={(event) =>
                              handleAnswerQuestion(
                                "INPUT",
                                answer.id,
                                q.id,
                                event.target.value,
                              )
                            }
                          />
                          <label for="floatingInput">Answers {index + 1}</label>
                        </div>
                        <div className="btn-group">
                          {" "}
                          <span
                            onClick={() => handleAddRemoveAnswer("ADD", q.id)}
                          >
                            <AiOutlinePlusCircle className="icon-add" />
                          </span>
                          {q.answers.length > 1 && (
                            <span
                              onClick={() =>
                                handleAddRemoveAnswer("REMOVE", q.id, answer.id)
                              }
                            >
                              <AiOutlineMinusCircle className="icon-remove" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        {questions && questions.length > 0 && (
          <div>
            <button
              onClick={() => handleSubmitQuestionForQuiz()}
              className="btn btn-warning"
            >
              Save Questions
            </button>
          </div>
        )}
        {isPreviewImage === true && (
          <Lightbox
            image={dataImagePreview.url}
            title={dataImagePreview.title}
            onClose={() => setIsPreviewImage(false)}
          />
        )}
      </div>
    </div>
  );
};
export default QuizQA;
