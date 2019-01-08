#!/bin/bash

sudo apt purge -y nodejs nodejs-legacy npm

./nodesource_setup.sh

sudo apt install -y nodejs

sudo npm i -g yarn

sudo chown -R vagrant:vagrant /home/vagrant/.config /home/vagrant/.npm
