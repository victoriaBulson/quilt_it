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

// Setup File Save Support
var upload = require("express-fileupload");
app.use(upload());

// Body Parser Middleware for Post
app.use(express.json() );
// to support URL-encoded bodies
app.use(express.urlencoded({ extended: true })); 

/////////////////////
// Interface Layer //
/////////////////////

// Send User
app.get('/getUser', function(req, res){
    var user='Sally';
    res.json({user: user});
    
});

// Send Quilt Names 
app.get('/getQuiltNames', function(req, res){
    var user = 'sally';
    queryQuiltNames(user, function(error, quilts){
        if(error){
            res.status(500).json({success:false, data:error})
        }
        res.json(quilts);
        return;
    });
    return;
});

// Send Squares
app.get('/getSquares', function(req, res){
    var user = 'sally';
    querySquares(user, function(error, squares){
        if(error){
            console.log("ERROR");
            res.status(500).json({success:false, data:error})
        }
        res.json(squares);
    });
});

// Request to Delete Square
app.post('/deleteSquare', function(req, res){
	var square_id = req.body.square_id;
	deleteSquare(square_id, function(error, result){
		console.log("SENDING RESEULT TO CLIENT: "+result);
		res.json(result);
	});
	
});

// Request to Save New Square
app.post('/addSquare', function(req, res){
	var user = 'sally';
	if(req.files){
		// Save File
		var file = req.files.filename;
		var filename = req.files.filename.name;
		file.mv('./public/squares/'+filename, function(err){
			if(err) {
				// Error Handling
				console.log(err);
				res.send(err)
			} else{
				// Request Insert Into Database
				console.log("FILE UPLOADED!");
				insertSquare(filename, user, function(req, result){
					console.log("writing home page");
				})
			}
		});
		res.redirect('back');
	}
});

////////////////////
// DATABASE LAYER //
////////////////////

// Insert New Square Into Database
function insertSquare(link, designer, callback){
	var query = 'INSERT INTO squares (link, designer) VALUES ($1, $2);';
	var params = [link, designer];
	pool.query(query, params, function(error, result){
        if(error){
            console.log('error inserting Square:: ' + error);
			callback(error, {success:false});
        } else{
            console.log("Insert successful");
			callback(null, {success:true})
        }
    });
};

// Delete Square From Database
function deleteSquare(id, callback){
	var query = 'DELETE FROM squares WHERE square_id=$1';
	var params = [id];
    pool.query(query, params, function(error, result){
        if(error){
            console.log('error deleting Square:: ' + error);
			callback(error, {success:false});
        } else{
            console.log("delete successful");
			callback(null, {success:true})
        }
    });
}

// Get Squares
function querySquares(designer, callback){
    var query = 'SELECT link, square_id FROM squares WHERE designer=$1';
    var params = [designer];
    pool.query(query, params, function(error, result){
        if(error){
            console.log('error querying Squares:: ' + error);
            callback(error, null);
        } else{
            callback(null, result.rows);
        }
    });
}

// Get Quilt Names
function queryQuiltNames(designer, callback){
    var query = "SELECT name, quilt_id FROM quilts WHERE designer=$1";
    var params = [designer];
    pool.query(query, params, function(error, result){
        if(error){
            console.log('error querying quilt names');
            callback(error, null);
        }
        callback(null, result.rows);
    });
}
