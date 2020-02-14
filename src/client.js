// Wrapper for client interface to feathers-authenticate-management
const errors = require('@feathersjs/errors');

function AuthManagement (app) { // eslint-disable-line no-unused-vars
  if (!(this instanceof AuthManagement)) {
    return new AuthManagement(app);
  }

  const authManagement = app.service('authManagement');

  this.checkUnique = async (identifyUser, ownId, ifErrMsg) => authManagement.create({
    action: 'checkUnique',
    value: identifyUser,
    ownId,
    meta: { noErrMsg: ifErrMsg }
  }, {});

  this.resendVerifySignup = async (identifyUser, notifierOptions) => authManagement.create({
    action: 'resendVerifySignup',
    value: identifyUser,
    notifierOptions
  }, {});

  this.verifySignupLong = async (verifyToken) => authManagement.create({
    action: 'verifySignupLong',
    value: verifyToken
  }, {});

  this.verifySignupShort = async (verifyShortToken, identifyUser) => authManagement.create({
    action: 'verifySignupShort',
    value: { user: identifyUser, token: verifyShortToken }
  }, {});

  this.sendResetPwd = async (identifyUser, notifierOptions) => authManagement.create({
    action: 'sendResetPwd',
    value: identifyUser,
    notifierOptions
  }, {});

  this.resetPwdLong = async (resetToken, password) => authManagement.create({
    action: 'resetPwdLong',
    value: { token: resetToken, password }
  }, {});

  this.resetPwdShort = async (resetShortToken, identifyUser, password) => authManagement.create({
    action: 'resetPwdShort',
    value: { user: identifyUser, token: resetShortToken, password }
  }, {});

  this.passwordChange = async (oldPassword, password, identifyUser) => authManagement.create({
    action: 'passwordChange',
    value: { user: identifyUser, oldPassword, password }
  }, {});

  this.identityChange = async (password, changesIdentifyUser, identifyUser) => authManagement.create({
    action: 'identityChange',
    value: { user: identifyUser, password, changes: changesIdentifyUser }
  }, {});

  this.authenticate = async (email, password) => {
    return app.authenticate({ strategy: 'local', email, password })
      .then(result => {
        const user = result.user;

        if (!user) {
          app.logout();
          return new errors.NotAuthenticated('Invalid login');
        }

        if (!user.isVerified) {
          app.logout();
          return new errors.NotAuthenticated('User\'s email is not verified');
        }

        return result;
      })
      .catch((err) => {
        return err;
      });
  };
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = AuthManagement;
}
