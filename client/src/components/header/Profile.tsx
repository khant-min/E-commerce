import { Link, Navigate } from "react-router-dom";
import { AiFillWarning } from "react-icons/ai";
import { BsArrowBarLeft } from "react-icons/bs";
import axios from "../../api/axios";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { DataContextProps } from "../../data.types";

const LOGOUT_URL = "/logout";

const Profile = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  const { setAuthName } = useAuth() as DataContextProps;

  const logout = async () => {
    try {
      await axios.get(LOGOUT_URL);
      setSuccess(true);
      setAuthName("");
    } catch (err: any) {
      setErrMsg(err);

      console.log(errMsg);
    }
  };

  return (
    <>
      {success ? (
        <Navigate to="/" />
      ) : (
        <section className="flex justify-center">
          <div className="w-[50%] bg-blue-400 h-[200px] rounded-md p-4">
            <button className="bg-gray-300 p-2 rounded-sm">
              <Link to="/">
                <BsArrowBarLeft />
              </Link>
            </button>
            <div className="p-4">
              <span className="text-yellow-400 flex gap-2 items-center mb-10">
                <AiFillWarning />
                <p>
                  Due to some functions are under development, you can only log
                  out!
                </p>
              </span>
              <button
                onClick={logout}
                className="bg-blue-300 p-2 rounded-md font-semibold hover:scale-110 transition-all"
              >
                Log Out
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Profile;

// This component will serve as profile page when user is logged in
