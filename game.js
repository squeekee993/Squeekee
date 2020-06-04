var c = document.getElementById("myCanvas")
var ctx = c.getContext("2d")
//image
var images
createImage("background","Squeekee-Duel-Menu-Background.png")
function createImage(imageName,incompleteScr){
	//images.push()
	images[imageName] = new Image()
	images[imageName].scr = "https://i.ibb.co/G3GWSqp/" + incompleteScr
}
function requirements(){
	scrollTo(10, 10);
	ctx.canvas.width  = window.innerWidth
	ctx.canvas.height = window.innerHeight
	pixelWidth = window.innerWidth/1366
	pixelHeight = window.innerHeight/768
}
drawImage(images[0],0,0,ctx.canvas.width,ctx.canvas.height)
