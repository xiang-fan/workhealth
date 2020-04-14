const LDAP = require('ldap-client');
const auth = require('basic-auth');
const util = require('util');

const userMiddleware = require('./middleware/user');
const ldapConnectionOptions = require('./config/ldap.config');

const ldap = new LDAP(ldapConnectionOptions);
const ldapbind = util.promisify(ldap.bind.bind(ldap));
const ldapsearch = util.promisify(ldap.search.bind(ldap));

async function basicAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({});
    }

    const { name, pass } = auth(req);

    await ldapbind({
      binddn: `cn=${name},${ldapConnectionOptions.base}`,
      password: pass
    });

    const ldapUser = await ldapsearch({
      filter: `(cn=${name})`,
    });

    const userData = await userMiddleware.findOne({
      ldapId: ldapUser[0].uid[0],
    });

    req.user = userData;

    next();
  } catch (e) {
    return res.status(401).send({ error: e.message })
  }
}

module.exports = basicAuth;