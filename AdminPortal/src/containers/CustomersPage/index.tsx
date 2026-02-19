import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import CustomerService from "../../services/CustomerService";
import { Avatar } from "@mui/material";

function createData(
  id: number,
  name: string,
  email: string,
  phoneNo: string,
  active: boolean,
  profile: string,
  createdAt: string,
  updatedAt: string
) {
  return { id, name, email, phoneNo, active, profile, createdAt, updatedAt };
}

const rows = [
  createData(
    123456378,
    "Khant Min",
    "khantmin@gmail.com",
    "09767805073",
    true,
    "profile.jpg",
    "18 May 2023",
    "20 March 2023"
  ),
  createData(
    123415678,
    "Khant Min",
    "khantmin@gmail.com",
    "09767805073",
    true,
    "profile.jpg",
    "18 May 2023",
    "20 March 2023"
  ),
  createData(
    123452678,
    "Khant Min",
    "khantmin@gmail.com",
    "09767805073",
    true,
    "profile.jpg",
    "18 May 2023",
    "20 March 2023"
  ),
];

interface Customer {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const fetchData = async () => {
    const res = await CustomerService.getList();
    setCustomers(res.data.customers);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1000 }} aria-label="customer table">
        <TableHead>
          <TableRow>
            {/* <TableCell>ID</TableCell> */}
            <TableCell align="right">Profile</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone No</TableCell>
            {/* <TableCell align="right">Active</TableCell> */}
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Updated At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow
              key={customer.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">
                {customer.id}
              </TableCell> */}
              <TableCell align="right">
                <Avatar alt={customer.name} />
              </TableCell>
              <TableCell align="right">{customer.name}</TableCell>
              <TableCell align="right">{customer.email}</TableCell>
              <TableCell align="right">{customer.phoneNumber}</TableCell>
              {/* <TableCell align="right">{row.active.toString()}</TableCell> */}
              <TableCell align="right">
                {" "}
                {new Date(customer.createdAt).toISOString().split("T")[0]}
              </TableCell>
              <TableCell align="right">
                {new Date(customer.updatedAt).toISOString().split("T")[0]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
