import { useEffect, useState } from "react";
import OrderService from "../../services/OrderService";
import { useToast } from "@chakra-ui/react";

export default function OrderHistory() {
  const toast = useToast();
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")!);

  const fetchData = async () => {
    const res = await OrderService.getList({ userId: user.userId });
    setOrders(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-screen text-center m-20 text-xl">
      You have no orders yet.
    </div>
  );
}
