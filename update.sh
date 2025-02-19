cd /home/adminems/project/ems_regis
git pull git master
npm i
npm run build
pm2 restart project_ems_regis
