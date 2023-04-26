import axios from "axios"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { API, API_STATUS_CREATED, headers } from "../config"
import useLoginInput from "../hooks/useLoginInput"

import "../style/Signup.scss"

const SignUp = () => {
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  // const [emailValid, setEmailValid] = useState(true)
  // const [pwdValid, setPwdValid] = useState(true)
  // const [idErrorMsg, setIdErrorMsg] = useState("")
  // const [pwdErrorMsg, setPwdErrorMsg] = useState("")
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

  // const emailRegExp = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setIdErrorMsg("")

  //   const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  //   if (!regExp.test(e.target.value)) {
  //     setIdErrorMsg("아이디는 이메일 형식이어야 합니다.")
  //     setEmailValid(true)
  //   }

  //   setEmailValid(false)
  //   setEmail(e.target.value)
  // }

  // const passwordRegExp = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPwdErrorMsg("")
  //   setPwdValid(false)

  //   const regExp =
  //     /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/ // 비밀번호는 영문자, 숫자, 특수문자 중 적어도 1개 이상을 포함
  //   const pwdLength = e.target.value.length // 비밀번호 길이가 8~16자리인지 확인
  //   if (pwdLength < 8) {
  //     setPwdErrorMsg("비밀번호는 8자리 이상이어야 합니다.")
  //     setPwdValid(true)
  //   } else if (!regExp.test(e.target.value)) {
  //     setPwdErrorMsg(
  //       "영문자, 숫자, 특수문자 중 적어도 1개 이상을 포함해야 합니다."
  //     )
  //     setPwdValid(true)
  //   }

  //   setPassword(e.target.value)
  // }

  const SignUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await axios
        .post(
          API.SIGNUP,
          {
            email: email,
            password: password
          },
          {
            headers: headers
          }
        )
        .then(response => {
          if (response.status === API_STATUS_CREATED) {
            navigate("/signin")
          }
        })
    } catch (error: any) {
      alert(error.response.data.message)
      navigate("/signup")
    }
  }

  return (
    <div className="signup-wrapper">
      {!isAuthorized ? (
        <form onSubmit={SignUpHandler}>
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
            data-testid="signup-button"
            type="submit"
            disabled={emailValid || passwordValid}
          >
            회원가입
          </button>
          <Link to="/signin">
            <p className="signin-link">로그인하러 가기</p>
          </Link>
        </form>
      ) : (
        <Navigate to="/todo" />
      )}
    </div>
  )
}

export default SignUp
