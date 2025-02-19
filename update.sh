cd /home/adminems/application
git pull git main
npm i
npm run build
pm2 restart project_ems
