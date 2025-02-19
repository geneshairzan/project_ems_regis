rm -rf ./prisma/migrations

npx prisma migrate reset -f
npx prisma migrate dev

node prisma/seed.js
