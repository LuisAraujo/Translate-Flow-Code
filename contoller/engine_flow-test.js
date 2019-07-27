/*Class of Test EngineFlow*/
EngineFlowTest = function(){	
}

EngineFlowTest .prototype.caseTestLoop = function(){
		var s = new StartEnd(canvas.width/2,10, ctx, "Start");
	ef.addBlock(s);
	s.y = 20
	s.x = 500
	var p = new Process(0, 0 , ctx, "a = 0");
	p.y = 100;
	p.x = 500;

	s.addLink(p);
	ef.addBlock(p);
			
	var d = new Decision(0,0, ctx, "a < 2" );
	d.y = 200;
	d.x = 500;
	d.havelinktome=2;
	d.type = "loop"
			
	p.addLink(d);
	ef.addBlock(d);


	var p2 = new Process(0, 0 , ctx, "a++");
	p2.y = 250;
	p2.x = 400;

	d.addLink(p2);
	ef.addBlock(p2);

	
	var p3 = new Process(0, 0 , ctx, "b = 10");
	p3.y = 340;
	p3.x = 400;

	ef.addBlock(p3);
	p2.addLink(p3);
	p3.addLink(d);
	

	var e = new StartEnd(canvas.width/2,10, ctx, "End");
	e.y = 250
	e.x = 650

	d.addLink(e);
	ef.addBlock(e);
}