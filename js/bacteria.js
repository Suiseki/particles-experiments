//black poison

var canvas = document.querySelector("#playground");
var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;
var MAX_PARTICLES = 900;
var particles = [];
var ctx = canvas.getContext("2d");
var subindex;
var distX, distY;


var create = function () {
	if (particles.length > MAX_PARTICLES) {
		particles.shift();
	}
	var p = {
		x: Math.random()*w,
		y: Math.random()*h,
		xVel: Math.random()-0.5,
		yVel: Math.random()-0.5,
		rad: Math.random()*8+5,
		col: 'red'

	}
	particles.push(p);
}

var draw = function (p) {
	ctx.beginPath();
	ctx.arc(p.x,p.y,p.rad,0, 2*Math.PI);
	ctx.fillStyle = p.col;
	ctx.fill();
}

var drawLine = function () {
	

	ctx.beginPath();
	particles.forEach(function(p, ind){
		subindex = ind<1 ? 0 : ind-1;
		console.log("su: " + subindex);
		// pierwsza cząsteczka wykrywa najbliższe sąsiedztwo
			ctx.moveTo(particles[0].x,particles[0].y);
			distX = Math.abs(particles[0].x - particles[subindex].x);
			distY = Math.abs(particles[0].y - particles[subindex].y);
			if(distX < 120 && distY < 120) {
				particles[subindex].col = 'black';
				ctx.lineTo(particles[subindex].x,particles[subindex].y);
				var r = Math.floor(Math.random() * 255);
				var g = Math.floor(Math.random() * 255);
				var b = Math.floor(Math.random() * 255);
				ctx.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
				ctx.strokeStyle = "black";
				
			}
			
		
		
	});
	ctx.stroke();
}

var move = function (p) {
	p.x +=p.xVel;
	p.y +=p.yVel;
}

var loop = function () {
	create();
	ctx.clearRect(0,0,w,h);
	particles.forEach(function(part){
		draw(part);
		move(part);
	});
	drawLine();
	window.requestAnimationFrame(loop);
}

loop();
