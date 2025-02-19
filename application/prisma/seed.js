const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

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

let UserType = ["user", "employee", "admin"];
let status = ["active", "inactive"];
let UserRole = [
  { name: "EVENT CREW", color: "#2f2f2f" },
  { name: "VIP CREW", color: "#2f2f2f" },
  { name: "MOONTON", color: "#0000fe" },
  { name: "MEDIA", color: "#fe0000" },
  { name: "VIP", color: "#ffff00" },
  { name: "KOL", color: "#00ffff" },
  { name: "EXHIBITOR", color: "#08fb05" },
];

function stdMap(d) {
  return { name: d };
}

async function main() {
  await prisma.UserType.createMany({
    data: [...UserType.map(stdMap)],
    skipDuplicates: true,
  });

  await prisma.UserRole.createMany({
    data: [...UserRole],
    skipDuplicates: true,
  });

  await prisma.status.createMany({
    data: [...status.map(stdMap)],
    skipDuplicates: true,
  });

  let user = await extendPrisma.user.findUnique({
    where: {
      email: "admin@admin.com",
    },
  });

  !user &&
    (await extendPrisma.user.create({
      data: {
        email: "admin@admin.com",
        name: "admin",
        password: "password",
        type_id: 3,
      },
    }));
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
