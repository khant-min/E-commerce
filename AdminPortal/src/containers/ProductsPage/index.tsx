import { Box } from "@mui/material";

export default function index() {
  return (
    <div>
      <Box className="w-[95%] h-[250px] shadow-lg p-6 flex justify-between items-center">
        <div>
          <h3 className="text-4xl">1.76M</h3>
          <p>5.4% Fees Earning</p>
        </div>
        <div>
          <h3 className="text-4xl">1.76M</h3>
          <p>4% Grow Rate</p>
        </div>
        <div>
          <h3 className="text-4xl">$342</h3>
          <p>3% Investment</p>
        </div>
      </Box>
    </div>
  );
}
