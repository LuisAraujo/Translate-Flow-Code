EngineFlow = function(){	
	
	this.selectedBlock;	
	this.marginX;
	this.ctrl = false;
	
	_this = this;
	window.onkeyup = function(e){
		if(e.key == "Control")
			_this.ctrl = false;
	}
	
	
	window.onkeydown = function(e){
		if(e.key == "Control")
			_this.ctrl = true;
	}
	
	$("#bt-updateblock").click(function(){
		
		var command = $("#command-block").val();
		if(_this.selectedBlock)
			_this.selectedBlock.updateCommand(command);
		
	});
	
	$("#bt-addlink").click(function(){
		if(_this.selectedBlock == null){
			alert("Choise a block!");
			return;
		}
		var p = new Process(100,200, ctx, "/*your command here*/");
		_this.selectedBlock.addLink(p);
		_this.addBlock(p);
	});
}

EngineFlow.prototype.stackBlock = [];

EngineFlow.prototype.start = function(){
	_this = this;
	window.requestAnimationFrame( function(){ _this.loop(_this)} );
}

EngineFlow.prototype.addBlock = function(block){
	block.name = "Block n"+this.stackBlock.length;
	this.stackBlock.push(block)
}

EngineFlow.prototype.loop = function(_this){	
	ctx.clearRect(0,0,500,500);

	_this.stackBlock.forEach( function(block){
		block.print();
	});
	
	window.requestAnimationFrame( function(){ _this.loop(_this)} );
	
}

EngineFlow.prototype.setDataInMenu = function(){
	
	$("#name-block").html(this.selectedBlock.name);
	$("#command-block").val(this.selectedBlock.text);
	
	$("#linkto-block").html("<option>No Block</option>");
	this.stackBlock.forEach( function(block, i){
		$("#linkto-block").append("<option val='"+i+"'>"+block.name+"</option>");
	});
	
}