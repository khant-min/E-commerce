import { useState } from "react";
import { TbDots } from "react-icons/tb";
import Home from "../../header/Home";
import Opt from "../register/Opt";

const Header = () => {
  const [clickDot, setClickDot] = useState<boolean>(false);

  return (
    <header className="auth-header">
      <Home />
      <Opt styles={"hidden sm:flex gap-4"} />
      <div className="sm:hidden flex flex-col items-end relative">
        <div
          className="text-xl border-2 p-2 hover:cursor-pointer active:border-blue-600"
          onClick={() => setClickDot(!clickDot)}
        >
          <TbDots />
        </div>
        {clickDot && <Opt styles="mobile-opt" clickDot={clickDot} />}
      </div>
    </header>
  );
};

export default Header;
