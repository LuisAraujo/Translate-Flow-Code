const COLOR = new Object();
COLOR.line_block = "black";
//main menu
const BT_NEW = $("#bt-new");
const BT_OPEN = $("#bt-open");
const BT_EXPORT = $("#bt-export");
const BT_RUN = $("#bt-run");
const BT_CODE = $("#bt-code");

const BT_NEW_BLOCK = $("#bt-new-block");
const BT_NEW_CLINK = $("#bt-connect-link");

//const BT_NEW_CBLOCK = $("#bt-connect-block");
const BT_DEL_LINK = $("#bt-delete-link");
const BT_DEL_BLOCK = $("#bt-delete-block");
const BT_GERATE_CODE = $("#bt-geratecode");
const BT_UPDATE_BLOCK = $("#bt-updateblock");
const SUB_MENU_BTICONS = $("#submenu-icons");
const BT_ZOOM_IN = $("#bt-zoom-in");
const BT_ZOOM_OUT = $("#bt-zoom-out");

/*BUTTONS FOR CREATE BLOCKS*/
const BT_NEW_BLOCK_PROCESS = $("#bt-new-process");
const BT_NEW_BLOCK_DECISION = $("#bt-new-decision");
const BT_NEW_BLOCK_INPUT = $("#bt-new-input");
const BT_NEW_BLOCK_OUTPUT = $("#bt-new-output");
const BT_NEW_BLOCK_CONNECT= $("#bt-new-conection");
const BT_NEW_BLOCK_START = $("#bt-new-start");
const BT_NEW_BLOCK_END = $("#bt-new-end");

const BT_EXPORT_FILE = $('#btn-download');
const MODAL_EXPORT_FILE = $("#modal-export-file");

const canvas = document.getElementById("canv-flow");
const ctx = canvas.getContext("2d");
const canvas_img = document.getElementById("canv-mirror");

const MSG_ERRO = $("#msg-for-user");
const MSG_TEXT_ERRO = $("#text-msg-for-user");
const MSG_TIP_ERRO = $("#tip-msg-for-user");
const MSG_CONTAINER_ERRO = $("#container-text-msg-for-user");



ef = new EngineFlow();
ef.start();

 
 
window.onkeydown = function(e){
	
	if(e.key == "Control")
		ef.downCtrl();
	
	else if ( (ef.selectedBlock != null) && (ef.selectedBlock.double_selected != false)){
		
		//backspace, space, =, + , -, *, / , %
		if ( (event.keyCode == 8) || (event.keyCode == 32) || (event.key == "=") ||
			 (event.key == "+") || (event.key == "-") || (event.key == "*") || 	
			 (event.key == "/") || (event.key == "%") ||  	(event.key == "(") ||
			 (event.key == ")") || (event.key == "[") || (event.key == "]") ||
			 (event.key == "&") || (event.key == "|") || (event.key == "\"") ||
			 (event.key == "<") || (event.key == ">") ||
		     //letras e numeros
		    (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90) )
		    {
				if(ef.selectedBlock.getCommandChanged() == false)
				{
					ef.selectedBlock.updateCommand(e.key);
					ef.selectedBlock.setCommandChanged(true);
				
				}else
				{
					//space
					if(event.keyCode == 32)
						ef.selectedBlock.updateCommand(ef.selectedBlock.getCommand() + " ");
					//backspace
					else if(event.keyCode == 8)
						ef.selectedBlock.updateCommand( ef.selectedBlock.getCommand().slice(0, ef.selectedBlock.getCommand().length-1) );
					else
						ef.selectedBlock.updateCommand(ef.selectedBlock.getCommand() + e.key);
				}
		}
	}
}

window.onkeyup = function(e){
	if(e.key == "Control")
		ef.upCtrl();
}

window.onresize = function(){
	ef.resizeCanvas();
	
};



BT_CODE.click(function(){
	ef.translateCode();
});
BT_RUN.click(function(){
	ef.runCode();
});



BT_EXPORT.click(function(){
	
	var dataURL = canvas.toDataURL('image/png');
    BT_EXPORT_FILE.attr("href", dataURL);
	MODAL_EXPORT_FILE.show();
	//ef.exportPng();
});

BT_EXPORT_FILE.click(function(){
	var name = $("#inp-name-export-file").val();
	if(name == "")
		name = "myflow";
	var extession = $("#format-file-export").children("option:selected").val();
	BT_EXPORT_FILE.attr("download", name+"."+extession);
	MODAL_EXPORT_FILE.hide();
});

BT_ZOOM_IN.click(function(){
	ef.zoomCanvas(1.1);
});

BT_ZOOM_OUT.click(function(){
	ef.zoomCanvas(0.9);
});


BT_UPDATE_BLOCK.click(function(){
	var command = $("#command-block").val();
	if(ef.selectedBlock)
		ef.selectedBlock.updateCommand(command);
});

BT_GERATE_CODE.click(function(){
	ef.getCommands();	
});

BT_NEW_BLOCK.click(function(){
	SUB_MENU_BTICONS.show();
});



BT_DEL_BLOCK.click(function(){
	
	if(ef.selectedBlock == null){
		ef.msgerrosmanager.showMessage("no-selected-block", true);
		return;
	}
	ef.removeBlock(ef.selectedBlock);  
});


