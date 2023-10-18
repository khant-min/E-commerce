import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
    12345678,
    "Khant Min",
    "khantmin@gmail.com",
    "09767805073",
    true,
    "profile.jpg",
    "18.10.23",
    "20.10.23"
  ),
  createData(
    12345678,
    "Khant Min",
    "khantmin@gmail.com",
    "09767805073",
    true,
    "profile.jpg",
    "18.10.23",
    "20.10.23"
  ),
  createData(
    12345678,
    "Khant Min",
    "khantmin@gmail.com",
    "09767805073",
    true,
    "profile.jpg",
    "18.10.23",
    "20.10.23"
  ),
];

export default function CustomersPage() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1000 }} aria-label="customer table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone No</TableCell>
            <TableCell align="right">Active</TableCell>
            <TableCell align="right">Profile</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Updated At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phoneNo}</TableCell>
              <TableCell align="right">{row.active.toString()}</TableCell>
              <TableCell align="right">{row.profile}</TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
              <TableCell align="right">{row.updatedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
