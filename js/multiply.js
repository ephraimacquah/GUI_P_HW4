/*
Name: Ephraim Acquah
Email: Ephraim_Acquah@student.uml.edu
*/


$().ready(function(){

//makes sure that slider changes when input is given
  $('#x_begin').on('change keyup', function(){
    var val = $(this).val();
    $( "#xb_slider" ).slider( "value", val );
    fillTable();
  });

  $('#x_end').on('change keyup', function(){
    var val = $(this).val();
    $( "#xe_slider" ).slider( "value", val );
    fillTable();
  });
  
  $('#y_begin').on('change keyup', function(){
    var val = $(this).val();
    $( "#yb_slider" ).slider( "value", val );
    fillTable();
  });
  
  $('#y_end').on('change keyup', function(){
    var val = $(this).val();
    $( "#ye_slider" ).slider( "value", val );
    fillTable();
});

  //makes sure that input changes when slider is moved
  $("#xb_slider").slider({
    min: -500,
    max: 500,
    step: 2,
    value: $("#x_begin").val(),

    slide: function( event, ui ) {
      ui.handle = $("#x_begin");
      $("#x_begin").val(ui.value);
      fillTable();
    }
  });

  $("#xe_slider").slider({
    min: -500,
    max: 500,
    step: 2,
    value: $("#x_end").val(),

    slide: function( event, ui ) {
      ui.handle = $("#x_end");
      $("#x_end").val(ui.value);
      fillTable();
    }
  });

  $("#yb_slider").slider({
    min: -500,
    max: 500,
    step: 2,
    value: $("#y_begin").val(),

    slide: function( event, ui ) {
      ui.handle = $("#y_begin");
      $("#y_begin").val(ui.value);
      fillTable();
    }
  });

  $("#ye_slider").slider({
    min: -500,
    max: 500,
    step: 2,
    value: $("#y_end").val(),

    slide: function( event, ui ) {
      ui.handle = $("#y_end");
      $("#y_end").val(ui.value);
      fillTable();
    }
  });
  
//validation for each input field includes minimum length, that the input field be filled, and input must be numbers
  $("#form").validate({
    rules: {
     x_begin: {
       required: true,
       digits: true,
       minlength: 1
     },
     x_end: {
       required: true,
       digits: true,
       minlength: 1
     },
     y_begin: {
       required: true,
       digits: true,
       minlength: 1
     },
     y_end: {
       required: true,
       digits: true,
       minlength: 1
     }
    }, 
    //error messages
    messages: {
     x_begin: {
       required: "Please Enter the Minimum Column Value",
       minlength: "Please Enter the Minimum Column Value",
       digits: "Minimum Column Value must be a number"
     },
     x_end: {
       required: "Please Enter the Maximum Column Value",
       minlength: "Please Enter the Maximum Column Value",
       digits: "Maximum Column Value must be a number"
     },
     y_begin: {
       required: "Please Enter the Minimum Row Value",
       minlength: "Please Enter the Minimum Row Value",
       digits: "Minimum Row Value must be a number"
     },
     y_end: {
       required: "Please Enter the Maximum Row Value",
       minlength: "Please Enter the Maximum Row Value",
       digits: "Maximum Row Value must be a number"
     }
    }
   });

});

