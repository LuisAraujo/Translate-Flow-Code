MsgErroManager = function(){
	allmsg = '{"no-selected-block": "You must select a block after!",';
	allmsg += '"select-block":"select other block to link!",';
	allmsg += '"no-link":"this block don\'t have links!",';
	allmsg += '"max-link":"This decision block already have the max amount of links!"';
	allmsg += '}';
	
	this.mesagens = JSON.parse(allmsg);
}

MsgErroManager.prototype.showMessage = function(msg, error){
	MSG_TEXT_ERRO.html(this.mesagens[msg]);
	if(error){
		MSG_CONTAINER_ERRO.addClass("msg-error");
	}else{
		MSG_CONTAINER_ERRO.removeClass("msg-error");
	}
	
	MSG_ERRO.show();
	window.setTimeout( function(){
		MSG_ERRO.hide();
	}, 5000);
}