import { Link, useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import useInputs from '../hooks/useInputs'

import '../style/Signup.scss'
import { SignUpTodo } from '../api/auth'
import { regEx } from '../utils/regex'

const SignUp = () => {
  const {
    values: { email, password },
    handleChange
  } = useInputs({ email: '', password: '' })

  const navigate = useNavigate()

  const SignUpHandler = useCallback(
    (email: string, password: string) => {
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

  return (
    <div className="signup-wrapper">
      <form
        onSubmit={e => {
          e.preventDefault()
          SignUpHandler(email, password)
        }}
      >
        <div className="input">
          <div className="input-wrapper">
            <label htmlFor="email">이메일 주소</label>
            <input
              id="email"
              data-testid="email-input"
              type="text"
              name="email"
              value={email}
              required
              placeholder="아이디(이메일)"
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              data-testid="password-input"
              type="password"
              name="password"
              value={password}
              required
              placeholder="비밀번호(영문+숫자+특수문자 조합 8~16자리)"
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          data-testid="signup-button"
          type="submit"
          disabled={!regEx(email, password)}
        >
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
