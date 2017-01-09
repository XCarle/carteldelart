var bcrypt   = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('creator', {
    localemail        : DataTypes.STRING,
    localpassword     : DataTypes.STRING,
    username     : DataTypes.STRING,
    resetpasswordtoken : DataTypes.STRING,
    resetpasswordexpires : DataTypes.DATE,
    facebookid		  : DataTypes.STRING,
	facebooktoken     : DataTypes.STRING,
	facebookemail     : DataTypes.STRING,
	facebookname      : DataTypes.STRING,
	type              : DataTypes.STRING,
	url               : DataTypes.STRING,
	a_x               : DataTypes.INTEGER,
	a_y               : DataTypes.INTEGER,
	a_d_x             : DataTypes.INTEGER
  },
  {
    classMethods: {
      generateHash : function(password) {
      	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      }			
    },
    instanceMethods: {			
      validPassword : function(password) {
      	return bcrypt.compareSync(password, this.localpassword);
      },
	getterMethods: {
		someValue: function() {
			return this.someValue;
		}
	},
	setterMethods: {
		someValue: function(value) {
			this.someValue = value;
		}
	}
    }
  });
};