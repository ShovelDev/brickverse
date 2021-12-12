document.body.style.padding = 0
document.body.style.margin = 0
document.body.style.backgroundColor = "black"
document.body.style.overflow = "hidden"
var camera = document.createElement("canvas")
camera.width = innerWidth
camera.height = innerHeight
document.body.appendChild(camera)
camera.style.backgroundColor = "lightblue"
var ctx = camera.getContext("2d")

var keyboard = {
	w: false,
	a: false,
	s: false,
	d: false
}

var mouse = {
	down: false,
	clickX: undefined,
	clickY: undefined,
	x: undefined,
	y: undefined
}

var world = {
	color: "lightblue",
	updateColor: (color="lightblue")=>{
		camera.style.backgroundColor = color
	}
}

function raf(loop){
	requestAnimationFrame(loop)
}

class vector{
	constructor(x, y){
		this.x = x
		this.y = y
	}
}

class Player{
	constructor(x, y){
		this.x = x
		this.y = y
		this.fx = x
		this.fy = y
		this.width = 15
		this.height = 40
		this.color = "red"
		this.alpha = 1
		this.rotation = 0
		this.middleX = this.x+this.width/2
		this.middleY = this.y+this.height/2
		this.walkspeed = 2
	}

	colliding(obj2){
	  	if (this.x < obj2.x + obj2.width &&
		   this.x + this.width > obj2.x &&
		   this.y < obj2.y + obj2.height &&
		   this.y + this.height > obj2.y) {
		   	return true
		}
	}

	place(){
		this.middleX = this.x+this.width/2
		this.middleY = this.y+this.height/2
		ctx.save()
		ctx.beginPath()
		ctx.translate(this.middleX,this.middleY);
		ctx.rotate(this.rotation * Math.PI / 180);
		ctx.translate(-this.middleX, -this.middleY);
		ctx.fillStyle = this.color;
		ctx.globalAlpha = this.alpha
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.restore()

		if (keyboard.d) {
			this.x += this.walkspeed
		}
		if (keyboard.a) {
			this.x -= this.walkspeed
		}
		if (keyboard.s) {
			this.y += this.walkspeed
		}
		if (keyboard.w) {
			this.y -= this.walkspeed
		}

		if (this.y > innerHeight+20 || this.y < -20 || this.x > innerWidth+20 || this.x < -20) {
			this.x = this.fx
			this.y = this.fy
		}
	}
}

class UiText{
	constructor(text, x, y, size, color, font="Arial"){
		this.text = text
		this.x = x
		this.y = y
		this.size = size
		this.color = color
		this.font = font
	}
	show(){
		ctx.save()
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.font = this.size + "px " + this.font;
		ctx.fillText(this.text, this.x, this.y);
		ctx.restore()
	}
}

class brick{
	constructor(x, y, width, height, color="red", opacity=1, rotation=0){
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.color = color
		this.alpha = opacity
		this.rotation = rotation
		this.middleX = this.x+this.width/2
		this.middleY = this.y+this.height/2
	}

	place(){
		this.middleX = this.x+this.width/2
		this.middleY = this.y+this.height/2
		ctx.save()
		ctx.beginPath()
		ctx.translate(this.middleX,this.middleY);
		ctx.rotate(this.rotation * Math.PI / 180);
		ctx.translate(-this.middleX, -this.middleY);
		ctx.fillStyle = this.color;
		ctx.globalAlpha = this.alpha
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.restore()
	}

	colliding(obj2){
	  	if (this.x < obj2.x + obj2.width &&
		   this.x + this.width > obj2.x &&
		   this.y < obj2.y + obj2.height &&
		   this.y + this.height > obj2.y) {
		   	return true
		}
	}
}

document.addEventListener("keydown", (e)=>{
	if (e.key == "w") {
		keyboard.w = true
	}
	if (e.key == "a") {
		keyboard.a = true
	}
	if (e.key == "s") {
		keyboard.s = true
	}
	if (e.key == "d") {
		keyboard.d = true
	}
})
document.addEventListener("keyup", (e)=>{
	if (e.key == "w") {
		keyboard.w = false
	}
	if (e.key == "a") {
		keyboard.a = false
	}
	if (e.key == "s") {
		keyboard.s = false
	}
	if (e.key == "d") {
		keyboard.d = false
	}
})

document.addEventListener("click", (e)=>{
	mouse.clickX = e.clientX
	mouse.clickY = e.clientY
})

document.addEventListener("mousedown", (e)=>{
	mouse.x = e.clientX
	mouse.y = e.clientY
	mouse.down = true
})

document.addEventListener("mouseup", (e)=>{
	mouse.x = undefined
	mouse.y = undefined
	mouse.down = false
})

addEventListener('resize', (event) => {
	camera.width = innerWidth;
	camera.height = innerHeight;
})

setInterval(function(){
	ctx.clearRect(0, 0, innerWidth, innerHeight)
}, 0)
document.addEventListener('contextmenu', event => event.preventDefault());
