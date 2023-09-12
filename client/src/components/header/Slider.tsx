import { VscChromeClose } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";
import { FiDollarSign } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { AiFillStar } from "react-icons/ai";
import { useAuth } from "../../context/DataContext";
import { DataContextProps } from "../../types";
import Drawer from "react-modern-drawer";
import { Link } from "react-router-dom";
import "react-modern-drawer/dist/index.css";

// interface SliderProps {
//   setOpenSlider: React.Dispatch<React.SetStateAction<boolean>>;
// }

const Slider = ({ toggleDrawer, openSlider }: any) => {
  // const { data, setDetailId } = useAuth() as DataContextProps;

  // const chooseItems: number[] = JSON.parse(
  //   localStorage.getItem("choose item")!
  // );

  // const handleDelete = (id: number) => {
  //   const test = chooseItems.filter(item => item !== id);
  //   console.log(test);

  //   localStorage.setItem("choose item", JSON.stringify(test));
  //   window.location.reload();
  // };

  // const boughtItems = chooseItems.map(item =>
  //   data.filter(cur => cur.id === item)
  // );

  // const rating = (rate: number) =>
  //   Array(Math.round(rate))
  //     .fill(0)
  //     .map(() => <AiFillStar className="text-yellow-500" />);

  return (
    <Drawer open={openSlider} onClose={toggleDrawer} direction="right">
      <div className="absolute right-0 bg-[#edeaf5] w-[300px] min-h-full">
        <div className="flex justify-between items-center p-2">
          <div className="flex items-center gap-2">
            <FiShoppingCart className="text-blue-600 text-xl" />
            <h1>Shop Cart</h1>
          </div>
          <button className="x" onClick={toggleDrawer}>
            <VscChromeClose />
          </button>
        </div>
        {/* {boughtItems.length ? (
          <>
            <div className="flex flex-col gap-4 p-5">
              {boughtItems.map(cur => (
                <section
                  key={cur[0].id}
                  className="bg-white p-4 rounded-md flex flex-col gap-3"
                >
                  <span className="flex justify-between items-center">
                    <img className="w-10" src={cur[0].image} />
                    <button
                      className="text-red-400 text-xl p-0"
                      onClick={() => handleDelete(cur[0].id)}
                    >
                      <HiOutlineTrash />
                    </button>
                  </span>
                  <h1>{cur[0].title}</h1>
                  <span className="flex justify-between">
                    <h2 className="flex">{rating(cur[0].rating.rate)}</h2>
                    <h2>count: {cur[0].rating.count}</h2>
                  </span>
                  <div className="flex items-center justify-between">
                    <h2 className="flex items-center">
                      <FiDollarSign /> {cur[0].price}
                    </h2>
                    <span className="shadow-md p-2 bg-blue-200 rounded-sm"></span>
                  </div>
                </section>
              ))}
            </div>
            <div className="p-4">
              <button
                className="bg-blue-700 hover:bg-blue-600 w-full p-1.5 rounded-md text-white
                 font-semibold tracking-wider transition-all"
              >
                Checkout
              </button>
            </div>
          </>
        ) : (
          <div>You haven't any order</div>
        )} */}
      </div>
    </Drawer>
  );
};

export default Slider;

// const App = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleDrawer = () => {
//     setIsOpen(prevState => !prevState);
//   };

//   return (
//     <>
//       <button onClick={toggleDrawer}>Show</button>
//       <Drawer
//         open={isOpen}
//         onClose={toggleDrawer}
//         direction="right"
//         className="bla bla bla"
//       >
//         <div>Hello World</div>
//       </Drawer>
//     </>
//   );
// };

// export default App;
