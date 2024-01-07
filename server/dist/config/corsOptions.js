"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins_1 = __importDefault(require("./allowedOrigins"));
const corsOptions = {
    origin: (origin, callback) => {
        console.log("origin: ", origin);
        if (allowedOrigins_1.default.indexOf(origin) !== -1 || "undefined") {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    // credentials: true,
    optionsSuccessStatus: 200,
};
exports.default = corsOptions;
//# sourceMappingURL=corsOptions.js.map