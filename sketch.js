var img;
var arraylist = [];
var resMax = 30;

function preload(){
	img = loadImage("img/flower.jpg");
}

function setup() {
	frameRate(10);

	var sc = 1;
	createCanvas(img.width*sc,img.height*sc);
	
	pixelDensity(1);
	scale(sc);
	image(img,0,0);
	
	var d = pixelDensity();
	var w = d*img.width*sc;
	var h = d*img.height*sc;

	loadPixels();
	background(0);

	var count = 0;
	
	var colorRange = 255;
	colorRange = 256-colorRange;

	for(var res = 1; res < resMax; res++){
		var newPixels = [];
		for (var i = 0; i<w; i++){
			for(var n =0; n<h; n++){
				newPixels[(n*w + i)*4] = round(pixels[floor((floor(n/res)*res*w + i)/res)*res*4]/colorRange)*colorRange;
				newPixels[(n*w + i)*4+1] = round(pixels[floor((floor(n/res)*res*w + i)/res)*res*4+1]/colorRange)*colorRange;
				newPixels[(n*w + i)*4+2] = round(pixels[floor((floor(n/res)*res*w + i)/res)*res*4+2]/colorRange)*colorRange;
				newPixels[(n*w + i)*4+3] = 255;
			}
		}
		append(arraylist,newPixels.slice(0));
	}

}

function draw() {
	for(var i = 0; i<pixels.length; i++){
		pixels[i] = arraylist[frameCount%(resMax-1)][i];
	}
  updatePixels();
}