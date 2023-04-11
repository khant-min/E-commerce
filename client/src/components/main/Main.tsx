import { Tilt } from "react-tilt";
import useAuth from "../../hooks/useAuth";
import { Data, DataContextProps } from "../../data.types";
import { BiDollar } from "react-icons/bi";
import Loading from "./Loading";

const Main = () => {
  const { data, searchItem, filteredByCategory, isLoading } =
    useAuth() as DataContextProps;

  // set [] in localStorage if there is nothing
  (() => {
    localStorage.getItem("choose item") === null
      ? localStorage.setItem("choose item", JSON.stringify([]))
      : null;
  })();

  const filteredResult = data.filter(
    (cur) =>
      cur.title.toLowerCase().includes(searchItem) &&
      cur.category.toLowerCase().includes(filteredByCategory)
  );

  const handleClick = (id: number) => {
    const chooseItem = JSON.parse(localStorage.getItem("choose item")!);
    if (!chooseItem.length)
      localStorage.setItem("choose item", JSON.stringify([...chooseItem, id]));

    chooseItem.map(
      (item: number) =>
        item !== id &&
        localStorage.setItem("choose item", JSON.stringify([...chooseItem, id]))
    );
  };

  const defaultOptions = {
    reverse: false,
    max: 30,
    perspective: 1000,
    scale: 1.1,
    speed: 1000,
    transition: true,
    axis: "y",
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };

  return (
    <main>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <>
          {filteredResult.map((cur: Data) => (
            <Tilt key={cur.id} options={defaultOptions}>
              <section>
                <img src={cur.image} />
                <h1>
                  {cur.title.length > 20
                    ? `${cur.title.slice(0, 20)}...`
                    : cur.title}
                </h1>
                <p>
                  {cur.description.length > 80
                    ? `${cur.description.slice(0, 80)}...`
                    : cur.description}
                </p>
                <div className="flex justify-between">
                  <p>{cur.rating.rate}</p>
                  <p>Count: {cur.rating.count}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center text-xl font-bold">
                    <BiDollar /> {cur.price}
                  </span>
                  <button
                    onClick={() => handleClick(cur.id)}
                    className="choose-item"
                  >
                    Add Item
                  </button>
                </div>
              </section>
            </Tilt>
          ))}
        </>
      )}
    </main>
  );
};

export default Main;
