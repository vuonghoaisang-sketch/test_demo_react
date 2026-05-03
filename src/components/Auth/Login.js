import "./Login.scss";
import { useState } from "react";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    alert("Login clicked");
  };
  return (
    <div className="login-container">
      <div className="header">Don't have an account?</div>
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
      </div>
    </div>
  );
};
export default Login;
