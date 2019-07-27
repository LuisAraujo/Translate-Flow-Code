Runner = function(){ }
//cada command deve ter a sua referência da stackblock para que seja executado 


/*Traduz o comando gerado pelo getCommands  em código javascript*/
Runner.prototype.runFlow = function(commands, id){
    	
	if(id == undefined)
		id = 0;

	timestep = 1500;
	var i = 0
	for(i = 0; i< commands.length; i++){	
		if(commands[i].length == 2)
			setTimeout(this.showExecutingBlock.bind(null,commands[i][1]) , timestep*id);
		else
			setTimeout(this.showExecutingBlock.bind(null,commands[i][4]) , timestep*id);
		id++;
		
		if(commands[i].length == 2){
			currentcode = commands[i][0].split(":");
			//if(currentcode[0] == "Start"){
				//
			//}else if(currentcode[0] == "End"){
				//
			//}else 
			
			if(currentcode[0] == "process"){
				
				eval(currentcode[1]) ;
				setTimeout( eval.bind(null, currentcode[1]), timestep*id);
			
			}else if(currentcode[0] == "input"){
				//setTimeout( function(){ eval(currentcode[1], 100*i)});
				
			}else if(currentcode[0] == "output"){
				//setTimeout( function(){ eval(currentcode[1], 100*i)});
			}
					
		}else if(commands[i][0] == "decision"){
			if( eval(commands[i][1]) ){
				id = this.runFlow(commands[i][2], id);
			}else{
				id = this.runFlow(commands[i][2], id);
			}
			
		}else if(commands[i][0] == "loop"){
			if( eval(commands[i][1]) ){
				
				
				var lastblock = this.runFlow(commands[i][2], id);
				id = lastblock[0];
				continue_id = lastblock[1];
				
				setTimeout( this.hideExecutingBlock.bind(null, continue_id), timestep*id);
				
				i--;
			}else{
				lastid = commands[i][4];
				
				setTimeout( this.hideExecutingBlock.bind(null, lastid), timestep*id);
				
				var lastblock = this.runFlow(commands[i][3], id);
				id = lastblock[0];
				continue_id = lastblock[1];
				
				//console.log(lastid+1, continue_id, ef.stackBlock[continue_id] );
				
			}
			
		}
	}
	
	//console.log(commands, i)
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
console.log(id);
	ef.stackBlock[ id ].executing = false; 
		
}

