import "./DashBoard.scss";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { getOverView } from "../../../services/apiServices";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const DashBoard = (props) => {
  const [dataOverView, setDataOverView] = useState({});
  const { t } = useTranslation();
  useEffect(() => {
    fetchDataOverView();
  }, []);
  const fetchDataOverView = async () => {
    let res = await getOverView();
    if (res && res.EC === 0) {
      setDataOverView(res.DT);
    }
    console.log("Check res: ", res);
  };
  // data chart tạo lại mỗi lần render
  const dataChart = [
    {
      name: t("dashboard.data.name1"),
      Qz: dataOverView?.others?.countQuiz ?? 0,
    },
    {
      name: t("dashboard.data.name2"),
      Qs: dataOverView?.others?.countQuestions ?? 0,
    },
    {
      name: t("dashboard.data.name3"),
      As: dataOverView?.others?.countAnswers ?? 0,
    },
  ];
  console.log("Check dataOverView: ", dataOverView);
  return (
    <div className="dashboard-container">
      <div className="title">{t("dashboard.title")}</div>
      <div className="content">
        <div className="c-left">
          <div className="child">
            <span className="text-1">{t("dashboard.users")}</span>
            <span className="text-2">{dataOverView?.users?.total ?? 0}</span>
          </div>
          <div className="child">
            <span className="text-1">{t("dashboard.quizzes")}</span>
            <span className="text-2">
              {dataOverView?.others?.countQuiz ?? 0}
            </span>
          </div>
          <div className="child">
            <span className="text-1">{t("dashboard.questions")}</span>
            <span className="text-2">
              {dataOverView?.others?.countQuestions ?? 0}
            </span>
          </div>
          <div className="child">
            <span className="text-1">{t("dashboard.answers")}</span>
            <span className="text-2">
              {dataOverView?.others?.countAnswers ?? 0}
            </span>
          </div>
        </div>
        <div className="c-right">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Qs" fill="#82ca9d" />
              <Bar dataKey="As" fill="#e79c0f" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
