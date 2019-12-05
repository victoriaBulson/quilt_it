// Setup express app
var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");

// Setup DB Connection
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgress://quilter:getstitches@localhost:5432/quilt_it";
const pool = new Pool({connectionString: connectionString});

// Setup Port and Listening Server
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
    console.log('the server is listening');
});

// Home Page
app.get('/home', function(req, res){
    
    // Set Vars
    var user = 'sally';
    
    // Get Quilt Names
    queryQuiltNames(user, function(error, quilts){
        if(error){
            res.status(500).json({success:false, data:error})
        }
        
        // Render EJS
        res.render("pages/home", {
            user: user,
            quilts: quilts  
        });
    });

});

function queryQuiltNames(designer, callback){
    var query = "SELECT name FROM quilts WHERE designer=$1";
    var params = [designer];
    pool.query(query, params, function(error, result){
        if(error){
            console.log('error querying quilt names');
            callback(error, null);
        }
        callback(null, result.rows);
    });
}
