const pg = require("pg");
const settings = require("./settings");
var name = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function makeNice(peeps) {
  var string = '';
  for (let i = 0; i < peeps.length; i++) {
    var people = `\n- ${i + 1}: ${peeps[i].first_name} ${peeps[i].last_name}, born '${peeps[i].birthdate.toString().slice(0, 15)}'`;

    string += people;
  }
  return `Found ${peeps.length} persons(s) by the name of '${name}': ${string}`;
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text", [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Searching ...');
    console.log(makeNice(result.rows));
    client.end();
  });
});

