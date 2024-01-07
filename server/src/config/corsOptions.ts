import allowedOrigins from "./allowedOrigins";

const corsOptions = {
  origin: (origin: any, callback: any) => {
    console.log("origin: ", origin);
    if (allowedOrigins.indexOf(origin) !== -1 || "undefined") {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  // credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
