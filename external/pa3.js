//Bailor, Jawad, Robbie
//3/24/21
//Javascript code
//Javascript implements a large majority of the functionality for the website. 

$(document).ready(function(){

// on button click
  $("button").click(function(){
    //gets value from user input box
    var val = parseInt($("input:text").val());
    //if value is over 20, re-prompt input
    if (val>20){
        $(".image").hide();
        $(".alert").html("Number has to be <= 20, try again with the appropriate input.").show();
    }
    //else, value is valid. proceed with table generation
    else{
        //removes image
        $( ".image" ).hide();
        //initializes table
        $('.math_table').html('');
        //counter that holds countdown
        var counter = val;
        //sets up table formatting in html
        var tr = $('<tr></tr>');
        tr.append($('<td class = "outer_layer">' +'</td>'));
        //loop runs equivalent to value the user enters
        for (var x=1; x<=val; x++) {
            //populates table with first row and first column
            tr.append($('<td class = "outer_layer">'+ x +'</td>'));
        }
        $('.math_table').append(tr);

        //generates 2 random values. these determine column / row to randomly remove number from table
        var rand_input_1 = Math.ceil(Math.random() * val);
        var rand_input_2 = Math.ceil(Math.random() * val);
        //initializes check_input, which verifies user input once countdown is up
        var check_input = true;

        //loops to generate table again, this time the actual content of the multiplication table
        for (var y=1; y<=val; y++) {
            tr = $('<tr></tr>');
            for (var z=1; z<= val; z++) {
                //populates multiplication table
                if (z==1){
                    tr.append($('<td class = "outer_layer">'+ y +'</td>'));
              }
                //running in to the random number that has been chosen to be removed, inserts an input box instead
                if (y===rand_input_1 && z===rand_input_2 && check_input) {
                    var correct_input = y*z;
                    tr.append($('<td class = ""><input type="text" id="user_input" form="my_form" /></td>'));
                    check_input = false;
              }
              else {
                //appends to tr, which is storing the table
                tr.append($('<td class = "inner">'+ y*z +'</td>'));}
            }

            $('.math_table').append(tr);
        }
        //for coloring the cell. begins on "even" then switches to odd after coloring it
        var even_cell = true;

        //if even (val % 2)
        if (val % 2 != 0) {
            $("tr:even td:odd").css("background-color", "red");
            $("tr:even td:even").css("background-color", "blue");
            $("tr:odd td:odd").css( "background-color", "blue");
            $("tr:odd td:even").css("background-color", "red");
            even_cell = false;
        }
        else {

            $("tr td:odd").css( "background-color", "red" );
            $("tr td:even").css( "background-color", "blue" );
        }
        //sets the background color of first row and column to be static yellow
        $('.outer_layer').css('background-color', 'yellow');

        //boolean that tells the website to change color of tables
        var switch_cell_color = true;
        var check = $("tr td:odd").css('background-color');
        var yellow = "rgb(255, 255, 0)";
        var time = setInterval(function() {
            //subtracts one from countdown until 0
            counter -= 1;
            if (counter === 0){

                clearInterval(time);
                //grabs user input from the table
                var ans = parseInt($('#user_input').val());

                //if key is correct
                if (ans === correct_input) {
                    //print good job!
                    $(".correct").html(ans + " == correct input, good job!").show();
                }
                else {
                    //else, try again
                    $(".incorrect").html("Incorrect input, try again!").show();
                }   
                

                //after a brief delay, allowing the user to read the result, reset the webpage
                var delay_timer = setTimeout(function(){

                    $(".correct").hide();
                    $( ".incorrect" ).hide();
                    $(".image").show();
                },4000)
                $( ".math_table" ).hide();           
            }

            //animates a color change based on the timers value. every time timer % 4 = 0
            if (counter % 4 == 0) { 
                if (even_cell) {
                    if (check === yellow && switch_cell_color) {
                        //changes odd cells to blue, even to red, and maintains outer_layer as yellow
                        $("tr td:odd").css('background-color', 'blue');
                        $("tr td:even").css('background-color', 'red');
                        $(".outer_layer").css('background-color', 'yellow');
                        switch_cell_color = false;
                    
                    }

                    else {
                        //changes odd to red, even to blue, and maintains outer_layer as yellow
                        $("tr td:odd").css('background-color', 'red');
                        $("tr td:even").css('background-color', 'blue');
                        $(".outer_layer").css('background-color', 'yellow');
                        switch_cell_color = true;
                    }
                }
                else {
                    if (check === yellow && switch_cell_color) {
                        //changes odd to blue, then even to red, then odd to blue again, then even once more
                        //maintains outer_layer as yellow
                        $("tr:even td:odd").css('background-color', 'blue');
                        $("tr:even td:even").css('background-color', 'red');
                        $("tr:odd td:odd").css('background-color', 'red');
                        $("tr:odd td:even").css('background-color', 'blue');
                        $(".outer_layer").css('background-color', 'yellow');
                        switch_cell_color = false;
                    
                    }

                    else {
                        //changes odd to red, even to blue, and maintains outer_layer as yellow
                        $("tr:even td:odd").css('background-color', 'red');
                        $("tr:even td:even").css('background-color', 'blue');
                        $("tr:odd td:odd").css('background-color', 'blue');
                        $("tr:odd td:even").css('background-color', 'red');
                        $(".outer_layer").css('background-color', 'yellow');
                        switch_cell_color = true;
                    }
                }
            }
        //prints countdown timer, updating it accurately
        $(".timer").html(counter + " Seconds left!").show();

        }, 1000)
    }

  });

});
