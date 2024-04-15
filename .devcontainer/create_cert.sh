#!/bin/sh

sudo mkdir -p nginx/conf.d/tls
sudo openssl req -config localhost.openssl.cnf -x509 -newkey rsa:4096 -nodes -keyout nginx/conf.d/tls/privkey.pem -out nginx/conf.d/tls/cert.pem -days 365
#sudo chmod 700 nginx/conf.d/tls
#sudo chown -R root:root nginx/conf.d/tls
