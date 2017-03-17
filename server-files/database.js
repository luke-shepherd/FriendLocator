var pg = require('pg');

//var client = new pg.Client(process.env.DATABASE_URL);



var client = new pg.Client({
   user: 'adult',
   password: 'adult',
   database: 'adult',
   host: 'localhost'
});


//var client = new pg.Client('postgres://adult:cmps183softwareproject@localhost:5432/adult');

//var client = new pg.Client(process.env.DATABASE_URL);

// connect to our database
client.connect(function (err) {
  if (err) console.log(JSON.stringify(err));
});

var query = client.query({
 text: 'SELECT column_name FROM information_schema.columns WHERE table_name =$1', 
 values: ['tokens']
},function(err, result){
   if (err) throw err;
   console.log(result.rows[1]);
});

/*
function storeToken(data){
  pg.connect
}
*/
