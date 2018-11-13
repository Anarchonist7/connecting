const settings = require("./settings");
var fName = process.argv[2].toString();
var lName = process.argv[3].toString();
var date = process.argv[4].toString();

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});
knex('famous_people').insert({'first_name': fName, 'last_name': lName, 'birthdate': date}).asCallback(function (err, rows) {
  if (err) console.log('Err: ', err);
  console.log('BEEP BOP INSERTION COMPLETE!');
  knex.destroy();
});
