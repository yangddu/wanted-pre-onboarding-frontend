import axios from "axios"
import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { API, headers } from "../config"

import "../style/Signin.scss"

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailValid, setEmailValid] = useState(true)
  const [pwdValid, setPwdValid] = useState(true)
  const isAuthorized = localStorage.getItem("JWT")
  const navigate = useNavigate()

  const emailRegExp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regExp = /@/
    setEmailValid(true)
    if (regExp.test(e.target.value)) {
      setEmailValid(false)
      setEmail(e.target.value)
    }
  }

  const passwordRegExp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const length = e.target.value.length
    setPwdValid(true)
    if (length >= 8) {
      setPwdValid(false)
      setPassword(e.target.value)
    }
  }

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
            data-testid="signin-button"
            type="submit"
            disabled={emailValid || pwdValid}
          >
            로그인
          </button>
          <Link to="/signup">
            <p>회원가입하러 가기</p>
          </Link>
        </form>
      ) : (
        <Navigate to="/todo" />
      )}
    </div>
  )
}

export default SignIn
