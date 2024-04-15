#!/bin/sh

mkdir -p tls
openssl req -config localhost.openssl.cnf -x509 -newkey rsa:4096 -nodes -keyout tls/privkey.pem -out tls/cert.pem -days 365
#sudo chmod 700 nginx/conf.d/tls
#sudo chown -R root:root nginx/conf.d/tls
