

$('.close').click(function(){
	$('.container-fluid').fadeOut("slow");
});
	
$('#button1').click(function(){
   var newOl = $(document.createElement('ol'))
	   	.attr("id", 'steps_ol')
	   	.attr("style", 'visibility: hidden;');
  var x = parseInt($('#sel_rows').val());
  var y = parseInt($('#sel_cols').val());
  $(this).hide();
  $('#inp_row').hide();
  console.log(x, y);
  counter = 1;
  for(var i = 0; i<x; i++){
    for(var j=0; j<y; j++){
      var newTextBoxDiv = $(document.createElement('div'))
      .attr("id", 'TextBoxDiv' + counter)
      .attr("class", 'inp_div');
      newTextBoxDiv.after().html('<input type="text" class="inp" name="textbox' + counter + '" id="textbox' + counter + '" value="'+ counter+'">');
      newTextBoxDiv.appendTo("#TextBoxesGroup");
      counter++;
    }
    var newBr = $(document.createElement('br'))
    	.attr("class", 'br_class');
    newBr.appendTo("#TextBoxesGroup");
  }
  var newResult = $(document.createElement('h3'))
		.attr("id", 'Calculate');
	newResult.after().html('Enter the Matrix: ');
	newResult.appendTo("#result_div");
  var newButton = $(document.createElement('button'))
    .attr("type", 'button')
    .attr("class", 'btn btn-default')
    .attr("id", 'button2');
  newButton.after().html('Calculate');
  newButton.appendTo("#next_bttn");

  $('#button2').click(function(){
		$('#steps_div').hide();
	  $('#Calculate').remove();
	  var Matrix = new Array(x);
	  for(var i=0; i<x; i++){
		  Matrix[i] = new Array(y);
	  }
	  counter = 1;
	  for(var i=0; i<x; i++){
		  for(var j=0; j<y; j++){
			  var temp = parseInt($('#textbox'+counter).val());
			  Matrix[i][j] = temp;
			  counter++;
		  }
	  }
	  calculate(Matrix, x, y);
    counter = 1;
	  for(var i=0; i<x; i++){
		  for(var j=0; j<y; j++){
        var temp = Matrix[i][j];
			  $('#textbox'+counter).val(temp);
			  $('#textbox'+counter)
			  .attr('readonly', "readonly")
			  .attr('style', "background-color:black; color: white;");
			  counter++;
		  }
	  }
	var newResult = $(document.createElement('h3'))
		.attr("id", 'result');
	newResult.after().html('RREF of the matrix is: ');
	newResult.appendTo("#result_div");
    $('#button2').remove();
    var newButton2 = $(document.createElement('button'))
      .attr("type", 'button')
      .attr("class", 'btn btn-default')
      .attr("id", 'button4')
      .attr("style", 'margin: auto 10px');
    newButton2.after().html('Show Steps');
    newButton2.appendTo("#next_bttn");
    
    var newButton1 = $(document.createElement('button'))
      .attr("type", 'button')
      .attr("class", 'btn btn-danger')
      .attr("id", 'button3');
    newButton1.after().html('Reset');
    newButton1.appendTo("#next_bttn");
    
		var steps_shown = 0;
    $('#button4').click(function(){
			if(steps_shown == 0) {
				$('#steps_div').show();
				$(newButton2).html('Hide Steps');
				steps_shown = 1;
			}
			
			else if(steps_shown == 1) {
				$('#steps_div').hide();
				$(newButton2).html('Show Steps');
				steps_shown = 0;
			}			
    });
    
   
	   	
    $('#button3').click(function(){
		$(this).hide();
		$('#inp_row').show();
		$('#button1').show();
		for(var c=1; c<=(x*y); c++){
			$('#textbox'+c).remove();
		}
		$(this).remove();
		$('#result').remove();
		$('.br_class').remove();
		$('#button4').remove();
		$('#steps_div').empty();
	});

  });
});


var showRes = function(res){
	var newStep = $(document.createElement('li'))
		.attr("id", 'steps_li');
	newStep.after().html(res);
	newStep.appendTo("#steps_div");

}

var showAdd = function(a, b, n){
	a = a+1;
	b= b+1;
	if(n == 1){
		//var res = "Add row "+b+" to row "+a;
		var res = "-> R<sub>"+a+"</sub> R<sub>"+b+"</sub>";
	}
	else if(n>1){
		//var res = "Multiply row "+b+" with "+n+" and then add it to row "+a;
		var res = "-> R<sub>"+a+"</sub> + "+n+"*R<sub>"+b+"</sub>";
	}
	else{
		n=n*(-1);
		//var res = "Multiply row "+b+" with "+n+" and then subtract it from row "+a;
		var res = "-> R<sub>"+a+"</sub> - "+n+"*R<sub>"+b+"</sub>";

	}
	showRes(res);
};

var showDiv = function(a,n){
	a = a+1;
	var res = "-> R<sub>"+a+"</sub> * 1/("+n+")";
	showRes(res);
}

  var calculate = function(Matrix, x, y) {
    for(var i=0; i<x; i++){
    for(var j=0; j<y; j++){
        if(Matrix[i][j] != 0){
            var temp1 = Matrix[i][j];
            if(temp1 != 1){
		            showDiv(i, temp1);
	            }
            for(var t=0; t<y; t++){
                Matrix[i][t] = Matrix[i][t]/temp1;
            }
            for(var s=0; s<x; s++){
                if(s != i){
                    var temp2 = Matrix[s][j];
                    showAdd(s, i, temp2);
                    for(var t=0; t<y; t++){
                        Matrix[s][t] = Matrix[s][t] - Matrix[i][t]*temp2;
                    }
               }
            }
            break;
          }
      }
    }
  };
