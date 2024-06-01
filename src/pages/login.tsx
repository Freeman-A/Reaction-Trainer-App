import { signIn } from 'next-auth/react';

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <button
          onClick={() => {
            signIn('google');
          }}
        >
          Google
        </button>
        <button
          onClick={() => {
            signIn('discord');
          }}
        >
          Discord
        </button>
        <button
          onClick={() => {
            signIn('google');
          }}
        >
          With Email
        </button>
      </form>
      <p>Don't have an account?</p>
      <button onClick={() => {}}>Register</button>
    </div>
  );
};

export default Login;
