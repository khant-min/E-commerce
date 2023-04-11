import { Routes, Route } from "react-router-dom";
import RegisterLayout from "./components/auth/register/RegisterLayout";
import LoginLayout from "./components/auth/login/LoginLayout";
import Layout from "./Layout";
import Profile from "./components/header/Profile";
import Account from "./components/header/Account";
import Mail from "./components/mail/Mail";
import Detail from "./components/main/Detail";

const App = () => {
  return (
    <div className="max-w-[95%] lg:max-w-[90%] xl:max-w-[1250px] m-auto mt-6">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="register" element={<RegisterLayout />} />
        <Route path="login" element={<LoginLayout />} />
        <Route path="profile" element={<Profile />} />
        <Route path="account" element={<Account />} />
        <Route path="detail" element={<Detail />} />
        <Route path="mail" element={<Mail />} />
      </Routes>
    </div>
  );
};

export default App;
