TranslateCode = function(){ }


TranslateCode.prototype.getCommands = function(stackBlock){

	var textCommands = [];
	var i = 0;
	var tempStackBlock = [];
	
	for(var j=0; j< stackBlock.length; j++)
		tempStackBlock[j]  = stackBlock[j];
	
	while(tempStackBlock.length != 0){
		
		var command = tempStackBlock.shift();
		
		textCommands.push(command.getType()+":");
		textCommands[textCommands.length-1] += command.command; 
		
		
		if(command.getType() == "decision"){
				textCommandsDecision = [2];
				//yes
				textYes = [];
				//no
				textNo = [];
				
			if(command.linkyes!=null){
				
				var command2 =  command.linkyes;
				
				while( (command2 != undefined) && ( command2 != null )){
 
					textYes.push(command2.getType()+":");
					textYes[textYes.length-1] += command2.command; 
					
					//busca na pilha de blocos o código dentro do if
					for( var i = 0; i < tempStackBlock.length; i++){ 
						if ( tempStackBlock[i] ===  command2) {
						 //remove
						 tempStackBlock.splice(i, 1); 
						}
					}
					command2 =  command2.linkyes; 
				};
				
				textCommandsDecision[0] = textYes;
				
				
			}
			
			if(command.linkno!=null){
				 
				var command2 =  command.linkno;
				while( (command2 != undefined) && ( command2 != null )){
					
					textNo.push(command2.getType()+":");
					textNo[textNo.length-1] += command2.command; 
					
					for( var i = 0; i < tempStackBlock.length; i++){ 
						if ( tempStackBlock[i] ===  command2) {
						 tempStackBlock.splice(i, 1); 
						}
					}
					command2 =  command2.linkno;
				};
				
				textCommandsDecision[1] = textNo;
			}
			
			textCommands[textCommands.length-1] = textCommandsDecision;
		}
		
		
	};
	
	return textCommands;
	
}


TranslateCode.prototype.translateToCode = function(commands, language){
	var code = "";
	var currentcode;
	
	for(i = 0; i<commands.length; i++){
		
		currentcode = commands[i].split(":");
		console.log(currentcode[0]);
		if(currentcode[0] == "Start")
			code += "function start(){";
		else if(currentcode[0] == "End")
			code += "}";
		else if(currentcode[0] == "process")
			code += currentcode[1]+";";
		else if(currentcode[0] == "input"){
			code += currentcode[1]+" = prompt('');";
		}else if(currentcode[0] == "output"){
			code += "alert("+currentcode[1]+");";
		}
		
		
		code += "\n";
	}
	
	return code;
}


