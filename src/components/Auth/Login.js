import "./Login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    let data = await postLogin(email, password);
    console.log(">>> check data login: ", data);
    if (data && +data.EC === 0) {
      toast.success(data.EM);
      navigate("/");
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account?</span>
        <button onClick={() => navigate("/register")}>Sign Up</button>
      </div>
      <div className="title col-4 mx-auto">SangVuong</div>
      <div className="welcome col-4 mx-auto">Hello,who's this</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type={"password"}
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button className="btn-submit" onClick={() => handleLogin()}>
            Login to SangVuong
          </button>
        </div>
        <div className="text-center">
          <span className="back" onClick={() => navigate("/")}>
            &#60;&#60;Go to Homepage
          </span>
        </div>
      </div>
    </div>
  );
};
export default Login;
