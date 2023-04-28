import { Link, useNavigate } from 'react-router-dom'

import '../style/Signup.scss'
import useInputs from 'hooks/useInputs'
import { SignUpTodo } from 'api'
import { useCallback, useEffect } from 'react'
import { regEx } from 'utils/regex'

const SignUp = () => {
  const {
    values: { email, password },
    handleChange
  } = useInputs({ email: '', password: '' })

  const navigate = useNavigate()

  const SignUpHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      // (email: string, password: string) => {
      SignUpTodo(email, password)
        .then(res => {
          if (res.status === 201) {
            alert('회원가입이 완료되었습니다!')
            navigate('/signin')
          }
        })
        .catch(err => alert(err.response.data.message))
    },
    [navigate]
  )

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/todo')
    }
  }, [navigate])

  return (
    <div className="signup-wrapper">
      <form onSubmit={SignUpHandler}>
        <div className="input">
          <div className="input-wrapper">
            <label>이메일 주소</label>
            <input
              data-testid="email-input"
              type="text"
              value={email}
              required
              placeholder="아이디(이메일)"
              onChange={handleChange}
            />
            {/* {emailErrorMsg && <p className="errorMsg">{emailErrorMsg}</p>} */}
          </div>
          <div className="input-wrapper">
            <label>비밀번호</label>
            <input
              data-testid="password-input"
              type="password"
              value={password}
              required
              placeholder="비밀번호(영문+숫자+특수문자 조합 8~16자리)"
              onChange={handleChange}
            />
            {/* {passwordErrorMsg && <p className="errorMsg">{passwordErrorMsg}</p>} */}
          </div>
        </div>
        <button data-testid="signup-button" type="submit">
          {/* disabled={!regEx(email, password)} */}
          {/* <div>{!regEx(email, password)}</div> */}
          회원가입
        </button>
        <Link to="/signin">
          <p className="signin-link">로그인하러 가기</p>
        </Link>
      </form>
    </div>
  )
}

export default SignUp
