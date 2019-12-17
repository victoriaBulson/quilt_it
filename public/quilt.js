///////////////////
// Manage Quilts //
///////////////////

function displayQuilt(){
	alert("Display Quilt Feature In Progress");
   /* var quilt_id = document.getElementById("display_quilt").value;
    var params = {user:'sally', quilt_id: quilt_id};
    
    $.get('/getArrangement', params, function(data){
        for (var i = 0; i < data[0].arrangement.length; i++){
            var square_id = data[0].arrangement[i];
            var params = {square_id: square_id}
            $.get('/getLink', params, function(data){
                        
            });
                    
            $("#div1").append(data[0].arrangement[i]);
            console.log(data[0].arrangement[i]);
        }
    }, "json" );*/
}

function addQuilt(){
	alert("Add Quilt Feature In Progress");
}

function editQuilt(){
	alert("Edit Quilt Feature In Progress");
}

////////////////////
// Manage Squares //
////////////////////

// wait for the DOM to be loaded 
$(document).ready(function() { 
	// bind 'myForm' and provide a simple callback function 
    $('#myForm').ajaxForm(function() { 
		console.log("AJAX FORM");
    	/*if (square_col == 0){
        	var row_id = 'square'+square_row;
            var html = '<div class="row" id="square'+square_row+'">';
            $('#squares').append(html);
		}*/
	}); 
}); 

function deleteSquare(id){
	var parent = $("#"+id).parent();
	var square_id = parent[0].id;
	var parent = document.getElementById(square_id);
	var params = {square_id: square_id};
	console.log(params);
	$.post("/deleteSquare", params, function(result) {
		console.log("RETURNED");
		if (result && result.success) {
			console.log("SUCCESS DELETE");
			$("#status").text("Successfully Deleted Square.");
			parent.parentNode.removeChild(parent);
		} else {
			console.log("NO DELETE");
			$("#status").text("Error Deleting Square.");
			
		}
		
	}, "json");
}

//////////////////
// LOAD DETAILS //
//////////////////

function loadDetails(){
    getUser();
	getQuiltNames();
	getSquares();
}

function getUser(){
	// Display Username
    $.get('/getUser', function(data){
        $('#welcome').append(data.user);
    }, "json" );
}

function getQuiltNames(){
	// Populate Quilt Selector
    $.get('/getQuiltNames', function(data){
        for (var i in data){
            //console.log(data[i].quilt_id);
            //console.log(data[i].name);
            var html0 = '<option value="';
            var html1 = data[i].quit_id;
            var html2 = '">' + data[i].name;
            var html3 = '</option';
            var html = html0.concat(html1, html2, html3);
            $('#select_quilt').append(html);
        }
    });
}

function getSquares(){
	var square_col= 0;
	var square_row = 0;
	//Populate Designer's Squares
    $.get('/getSquares', function(data){
        for (var i in data){
			// Create Row Div
            if (square_col == 0){
                var row_id = 'square'+square_row;
                var html = '<div class="row" id="square'+square_row+'">';
                $('#squares').append(html);
            }
            // Square Image div
			var img_id = data[i].square_id;
			var html = '<div class="img" id='+img_id+'>';
			$('#'+row_id).append(html);
            var html0 = '<img src="/squares/';
            var html1 = data[i].link;
            var html2 = '" alt="Square Image">';
			var html3 = '<p>Square #: '+img_id+'</p>';
       		var html4 = '<button id="button'+img_id+'" onclick="deleteSquare(this.id);">Delete</button>';
			var html = html0.concat(html1, html2, html3, html4);
            $('#'+img_id).append(html);
            // Handle Rows
            if (square_col == 4){
                $('#squares').append('<br>');
                square_row++;
                square_col = 0;
            } else { square_col++ }
        }
    });
}