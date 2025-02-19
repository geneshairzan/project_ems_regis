cd /home/adminems/project/ems_regis/application
git pull git master
npm i
npm run build
pm2 restart project_ems_regis
