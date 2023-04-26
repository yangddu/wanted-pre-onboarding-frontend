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

  const SignUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await axios
        .post(
          API.SIGNUP,
          {
            email,
            password
          },
          {
            headers
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
