import { useState } from "react";
import {
  createAnAccountWithFirebase,
  handleLogout,
  loginAnAccountWithFirebase,
  loginWithGoogleByPopWindow,
  loginWithGoogleByReidirecting
} from "../config/firebase";

export const AuthPage = () => {
  return (
    <div>
      <p>Below button redirect you for login by Google </p>
      <button onClick={loginWithGoogleByReidirecting}>Login</button>
      <p>Below button Pop a new Window you for login by Google</p>
      <button onClick={loginWithGoogleByPopWindow}>Login</button>
      <p>Below button Fire a logout</p>
      <button onClick={handleLogout}>Logout</button>
      <NewAccount />
      <LoginWithRegisterAccount />
    </div>
  );
};

const NewAccount = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  return (
    <div className="auth-cont">
      <p>Create/Register new user</p>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="email "
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
      />
      <button
        onClick={() => {
          createAnAccountWithFirebase(email, password);
        }}
      >
        Register/SignIN
      </button>
    </div>
  );
};

// loginAnAccountWithFirebase
const LoginWithRegisterAccount = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  return (
    <div className="auth-cont">
      <p>Login With Firebase</p>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="email "
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
      />
      <button
        onClick={() => {
          loginAnAccountWithFirebase(email, password);
        }}
      >
        LogIn
      </button>
    </div>
  );
};
