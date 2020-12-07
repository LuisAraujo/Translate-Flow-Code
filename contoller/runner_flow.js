Runner = function(){ 
	this.inputlist = [];
	this.timestep = 1500;
	this.commands = "";
}
//cada command deve ter a sua referência da stackblock para que seja executado 


/*Traduz o comando gerado pelo getCommands  em código javascript*/
Runner.prototype.runFlow = function(commands, id){
    
	var input_current_index = 0;
	var temp_code = "function temp(){";
	
	if(commands == undefined)
		 commands = this.commands;
	
	if(id == undefined)
		id = 0;
	var i = 0
	
	for(i = 0; i< commands.length; i++){	
		//não é loop ou decisao	
		if(commands[i].length == 2){
			setTimeout(this.showExecutingBlock.bind(null,commands[i][1]) , this.timestep*id);
			currentcode = commands[i][0].split(":");
			
			//testar se o eval antes pode causar erro
			if(currentcode[0] == "process"){
				temp_code += currentcode[1] +";";
				setTimeout( eval.bind(null, currentcode[1]), this.timestep*id);
			}else if(currentcode[0] == "input"){
				temp_code +=  currentcode[1] + " = " + this.inputlist[input_current_index++]+";"
				//eval(currentcode[1] + " = " + this.inputlist[input_current_index++])
				setTimeout( eval.bind(null, currentcode[1] + " = " + this.inputlist[input_current_index++]), this.timestep*id);
			}else if(currentcode[0] == "output"){
				temp_code +=  currentcode[1]+";"
				setTimeout(  this.showMessageRun.bind(null, currentcode[1], commands[i][1]), this.timestep*id );
			}else if(currentcode[0] == "End")
				setTimeout(  this.endRunning.bind(null, id) , this.timestep* (id+1) );
					
		}else{
			
			setTimeout(this.showExecutingBlock.bind(null,commands[i][4]) , this.timestep*id);
		
			if(commands[i][0] == "decision"){
				//TODO: há um problema em avaliar no scopo!!!
			var temp_code2 = temp_code + "; if(" + commands[i][1] + ") return true; else return false; }; temp()";
				console.log(temp_code2)
				
				temp_code +=  commands[i][1];
				
				if( eval( commands[i][1] ) )
					id = this.runFlow(commands[i][2], id);
				else
					id = this.runFlow(commands[i][2], id);

			}else if(commands[i][0] == "loop"){
				var temp_code2 = temp_code + "; if(" + commands[i][1] + ") return true; else return false; }; temp()";
				console.log( eval( temp_code2) );
				
				temp_code +=  commands[i][1];
				
				if( eval(commands[i][1]) ){
					var lastblock = this.runFlow(commands[i][2], id);
					id = lastblock[0];
					continue_id = lastblock[1];
					
					setTimeout( this.hideExecutingBlock.bind(null, continue_id), this.timestep*id);
					
					i--;
				}else{
					lastid = commands[i][4];
					
					setTimeout( this.hideExecutingBlock.bind(null, lastid), this.timestep*id);
					
					var lastblock = this.runFlow(commands[i][3], id);
					id = lastblock[0];
					continue_id = lastblock[1];
					
					//console.log(lastid+1, continue_id, ef.stackBlock[continue_id] );
					
				}
			
			}
		}
		
		id++;
	
	}
	
	console.log(commands, i)
	if(commands[i-1].length == 2)
		return  [ id, commands[i-1][1]]
	else
		return  [ id, commands[i-1][4]]
	
}

Runner.prototype.showExecutingBlock = function(id){

	if(id > 0)
		ef.stackBlock[id-1].executing = false; 
	
	ef.stackBlock[ id ].executing = true; 
		
}

Runner.prototype.hideExecutingBlock = function(id){

	ef.stackBlock[ id ].executing = false; 
		
}

Runner.prototype.showMessageRun = function(command, id){
	MSG_TEXT_RUN.html(">>  " + eval( command ) + "<span class='msg-block-id'> - block id: "+ id+"</span>");
	//console.log(  );
}

Runner.prototype.startRunning = function(commands){
	count_loop = 0;
	INPUTS_VALUES_CONATINER.html("");
	
	for(var i=0; i < commands.length; i++){
		var type = commands[i][0].split(":")[0];
		console.log(type);
		if(type == "input"){
			count_loop++;
			INPUTS_VALUES_CONATINER.append("<div class='inputs'><span class='label'>input  "+count_loop+" </span> : <input class='input-values'></input></div>");
		}
	}
	
	if(count_loop > 0){
		MODAL_INPUTS.show();
		this.commands = commands
	}else
		this.runFlow(commands)
	
	;
}

Runner.prototype.endRunning = function(id){
	ef.stackBlock[id].executing = false; 
	MSG_RUN.hide();
}

