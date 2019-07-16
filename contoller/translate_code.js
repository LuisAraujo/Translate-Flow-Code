TranslateCode = function(){ }


TranslateCode.prototype.getCommands = function(currentBlock, textCommands, checkedCommands, inloop, level){
	
    //console.log(StartBlock, checkedCommands);
	if(currentBlock == undefined) 
		return textCommands;

	console.log(currentBlock.command)
	if(textCommands == undefined)
		textCommands = [];
	
	if(checkedCommands == undefined)
		checkedCommands = [];
	
	console.log("COMANDO CHECADOS", checkedCommands, currentBlock)
	for(var i= 0; i < checkedCommands.length; i++){	
		if(checkedCommands[i] == currentBlock){
			console.log("BREAKING", currentBlock);
			return "";
		}
	}
		

	checkedCommands[checkedCommands.length] = currentBlock;
	
	
	if((currentBlock.getType() != "decision") && (currentBlock.getType() != "loop")){
		//guarda o tipo do comando 
		if( (inloop != 0) && (inloop != undefined) )
			//guarda o tipo do comando 
			textCommands[textCommands.length-1][inloop].push(currentBlock.getType()+":"+currentBlock.command);
		else
			textCommands.push(currentBlock.getType()+":"+currentBlock.command);
		
		return this.getCommands(currentBlock.links[0], textCommands, checkedCommands, inloop);
	
	}else {
		console.log("LOOPS")
		var textCommandsDecision = [4];
		textCommandsDecision[0] = currentBlock.getType();
		textCommandsDecision[1] = currentBlock.command;
		textCommandsDecision[2] = [];
		textCommandsDecision[3] = [];
		//cria duas ramificações para o yes e o no
		textYes = [];
		textNo = [];
			
		//se exitir comando no yes	
		if(currentBlock.linkyes!=null){
			textCommands.push(textCommandsDecision);
			this.getCommands(currentBlock.linkyes, textCommands, checkedCommands, 2);
		}
		
		if(currentBlock.linkno!=null){
			    this.getCommands(currentBlock.linkno, textCommands, checkedCommands, 3);
		}

	
		return this.getCommands(undefined, textCommands, checkedCommands);
	}
		

	return textCommands;
	
}



TranslateCode.prototype.getCommandsOLD = function(stackBlock){

	var textCommands = [];
	var i = 0;
	var tempStackBlock = [];
	//copia os comandos para um pilha temporária, afim de não afetar a pilha original
	for(var j=0; j< stackBlock.length; j++)
		tempStackBlock[j]  = stackBlock[j];
	
	//enquanto existir comandos na pilha
	while(tempStackBlock.length != 0){
		//pega um comando
		var command = tempStackBlock.shift();
		//guarda o tipo do comando 
		textCommands.push(command.getType()+":");
		//adiciona o comando propriamente
		textCommands[textCommands.length-1] += command.command; 
		
		//em caso de ser uma decisão
		if((command.getType() == "decision") || (command.getType() == "loop")){
			
				textCommandsDecision = [4];
				textCommandsDecision[0] = command.getType();
				textCommandsDecision[1] = command.command;
				//cria duas ramificações para o yes e o no
				textYes = [];
				textNo = [];
				
			//se exitir comando no yes	
			if(command.linkyes!=null){
				
				var command2 =  command.linkyes;
				
				//percorre todos os subcomandos
				while( (command2 != undefined) && ( command2 != null )){
 
					textYes.push(command2.getType()+":");
					textYes[textYes.length-1] += command2.command; 
					
					//busca na pilha de blocos o código dentro do if
					for( var i = 0; i < tempStackBlock.length; i++){ 
						if ( tempStackBlock[i] ===  command2) {
						 //remove pois já foi visitado
						 tempStackBlock.splice(i, 1); 
						}
					}
					console.log(command2);
					//caso tenha outra subdecisão
					if ((command2.links != undefined) && (command2.links.length > 0 ))
						command2 =  command2.links[0];
					else
						command2 = null;
					
				};
				
				//coloca o comando no vetor
				textCommandsDecision[2] = textYes;
				
				
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
				
				textCommandsDecision[3] = textNo;
			}
			
			textCommands[textCommands.length-1] = textCommandsDecision;
		}
			
	};
	
	return textCommands;
	
}

/*Traduz o comando gerado pelo getCommands  em código javascript*/
TranslateCode.prototype.translateToCode = function(commands, language, tab){
	//console.log(commands);
	var code = "";
	var currentcode;
	
	for(var i = 0; i<commands.length; i++){
		
		if(typeof commands[i] == "string"){
			currentcode = commands[i].split(":");
			
			if(currentcode[0] == "Start"){
				code += tab+"function start(){";
				tab+=" ";
			
			}else if(currentcode[0] == "End")
				code += tab+"\n}";
			
			else if(currentcode[0] == "process")
				code += tab+currentcode[1]+";";
			
			else if(currentcode[0] == "input"){
				code += tab+currentcode[1] + " = prompt('');";
				//fazer conversão para numeros
				code += tab+"if(!isNaN("+currentcode[1]+")){";
				code +=  tab+"if(" + currentcode[1] + ".indexOf(\".\") !== -1){";
				code += tab+currentcode[1]+" =  parseFloat( " + currentcode[1] + " );}";
				code += tab+ "else{\n"
				code += tab+currentcode[1]+" =  parseInt ( " + currentcode[1] + ");}}";
				//boolean 
				
			}else if(currentcode[0] == "output"){
				code += tab+"alert("+currentcode[1]+");";
			}
				
			code += "\n";
			
		}else if(commands[i][0] == "decision"){
			
			if ((commands[i][2]!= undefined) && (commands[i][2].length > 0)){
				code += tab+"if(" + commands[i][1] +"){ \n";
				code += tab+this.translateToCode (commands[i][2], "", tab+" ");
				code += tab+"}";
			}
			
			if((commands[i][3]!= undefined) && (commands[i][3].length > 0)){
				code += tab+"else{\n";
				code += tab+this.translateToCode (commands[i][3], "", tab+" ");
				code += tab+"}"
			}
			
		}else if (commands[i][0] == "loop"){
			
			if ((commands[i][2]!= undefined) && (commands[i][2].length > 0)){
				code += tab+"while(" + commands[i][1] +"){ \n";
				code += tab+this.translateToCode (commands[i][2], "", tab+" ");
				code += tab+"}";
			}
			
			if((commands[i][3]!= undefined) && (commands[i][3].length > 0)){
				code += tab+"\n";
				code += tab+this.translateToCode (commands[i][3], "", tab+" ");

			}
			
		}
	}
	
	return code;
}


