import { useEffect, useState } from "react";
import OrderService from "../../services/OrderService";
import { Tooltip, useToast } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";

interface Order {
  id: number;
  orderDate: string;
  orderStatus: string;
  orderNotes: string;
  paymentMethod: string;
  totalAmount: number;
  orderItems: { id: number }[];
}

export default function OrderHistory() {
  const toast = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const user = JSON.parse(localStorage.getItem("user")!);

  const fetchData = async () => {
    const res = await OrderService.getList({ userId: user.userId });
    setOrders(res.data);
    console.log("orders: ", res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-screen text-center m-20 text-xl">
      {orders ? (
        <div className="">
          <TableContainer>
            <Table variant="striped" colorScheme="blue">
              <TableCaption>Order History</TableCaption>
              <Thead>
                <Tr>
                  <Th>Order Date</Th>
                  <Th>Order Items</Th>
                  <Th>Payment Methods</Th>
                  <Th>Total Amount</Th>
                  <Th>Order Notes</Th>
                  <Th>Order Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.map((order) => (
                  <Tr key={order.id}>
                    <Td>
                      {new Date(order.orderDate).toISOString().split("T")[0]}
                    </Td>
                    <Td>
                      {order.orderItems.length === 1
                        ? `1 item`
                        : `${order.orderItems.length} items`}
                    </Td>
                    <Td>{order.paymentMethod}</Td>
                    <Td>{order.totalAmount}</Td>
                    <Td>{order.orderNotes}</Td>
                    <Td>{order.orderStatus.toLowerCase()}</Td>
                    <Td
                      className="hover:cursor-pointer flex"
                      onClick={() => console.log("hello")}
                    >
                      <p className="text-sm font-bold">Details</p>{" "}
                      <FaAngleRight />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div>You have no orders yet.</div>
      )}
    </div>
  );
}
