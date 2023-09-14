"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const router = express_1.default.Router({ mergeParams: true });
const PORT = process.env.PORT || 8080;
app.use(express_1.default.json());
router.use("/test", (req, res) => {
    res.send("hello");
});
app.use("/api", router);
app.listen(PORT, () => console.log(`Server is running at port -> ${PORT}`));
//# sourceMappingURL=server.js.map