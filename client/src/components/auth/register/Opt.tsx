// icons
import { MdAccountCircle } from "react-icons/md";
import { RiLoginCircleFill } from "react-icons/ri";

import { Link } from "react-router-dom";

const Opt = ({ styles, clickDot }: { styles: string; clickDot?: boolean }) => {
  return (
    <div className={styles}>
      <span className="auth-link">
        {clickDot && <MdAccountCircle className="text-2xl" />}
        <Link to="/register">Create account</Link>
      </span>

      <span className="auth-link">
        {clickDot && <RiLoginCircleFill className="text-2xl" />}
        <Link to="/login">Log in</Link>
      </span>

      {clickDot && (
        <div>
          <hr />
          <em className="text-sm">Feel free to connect with us.</em>
        </div>
      )}
    </div>
  );
};

export default Opt;
