import Footer from "../common/Footer";
import Header from "../common/Header";
import LogIn from "./LogIn";

const LoginLayout = () => {
  return (
    <div>
      <Header />
      <div className="mt-10 max-w-[80%] m-auto">
        <h1 className="text-3xl mb-4">Log in</h1>
        <hr className="border-1 border-gray-400" />
        <LogIn />
      </div>
      <Footer />
    </div>
  );
};

export default LoginLayout;
