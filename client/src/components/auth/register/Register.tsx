// imports from react
import { useState, useEffect, useRef } from "react";

// icons
import { AiFillWarning } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { IoRefreshOutline } from "react-icons/io5";

import axios from "../../../api/axios";
import { Link } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z0-9_-]{4,16}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])(?=.{8,24})/;
const REGISTER_URL = "/register";

const Register = () => {
  // to generate random string
  const [randomString, setRandomString] = useState<string>("");
  // to check user input is same with random string
  const [captchaInput, setCaptchaInput] = useState<string>("");

  const [username, setUsername] = useState<string>("");
  const [validUsername, setValidUsername] = useState<boolean>(false);
  const [userFocus, setUserFocus] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [emailFocus, setEamilFocus] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);

  const [confirm_pwd, setConfirm_pwd] = useState<string>("");
  const [validConfirm_pwd, setValidConfirm_pwd] = useState<boolean>(false);
  const [confirm_pwdFocus, setConfirm_pwdFocus] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const userRef = useRef<HTMLInputElement>(null!);
  const errRef = useRef<HTMLParagraphElement>(null!);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    const valid = password === confirm_pwd;
    setValidConfirm_pwd(valid);
  }, [password, confirm_pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, email, password, confirm_pwd, captchaInput]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (captchaInput !== randomString) return setErrMsg("Something went wrong");

    try {
      const fetching = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, email, password }),
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
      console.log("register", fetching);
      setSuccess(true);
    } catch (err: any) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 409) {
        setErrMsg("This e-mail is already used!");
      } else {
        setErrMsg("Registration Failed!");
      }
      errRef.current.focus();
    }
  };

  // declare all characters
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const generateString = (length: number) => {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  useEffect(() => setRandomString(generateString(8)), []);

  return (
    <>
      {success ? (
        <section>
          <h1>Registratoin Success</h1>
          <span>
            <Link to="/login">Log In</Link>
          </span>
        </section>
      ) : (
        <section className="mt-10">
          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username
              <BsFillCheckCircleFill
                className={validUsername ? "valid" : "hide"}
              />
              <FaTimes
                className={validUsername || !username ? "hide" : "invalid"}
              />
            </label>
            <input
              ref={userRef}
              required
              type="text"
              id="username"
              autoComplete="off"
              placeholder="Enter your user name"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setUsername(e.target.value)
              }
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              className={
                !validUsername && !userFocus && username
                  ? "instructions"
                  : "offscreen"
              }
            >
              <span>
                <AiFillWarning />
              </span>
              <span>
                4 to 24 characters. Must begin with a letter. Letters, numbers,
                underscores, hyphens allowed.
              </span>
            </p>

            <em>
              You should choose a username that is different from your real
              name, as usernames are public and cannot be made private later.
            </em>
            {/******************************************* username **************************************/}

            <label htmlFor="email">
              Email
              <BsFillCheckCircleFill
                className={validEmail ? "valid" : "hide"}
              />
              <FaTimes className={validEmail || !email ? "hide" : "invalid"} />
            </label>
            <input
              required
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setEmail(e.target.value)
              }
              onFocus={() => setEamilFocus(true)}
              onBlur={() => setEamilFocus(false)}
            />
            <p
              className={
                !validEmail && !emailFocus && email
                  ? "instructions"
                  : "offscreen"
              }
            >
              <AiFillWarning />
              <span>
                Please ensure the email address is in the correct format of
                "example@domain.com".
              </span>
            </p>
            <em>
              Email is required to recover and identify your account if you lose
              your password.
            </em>
            {/******************************************* email **************************************/}

            <label htmlFor="password">
              Password
              <BsFillCheckCircleFill
                className={validPassword ? "valid" : "hide"}
              />
              <FaTimes
                className={validPassword || !password ? "hide" : "invalid"}
              />
            </label>
            <input
              required
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setPassword(e.target.value)
              }
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <p
              className={
                !validPassword && !passwordFocus && password
                  ? "instructions"
                  : "offscreen"
              }
            >
              <AiFillWarning />
              <span>
                8 to 24 characters. Must include uppercase and lowercase
                letters, a number and a special character. Allowed special
                characters:
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
              </span>
            </p>
            <em>
              It is recommended to use a unique password that you are not using
              on any other website.
            </em>
            {/******************************************* password **************************************/}

            <label htmlFor="confirm_pwd">
              Confirm password
              <BsFillCheckCircleFill
                className={validConfirm_pwd && confirm_pwd ? "valid" : "hide"}
              />
              <FaTimes
                className={
                  validConfirm_pwd || !confirm_pwd ? "hide" : "invalid"
                }
              />
            </label>
            <input
              required
              type="password"
              id="password"
              placeholder="Enter your password again"
              value={confirm_pwd}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setConfirm_pwd(e.target.value)
              }
              onFocus={() => setConfirm_pwdFocus(true)}
              onBlur={() => setConfirm_pwdFocus(false)}
            />
            <p
              className={
                !validConfirm_pwd && !confirm_pwdFocus && confirm_pwd
                  ? "instructions"
                  : "offscreen"
              }
            >
              <AiFillWarning />
              <span> Must match the first password input field.</span>
            </p>
            <em>It is required to comfirm your password.</em>
            {/******************************************* confirm password **************************************/}

            <em>
              To protect MyShop against automated account creation, we kindly
              ask you to enter the words that appear below in the box{" "}
              <a
                target="_blank"
                href="https://en.wikipedia.org/wiki/Special:Captcha/help"
                className="text-blue-800 hover:underline"
              >
                more info
              </a>
            </em>

            <span>CAPTCHA Security check</span>

            <div className="border border-gray-400 p-3">
              <div className="border border-gray-400">
                <div className="disable-text-selection h-20 grid place-content-center font-bold italic">
                  {randomString}
                </div>
                <div>
                  <label className="captcha" htmlFor="captcha"></label>
                  <input
                    className="w-[272px] rounded-none text-sm hover:outline-black"
                    type="text"
                    id="captcha"
                    placeholder="Enter the text you see above"
                    value={captchaInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                      setCaptchaInput(e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex justify-center text-sm gap-2">
                <p>Can't see the image?</p>
                <span
                  onClick={() => setRandomString(generateString(8))}
                  className="hover:underline text-blue-600 hover:cursor-pointer flex items-center"
                >
                  <IoRefreshOutline /> refresh
                </span>
              </div>
            </div>

            <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"}>
              {errMsg}
            </p>
            <button>Create your account</button>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
