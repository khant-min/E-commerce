import { useAuth } from "../../context/DataContext";
import { DataContextProps } from "../../data.types";

const Detail = () => {
  const { data, detailId } = useAuth() as DataContextProps;

  const getItems = data.filter(item => item.id === detailId)[0];

  return <div></div>;
};

export default Detail;
