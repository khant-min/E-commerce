import axios from "../../../api/axios";
import { useState, useRef, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { DataContextProps } from "../../../data.types";

const LOGIN_URL = "/login";

const LogIn = () => {
  const errRef = useRef<HTMLParagraphElement>(null!);
  const emailRef = useRef<HTMLInputElement>(null!);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  const { setAuthName } = useAuth() as DataContextProps;

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const logging = await axios.post(
        LOGIN_URL,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
      setAuthName(logging.data.name);
      setSuccess(true);
    } catch (err: any) {
      setErrMsg(err.message);
    }
  };
  return (
    <>
      {success ? (
        <div>success</div>
      ) : (
        <section className="mt-10">
          <form className="login-form gap-2" onSubmit={handleSubmit}>
            <label htmlFor="emai">Email:</label>
            <input
              ref={emailRef}
              required
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setEmail(e.target.value)
              }
            />

            <label htmlFor="password">Password:</label>
            <input
              required
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setPassword(e.target.value)
              }
            />

            <button>Log In</button>
          </form>
          <div>
            <p className="text-red-500 bg-red-200 w-[300px] mt-2" ref={errRef}>
              {errMsg}
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default LogIn;
