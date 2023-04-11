import Register from "./Register";

import Header from "../common/Header";
import Footer from "../common/Footer";
import Public from "./Public";

const RegisterLayout = () => {
  return (
    <div className="mb-40">
      <Header />
      <div className="mt-10 max-w-[80%] m-auto">
        <h1 className="text-3xl mb-4">Create account</h1>
        <hr className="border-1 border-gray-400" />
        <div className="flex flex-col justify-between md:flex-row">
          <Register />
          <Public />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterLayout;