function fillTable() {
    if (validateForm()) { //if the form is valid then continue to fill the table
        clearTable(); //clear any existing table that has been generated
        var times_table = document.getElementById("times_table"); //get table var
        var x_min = Number($("#x_begin").val()); //get min col
        var x_max = Number($("#x_end").val()); //get max col
        var y_min = Number($("#y_begin").val()); //get min row
        var y_max = Number($("#y_end").val()); //get max row
        var curr_row;
        var curr_cell;
        times_table.insertRow(0).insertCell(0).innerHTML = "X"; //fill in top left cell
        for(var i = 1; i <= y_max - y_min + 1; i++) { // fills in row label column with min to max rows and sets styling
            var th = document.createElement("th");
            th.innerHTML = i + y_min - 1;
            th.style.backgroundColor = "bisque";
            th.style.color = "brown";
            curr_row = times_table.insertRow(i);
            curr_row.appendChild(th);
        }

        for(i = 1; i <= x_max - x_min + 1; i++) { // fills in column label row with min to max columns and sets styling
            var th = document.createElement("th");
            th.innerHTML = i - 1 + x_min;
            th.style.backgroundColor = "bisque";
            th.style.color = "brown";
            times_table.rows[0].appendChild(th); 
        }

        for(i = 1; i <= y_max - y_min + 1; i++) { //goes through each row and sets cell value to product of row and column
            curr_row = times_table.rows[i];
            for(var j = 1; j <= x_max - x_min + 1; j++) {
                curr_cell = curr_row.insertCell(j);
                curr_cell.style.color = "brown";
                curr_cell.style.backgroundColor = "cornsilk";
                curr_cell.innerHTML = (i + y_min - 1) * (j + x_min - 1);
            }
        }
    }
}

//checks that input isn't empty, is a number, and isn't too large
//if so then appropriate error message is displayed under input area
function validateForm(){
  let xb = $("#x_begin").val(); 
  let xe = $("#x_end").val();
  let yb = $("#y_begin").val();
  let ye = $("#y_end").val();
  
  if(xb == "" || yb == "" || xe == "" || ye == "") {
    $("#error").css("color", "brown");
    $("#error").css("text-align", "center");
    $("#error").text("Please fill out all fields");
    clearTable();
    return false;  
  }
  
  if (isNaN(xb)) {
    $("#error").css("color", "brown");
    $("#error").css("text-align", "center");
    $("#error").text("Minimum Column Value must be a number");
    clearTable();
    return false; 
  } else if (Number(xb) < -500) {
    $("#error").css("color", "brown");
    $("#error").css("text-align", "center");
    $("#error").text("Minimum Column Value is too low");
    clearTable();
    return false;
  } else if (isNaN(xe)) {
    $("#error").css("color", "brown");
    $("#error").css("text-align", "center");
    $("#error").innerHTML = "Maximum Column Value must be a number";
    clearTable();
    return false; 
  } else if (Number(xe) > 500) {
    $("#error").css("color", "brown");
    $("#error").css("text-align", "center");
    $("#error").text("Maximum Column Value is too high");
    clearTable();
    return false;
  } else if (Number(xb) > Number(xe)) {
    $("#error").css("color", "brown");
    $("#error").css("text-align", "center");
    $("#error").innerHTML = "Maximum Column Value must be greater than Minimum Column Value";
    clearTable();
    return false;
  }

  if (isNaN(yb)) {
    $("#error").css("color", "brown");
    $("#error").css("text-align", "center");
    $("#error").text("Minimum Row Value must be a number");
    clearTable();
    return false; 
  } else if (Number(yb) < -500) {
    $("#error").css("color", "brown");
    $("#error").css("text-align", "center");
    $("#error").text("Minimum Row Value is too low");
    clearTable();
    return false;
  } else if (isNaN(ye)) {
    $("#error").css("color", "brown");
    $("#error").css("text-align", "center");
    $("#error").text("Maximum Row Value must be a number");
    clearTable();
    return false; 
  } else if (Number(ye) > 500) {
    $("#error").css("color", "brown");
    $("#error").css("text-align", "center");
    $("#error").text("Maximum Row Value is too high");
    clearTable();
    return false;
  } else if(Number(yb) > Number(ye)){
    $("#error").css("color", "brown");
    $("#error").css("text-align", "center");
    $("#error").text("Maximum Row Value must be greater than Minimum Row Value");
    clearTable();
    return false;
  }

  return true;
}

function clearTable() {
    table =  document.getElementById("times_table");
    len = table.rows.length;
    for(var i = 0; i < len; i++) { //deletes each row of the table
        table.deleteRow(0);
     }
}