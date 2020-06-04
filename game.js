var c = document.getElementById("myCanvas")
var ctx = c.getContext("2d")
//image
var images
createImage("Squeekee-Duel-Menu-Background.png")
function createImage(incompleteScr){
	images.push(new Image())
	images[images.length].scr = "https://i.ibb.co/G3GWSqp/" + incompleteScr
}
function requirements(){
	scrollTo(10, 10);
	ctx.canvas.width  = window.innerWidth
	ctx.canvas.height = window.innerHeight
	pixelWidth = window.innerWidth/1366
	pixelHeight = window.innerHeight/768
}