BT_DEL_LINK.click(function(){
	if(ef.selectedBlock == null){
		ef.msgerrosmanager.showMessage("no-selected-block", true);
		return;
	}
	if(ef.selectedBlock.type != "decision")
		ef.selectedBlock.clearLinks();	
	else{
		ef.selectedBlock.linkyes = null;			
		ef.selectedBlock.linkno = null;			
	}		
});
 
 
 BT_NEW_CLINK.click(function(){
	  if(ef.selectedBlock == null){
		ef.msgerrosmanager.showMessage("no-selected-block", true);
		return;
	}
	ef.msgerrosmanager.showMessage("select-block", false);
	ef.linkingblocks = true;
 });
 
 
 
 /*Buttons for New Blocks*/
 BT_NEW_BLOCK_PROCESS.click(function(){
		SUB_MENU_BTICONS.hide();
	   if(ef.selectedBlock == null){
			ef.msgerrosmanager.showMessage("no-selected-block", true);
			//alert("Choise a block!");
			return;
		}
		
		var p = new Process(0, 0 , ctx, "/ * your command here* /");
		p.y = ef.selectedBlock.y + ef.selectedBlock.h + 20;
		p.x = ef.selectedBlock.x + ef.selectedBlock.w/2 - p.w/2;
		
		ef.selectedBlock.addLink(p);
		ef.addBlock(p);
 });
 
 BT_NEW_BLOCK_DECISION.click(function(){
	 SUB_MENU_BTICONS.hide();
	 if(ef.selectedBlock == null){
			ef.msgerrosmanager.showMessage("no-selected-block", true);
			return;
		}
		var p = new Decision(0,0, ctx, "/* code */");
		p.y = ef.selectedBlock.y + ef.selectedBlock.h + 20;
		p.x = ef.selectedBlock.x + ef.selectedBlock.w/2 - p.w/2 ;
		p.havelinktome++;
		
		ef.selectedBlock.addLink(p);
		ef.addBlock(p);
 });
 
 BT_NEW_BLOCK_INPUT.click(function(){
	 SUB_MENU_BTICONS.hide();
	 if(ef.selectedBlock == null){
			ef.msgerrosmanager.showMessage("no-selected-block", true);
			return;
		}
		var p = new InOutput(100,200, ctx, "input");
		
		ef.selectedBlock.addLink(p);
		ef.addBlock(p);
 });
 
 BT_NEW_BLOCK_OUTPUT.click(function(){
	 SUB_MENU_BTICONS.hide();
	 if(ef.selectedBlock == null){
			ef.msgerrosmanager.showMessage("no-selected-block", true);
			return;
		}
		var p = new InOutput(100,200, ctx, "output");
		ef.selectedBlock.addLink(p);
		ef.addBlock(p);
});
				
BT_NEW_BLOCK_CONNECT.click(function(){
	 SUB_MENU_BTICONS.hide();
	 if(ef.selectedBlock == null){
			ef.msgerrosmanager.showMessage("no-selected-block", true);
			return;
		}
		p = new Conection(0,0, ctx, "");
		p.y = ef.selectedBlock.y + ef.selectedBlock.h + 20;
		p.x = ef.selectedBlock.x + ef.selectedBlock.w/2 - p.w/2 ;
		
		ef.selectedBlock.addLink(p);
		ef.addBlock(p);
 });
 
 BT_NEW_BLOCK_START.click(function(){
	 SUB_MENU_BTICONS.hide();
		var p = new StartEnd(canvas.width/2,10, ctx, "Start");
		ef.addBlock(p);
 });
 
 BT_NEW_BLOCK_END.click(function(){
	 SUB_MENU_BTICONS.hide();
	 if(ef.selectedBlock == null){
			ef.msgerrosmanager.showMessage("no-selected-block", true);
			//alert("Choise a block!");
			return;
		}
		var p = new  StartEnd(canvas.width/2,canvas.height- 100, ctx, "End")
		ef.selectedBlock.addLink(p);
		ef.addBlock(p);
 });
	
	
	
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}


/** FUNCTIONS MOUSE **/
canvas.addEventListener('mousedown', function (evt) {
		
	var old_selectedBlock = null;
	var mousePos = getMousePos(canvas, evt);
	var posx =  mousePos.x ;
	var posy =  mousePos.y ;
	
	//hiding submenu buttons
	if(SUB_MENU_BTICONS.css("display") == "block")
		SUB_MENU_BTICONS.hide();
	
	//if have a old selected block in memory
	if((ef.selectedBlock  != null) && (ef.selectedBlock  != undefined) && (ef.selectedBlock.selected) ){
		ef.selectedBlock.setInitialState();
		
		if(ef.linkingblocks)
			old_selectedBlock = ef.selectedBlock;
		
		ef.selectedBlock  = null;
	}
		
	arrayBlocks = ef.stackBlock;

	for(var i=0; i< arrayBlocks.length; i++){
		 
		if( arrayBlocks[i].click(posx, posy)){
			
			if( (ef.linkingblocks) && (old_selectedBlock != null)) {
			
				ef.selectedBlock = arrayBlocks[i];
				if(ef.selectedBlock.type == "decision"){
					if(ef.selectedBlock.havelinktome == 1){
						ef.selectedBlock.type = "loop";
						ef.selectedBlock.havelinktome = 2;
						old_selectedBlock.addLink(ef.selectedBlock);
					
					}else if(ef.selectedBlock.havelinktome == 0){
						
						ef.selectedBlock.havelinktome = 1;
						old_selectedBlock.addLink(ef.selectedBlock);
					
					}else {
						ef.msgerrosmanager.showMessage("max-link");
					}
				}else{
					old_selectedBlock.addLink(ef.selectedBlock);	
				}
				
				ef.linkingblocks = false;
				
			}else{
		
				ef.selectedBlock = arrayBlocks[i];
				ef.selectedBlock.selected = true;
				
				if(ef.ctrl)
					ef.selectedBlock.moving = true;
		
				ef.marginX = mousePos.x - ef.selectedBlock.x
				
				ef.setDataInMenu();
			}
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
	if(ef.selectedBlock){
		ef.selectedBlock.double_selected = true;
	}
});


//ADD EVENTS

