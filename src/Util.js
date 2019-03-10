var herda = function(mae, filha){
    // Faz uma cópia do prototipo da mãe
    var copiaDaMae = Object.create(mae.prototype);
 
    // herda mãe
    filha.prototype = copiaDaMae; 
 
    //Ajusta construtor da filha    
    filha.prototype.constructor = filha;
}