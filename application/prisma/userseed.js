const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const data = require("./user.json");
const { forEach } = require("lodash");

async function hashing(raw, cycle = 5) {
  return await bcrypt.hash(raw, cycle);
}

const extendPrisma = prisma.$extends({
  model: {
    user: {
      async create(raw) {
        return await prisma.user.create({
          data: { ...raw.data, password: null },
        });
      },
    },
  },
});

async function main() {
  console.log(data);

  data.forEach(async (d) => {
    await extendPrisma.user.create({
      data: {
        name: d[0],
        role_id: parseInt(d[1]),
        img: d[2],
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
