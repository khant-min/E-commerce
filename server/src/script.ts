import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "test",
      email: "test@gmail.com",
      address: "no.1, bandula madaya",
      password: "23as232",
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
