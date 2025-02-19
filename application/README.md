`https://docs.google.com/document/d/1q_xKXRk5YW1kFoX9SEpcj-jtioG4kUfCtuSIr3lVLiA/edit#heading=h.85g0vtugpmi`

requirement

- nodeJs v18
- npm v10
- mysql v9 or mariadb v10

preparation :

1. copy .env.sample into .env
1. set .env variable accordingly
1. install depedency `npm i`
1. generate auth key : `node console/keyGenerate.js`
1. set `DATABASE_URL` inside .env.developtment with template `mysql://[username]:[password]@[host:port]/[db_name]`
1. run migration with `npx prisma migrate dev`
1. seed data with `node ./prisma/seed.js`
1. run dev with : `npm run dev`

production deployment

1. build `npm run buld`
1. install pm2 `npm i pm2 -g`
1. edit `ecosystem.config.js` as required paramater
1. start the service : `pm2 start ecosystem.config.js` (use node interpreter) or `pm2 start ecosystem-bun.config.js` (use bun interpreter)
1. register pm2 on startup : `pm2 startup`
1. save pm2 settings : `pm2 save`
1. by default application will run in port 7007 or as per define in `ecosystem.config.js`
