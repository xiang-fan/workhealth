#!/bin/bash

LDAP_URI=$1
LDAP_PASSWORD=$2
LDAP_ADMIN_CN=$3
LDAP_BASE=$4
DIRNAME=$(dirname "$0")

echo "Adding users to ldap server..."

ldapadd \
    -H "${LDAP_URI}" \
    -x \
    -c \
    -w "${LDAP_PASSWORD}" \
    -D "${LDAP_ADMIN_CN},${LDAP_BASE}" \
    -f "$DIRNAME"/users.ldif

echo "Done"
