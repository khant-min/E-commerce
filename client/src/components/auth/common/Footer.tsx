import Admin from "../admin/Admin";

const Footer = () => {
  return (
    <>
      <hr className="border-1 border-gray-400 mt-20" />
      <div className="flex justify-between">
        <div className="ref text-sm">
          <a href="">Privacy policy</a>
          <a href="">About MyShop</a>
          <a href="">Contact MyShop</a>
          <a href="">Developers</a>
          <a href="">We own this</a>
          <a href="">Cookies</a>
        </div>
        <Admin />
      </div>
    </>
  );
};

export default Footer;
