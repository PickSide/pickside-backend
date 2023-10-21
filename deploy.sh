#/bin/sh

export NVM_DIR=$HOME/.nvm
source $HOME/.nvm/nvm.sh
cd $HOME/pickside-backend &&
    git checkout release &&
    git fetch --all &&
    git reset --hard origin/release &&
    git pull origin release &&
    npm ci &&
    pm2 delete all
    pm2 start "npm run start" --name "pickside-api"
    pm2 save
