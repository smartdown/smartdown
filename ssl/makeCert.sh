#!/usr/bin/env bash

rm -f ca.crt ca.key cert.crt cert.key

npx mkcert create-ca
npx mkcert create-cert --domain "localhost,127.0.0.1"
