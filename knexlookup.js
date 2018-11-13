const settings = require("./settings");
var name = process.argv[2];
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

function makeNice(peeps) {
  var string = '';
  for (let i = 0; i < peeps.length; i++) {
    var people = `\n- ${i + 1}: ${peeps[i].first_name} ${peeps[i].last_name}, born '${peeps[i].birthdate.toString().slice(0, 15)}'`;

    string += people;
  }
  return `Found ${peeps.length} persons(s) by the name of '${name}': ${string}`;
}

var query = knex.select('*').from('famous_people').where(knex.raw('?? = ?', ['first_name', name])).orWhere(knex.raw('?? = ?', ['last_name', name]));

query.asCallback(function (err, rows) {
  if (err) console.log('Err: ', err);
  console.log('Searching ...');
  console.log(makeNice(rows));
  knex.destroy();
});




