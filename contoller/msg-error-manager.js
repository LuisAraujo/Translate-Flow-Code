MsgErroManager = function(){
	this.mesagens = JSON.parse('{"no-selected-block": "You must select a block after!","no-link":"this block don\'t have links!"}');
}


MsgErroManager.prototype.showMessage = function(msg, error){
	MSG_TEXT_ERRO.text = this.mesagens[msg];
	if(error){
		MSG_CONTAINER_ERRO.addClass("msg-erro");
	}else{
		MSG_CONTAINER_ERRO.removeClass("msg-erro");
	}
	
	MSG_ERRO.show();
	window.setTimeout( function(){
		MSG_ERRO.hide();
	}, 5000);
}