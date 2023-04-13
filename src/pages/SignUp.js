import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { API, API_STATUS_CREATED, headers } from "../config";

import "../style/Signup.scss";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [pwdValid, setPwdValid] = useState(true);
  const isAuthorized = localStorage.getItem("JWT");
  const navigate = useNavigate();

  const emailRegExp = e => {
    const regExp = /@/;
    setEmailValid(true);
    if (regExp.test(e.target.value)) {
      setEmailValid(false);
      setEmail(e.target.value);
    }
  };

  const passwordRegExp = e => {
    const length = e.target.value.length;
    setPwdValid(true);
    if (length >= 8) {
      setPwdValid(false);
      setPassword(e.target.value);
    }
  };

  const SignUp = async e => {
    e.preventDefault();

    try {
      await axios
        .post(
          API.SIGNUP,
          {
            email: email,
            password: password,
          },
          {
            headers: headers,
          }
        )
        .then(response => {
          if (response.status === API_STATUS_CREATED) {
            navigate("/signin");
          }
        });
    } catch (error) {
      alert(error.response.data.message);
      navigate("/signup");
    }
  };

  return (
    <div className="signup-wrapper">
      {!isAuthorized ? (
        <form onSubmit={SignUp}>
          <div className="input">
            <div className="input-wrapper">
              <label>이메일 주소</label>
              <input
                data-testid="email-input"
                type="text"
                required
                placeholder="이메일을 입력해주세요"
                onChange={emailRegExp}
              />
            </div>
            <div className="input-wrapper">
              <label>비밀번호</label>
              <input
                data-testid="password-input"
                type="password"
                required
                placeholder="비밀번호를 입력해주세요"
                onChange={passwordRegExp}
              />
            </div>
          </div>
          <button
            data-testid="signup-button"
            type="submit"
            disabled={emailValid || pwdValid}
          >
            회원가입
          </button>
          <Link to="/signin">
            <p>로그인하러 가기</p>
          </Link>
        </form>
      ) : (
        <Navigate to="/todo" />
      )}
    </div>
  );
};

export default SignUp;
