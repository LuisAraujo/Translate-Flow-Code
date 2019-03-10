COLOR = new Object();
COLOR.line_block = "black";


canvas = document.getElementById("canv-flow");
ctx = canvas.getContext("2d");


ef = new EngineFlow();
ef.start();

s = new StartEnd(120,10, ctx, "Start");
p = new Process(100,100, ctx, "numero = 10");
p2 = new Process(100,200, ctx, "numero = 10");

ef.addBlock(p);
ef.addBlock(p2);
ef.addBlock(s);

s.addLink(p);
p.addLink(p2);

console.log(p2.links);

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}


/** FUNCTIONS MOUSE **/
canvas.addEventListener('mousedown', function (evt) {
		
		
	var mousePos = getMousePos(canvas, evt);
	var posx =  mousePos.x ;
	var posy =  mousePos.y ;
	
	if((ef.selectedBlock  != null) && (ef.selectedBlock  != undefined) && (ef.selectedBlock.selected) ){
   
		ef.selectedBlock.moving = false;
		ef.selectedBlock.selected = false;
		ef.selectedBlock  = null;
	  
	}
		
	arrayBlocks = ef.stackBlock;
	

	for(var i=0; i< arrayBlocks.length; i++){
		 
		if( arrayBlocks[i].click(posx, posy)){
			
			ef.selectedBlock = arrayBlocks[i];
			ef.selectedBlock.selected = true;
			if(ef.ctrl)
				ef.selectedBlock.moving = true;
	
			ef.marginX = mousePos.x - ef.selectedBlock.x
			
			ef.setDataInMenu();
			
			
			break;
		}
	}
	
});

canvas.addEventListener("mousemove", function(evt){
	
	var mousePos = getMousePos(canvas, evt);
	
	if( ((ef.selectedBlock!=undefined) || (ef.selectedBlock != null) ) && (ef.selectedBlock.moving) && (ef.ctrl)  ){
		ef.selectedBlock.x  = mousePos.x - ef.marginX;
		ef.selectedBlock.y = mousePos.y;
	}
	
});
	