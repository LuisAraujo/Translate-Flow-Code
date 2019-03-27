COLOR = new Object();
COLOR.line_block = "black";


canvas = document.getElementById("canv-flow");
ctx = canvas.getContext("2d");


ef = new EngineFlow();
ef.start();

s = new StartEnd(250,10, ctx, "Start");
p = new Process(200,100, ctx, "numero = 10");
d = new Decision(200,200, ctx, "numero%2 = 0");
p2 = new Process(100,300, ctx, "numero2 = 100");
p3 = new Process(300,300, ctx, "numero2 = 10");
c = new Conection(270,400, ctx, "");

ef.addBlock(s);
ef.addBlock(p);
ef.addBlock(d);

ef.addBlock(p2);
ef.addBlock(p3);
ef.addBlock(c);

s.addLink(p);
p.addLink(d);
d.linkyes = p2;
d.linkno = p3;

p2.addLink(c);
p3.addLink(c);


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

canvas.addEventListener('dblclick', function (evt) {
	alert("test double click");
});
	