import '../styles/passwordtips.css'

export default function PasswordTips() {
  return (
    <div className="password-tips">
      <p>Password must contain:</p>
      <ul className="password-tips-list">
        <li>At least 10 characters</li>
        <li>At least 1 uppercase letter</li>
        <li>At least 1 lowercase letter</li>
        <li>At least 1 number</li>
        <li>At least 1 special character</li>
      </ul>
    </div>
  )
}