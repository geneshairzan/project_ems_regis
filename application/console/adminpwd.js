const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const args = process.argv;

async function hashing(raw, cycle = 5) {
  return await bcrypt.hash(raw, cycle);
}

const extendPrisma = prisma.$extends({
  model: {
    user: {
      async create(raw) {
        return await prisma.user.create({
          data: { ...raw.data, password: await hashing(raw?.data.password || "password") },
        });
      },
    },
  },
});

// $2b$05$mQ8V4Kqz5P1v9zXzfgIXz.nVtEdCuldkW.MQJek73Kh2zEjxbV1qy

async function main() {
  let argsin = {
    newpwd: args?.[2],
  };
  console.log("pwd changed");

  await prisma.user.updateMany({
    where: {
      email: "admin@admin.com",
    },
    data: {
      password: await hashing(argsin.newpwd),
    },
  });
  console.log("pwd changed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
