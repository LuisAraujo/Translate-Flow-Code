MsgErroManager = function(){
	this.mesagens = JSON.parse('{"no-selected-block": "You must select a block after!","no-link":"this block don\'t have links!"}');
}


MsgErroManager.prototype.showMessage = function(msg){
	MSG_TEXT_ERRO.text = this.mesagens[msg];
	MSG_CONTAINER_ERRO.show();
	window.setTimeout( function(){
		MSG_CONTAINER_ERRO.hide();
	}, 5000);
}