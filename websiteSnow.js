//canvassnow.js
function initialize(){

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
bgReady = false;
bgImage = new Image();
bgImage.onload = function () {	bgReady = true;};
bgImage.src = "cottage.png";
//the snow
//canvas dimensions
	 W = canvas.width;
	 H = canvas.height;
	//snowflake particles
	 mp = 300; //max particles
	 particles = [];
	for(var i = 0; i < mp; i++)	{
		particles.push({
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: Math.random()*2+1, //radius
			d: Math.random()*mp //density
		})
	}
	requestanimframe(main);
}
//draw
//************************************************************************************************************************************
function draw()
	{
		if (bgReady) {
			ctx.drawImage(bgImage, 0, 0);
		}
		ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
		ctx.beginPath();
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		ctx.fill();
		
		update2();
	}
//************************************************************************************************************************************
 angle = 0;
	function update2()
	{
		angle += 0.01;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += Math.cos(angle+p.d) + 1 + p.r/2;
			p.x += Math.sin(angle) * 2;
			
			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if(p.x > W+5 || p.x < -5 || p.y > H)
			{
				if(i%10 > 0) //66.67% of the flakes
				{
					particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
				}
				else
				{
					//If the flake is exitting from the right
					if(Math.sin(angle) > 0)
					{
						//Enter from the left
						particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
					}
					else
					{
						//Enter from the right
						particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
					}
				}
			}
		}
	}
//************************************************************************************************************************************
function requestanimframe(a){
  return  window.requestAnimationFrame (a)      ||
          window.webkitRequestAnimationFrame(a) ||
          window.mozRequestAnimationFrame(a)    ||
          window.oRequestAnimationFrame (a)     ||
          window.msRequestAnimationFrame (a)    ||
          function( a ){
            window.setTimeout(a, 1000 / 60);
          };
}
//************************************************************************************************************************************
// The main game loop
function main() {

	draw();
	requestanimframe(main);


}
//************************************************************************************************************************************
