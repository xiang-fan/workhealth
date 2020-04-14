const ldapConnectionOptions = {
    uri: process.env.LDAP_URI,
    validatecert: false,
    base: process.env.LDAP_BASE,
    connecttimeout: -1,
};

module.exports = ldapConnectionOptions;
