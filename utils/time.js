const moment = require('moment-timezone');
const dateBrazil = moment.tz(Date.now(), "America/Sao_Paulo");

module.exports = dateBrazil

