import axios from "axios"
import { useRef, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { API, headers } from "../config"
import useLoginInput from "../hooks/useLoginInput"

import "../style/Signin.scss"

const SignIn = () => {
  const {
    email,
    password,
    emailErrorMsg,
    passwordErrorMsg,
    emailValid,
    passwordValid,
    emailRegExp,
    passwordRegExp
  } = useLoginInput()

  const isAuthorized = localStorage.getItem("JWT")
  const navigate = useNavigate()

  const SignInHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await axios
        .post(
          API.SIGNIN,
          {
            email: email,
            password: password
          },
          {
            headers: headers
          }
        )
        .then(response => {
          localStorage.setItem("JWT", response.data.access_token)
          navigate("/todo")
        })
    } catch (error: any) {
      alert(error.response.data.message)
      navigate("/signin")
    }
  }

  return (
    <div className="signin-wrapper">
      {!isAuthorized ? (
        <form onSubmit={SignInHandler}>
          <div className="input">
            <div className="input-wrapper">
              <label>이메일 주소</label>
              <input
                data-testid="email-input"
                type="text"
                required
                placeholder="아이디(이메일)"
                onChange={emailRegExp}
              />
              {emailErrorMsg && <p className="errorMsg">{emailErrorMsg}</p>}
            </div>
            <div className="input-wrapper">
              <label>비밀번호</label>
              <input
                data-testid="password-input"
                type="password"
                required
                placeholder="비밀번호(영문+숫자+특수문자 조합 8~16자리)"
                onChange={passwordRegExp}
              />
              {passwordErrorMsg && (
                <p className="errorMsg">{passwordErrorMsg}</p>
              )}
            </div>
          </div>
          <button
            data-testid="signin-button"
            type="submit"
            disabled={emailValid || passwordValid}
          >
            로그인
          </button>
          <Link to="/signup">
            <p className="signup-link">회원가입하러 가기</p>
          </Link>
        </form>
      ) : (
        <Navigate to="/todo" />
      )}
    </div>
  )
}

export default SignIn
