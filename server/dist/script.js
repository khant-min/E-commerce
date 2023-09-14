"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const user = await prisma.user.create({
        data: {
            name: "test",
        },
    });
    console.log(user);
}
main()
    .catch(e => {
    console.error(e.message);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=script.js.map