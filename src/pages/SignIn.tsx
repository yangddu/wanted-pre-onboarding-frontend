import { Link, useNavigate } from 'react-router-dom'

import '../style/Signin.scss'
import useInputs from 'hooks/useInputs'
import { SignInTodo } from 'api'
import { useCallback, useEffect } from 'react'
import { regEx } from 'utils/regex'

const SignIn = () => {
  const {
    values: { email, password },
    handleChange
  } = useInputs({ email: '', password: '' })

  const navigate = useNavigate()

  const LoginHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      // (email: string, password: string) => {
      SignInTodo(email, password)
        .then(res => res.data.access_token)
        .then(token => {
          localStorage.setItem('token', token)
          navigate('/todo')
        })
        .catch(err => {
          alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.')
          console.log(err)
        })
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
    <main className="signin-wrapper">
      <form onSubmit={LoginHandler}>
        <div className="input">
          <div className="input-wrapper">
            <label>이메일 주소</label>
            <input
              data-testid="email-input"
              type="text"
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
              required
              placeholder="비밀번호(영문+숫자+특수문자 조합 8~16자리)"
              onChange={handleChange}
            />
            {/* {passwordErrorMsg && (
                <p className="errorMsg">{passwordErrorMsg}</p>
              )} */}
          </div>
        </div>
        <button data-testid="signin-button" type="submit">
          {/* disabled={!regEx(email, password)} */}
          <div>{regEx(email, password)}</div>
          로그인
        </button>
        <Link to="/signup">
          <p className="signup-link">회원가입하러 가기</p>
        </Link>
      </form>
    </main>
  )
}

export default SignIn
