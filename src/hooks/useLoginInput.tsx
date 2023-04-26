import { useState } from "react"

const useLoginInput = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailErrorMsg, setEmailErrorMsg] = useState("")
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("")
  const [emailValid, setEmailValid] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)

  const emailRegExp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailErrorMsg("")

    const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!regExp.test(e.target.value)) {
      setEmailErrorMsg("아이디는 이메일 형식이어야 합니다.")
      setEmailValid(true)
    }

    setEmailValid(false)
    setEmail(e.target.value)
  }

  const passwordRegExp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordErrorMsg("")
    setPasswordValid(false)

    const regExp =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/ // 비밀번호는 영문자, 숫자, 특수문자 중 적어도 1개 이상을 포함
    const pwdLength = e.target.value.length // 비밀번호 길이가 8~16자리인지 확인
    if (pwdLength < 8) {
      setPasswordErrorMsg("비밀번호는 8자리 이상이어야 합니다.")
      setPasswordValid(true)
    } else if (!regExp.test(e.target.value)) {
      setPasswordErrorMsg(
        "영문자, 숫자, 특수문자 중 적어도 1개 이상을 포함해야 합니다."
      )
      setPasswordValid(true)
    }

    setPassword(e.target.value)
  }

  return {
    email,
    password,
    emailErrorMsg,
    passwordErrorMsg,
    emailValid,
    passwordValid,
    emailRegExp,
    passwordRegExp
  }
}

export default useLoginInput
