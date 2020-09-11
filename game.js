    var i = 0
    var ii = 0
    var c = document.getElementById("myCanvas")
    var ctx = c.getContext("2d")
	var background = new Image()
    background.src = "https://i.ibb.co/G3GWSqp/Squeekee-Duel-Menu-Background.png"
    var fireSqueekee = new Image()
    fireSqueekee.src = "https://i.ibb.co/4Sh46Sh/Final-Fire-Squeekee.png"
    var waterSqueekee = new Image()
    waterSqueekee.src = "https://i.ibb.co/hVRmYX9/Water-Squeekee.png"
    var plantSqueekee = new Image()
    plantSqueekee.src = "https://i.ibb.co/t4bfMRN/Plant-Squeekee.png"
    var tile = new Image()
    tile.src = "https://i.ibb.co/dWRQVXH/Scroll-Background.png"
    var electricSqueekee = new Image()
    electricSqueekee.src = "https://i.ibb.co/K0Hjd30/Electric-Squeekee.png"
    var pixelWidth = window.innerWidth/1366
    var pixelHeight = window.innerHeight/768
    var entities = [
    ]
    var upArrowPressed = 0
    var rightArrowPressed = 0
    var leftArrowPressed = 0
    var downArrowPressed = 0
    var sKeyPressed = 0
    var wKeyPressed = 0
    var aKeyPressed = 0
    var dKeyPressed = 0
    var shiftKeyPressed = 0
    var twoKeyPressed = 0
    var escapeKeyPressed = 0
    var player1X = 300
    var player1Y = 0
    var player1Mana = 0
    var player1MaxMana = 100
    var player1HP = 100
    var player1StartingHP = 100
    var player1Width = 40
    var player1Height = 40
    var character1 = 0
    var player2X = 0
    var player2Y = 0
    var player2Mana = 0
    var player2MaxMana = 100
    var player2HP = 100
    var player2StartingHP = 100
    var player2Width = 40
    var player2Height = 40
    var character2 = 0
    var HPMultiplier = 1
    var rangeMultiplier = 0.4
    var menuItemSelected = 0
    var computerMode = "Charging"
    var computerAccuracy = 8
    var bulletLife = 500
    var wall = true
    var canShootDiagonally = false
    var menuAction = setInterval(menu, 1)
    var singlePlayerAction = 0
    var twoPlayerAction = 0
    var pauseAction = 0
    var optionsAction = 0
    var congratulationsAction = 0 
    var selectCharacterAction = 0
    var goBackTo = 0
    var resumeTo = 0
    var characters = [
    {color:"#FF0000",image:fireSqueekee, health:150,speed:2,bulletWidth:10,bulletHeight:10,bulletDamage:1,bulletPierce:1, bulletSpeed: 1.75, bulletCost:1, maxMana:175,manaRegen:1, name:"Fire Squeekee", difficulty:10,description:"Average Character"},
    {color:"#DDDD00",image:electricSqueekee, health:10,speed:3,bulletWidth:5,bulletHeight:5,bulletDamage:2,bulletPierce:1, bulletSpeed: 3, bulletCost:1, maxMana:100,manaRegen:1,name:"Electric Squeekee", difficulty:50,description:"Deals High Damage, has High Speed"},
    {color:"#009900",image:plantSqueekee, health:200,speed:2,bulletWidth:20,bulletHeight:20,bulletDamage:3,bulletPierce:1, bulletSpeed:.5, bulletCost:1, maxMana:100,manaRegen:1,name:"Plant Squeekee", difficulty:0.4,description:"Deals High Damage and Has Low Bullet Speed"},
    {color:"#0000FF",image:waterSqueekee, health:150,speed:1,bulletWidth:15,bulletHeight:15,bulletDamage:1,bulletPierce:1, bulletSpeed: 2, bulletCost:0, maxMana:1,manaRegen:1,name:"Water Squeekee", difficulty:0.1,description:"Average Character with Infinite Mana Limit"},
    ]
    if(getCookie("Points")==""||getCookie("Points")=="NaN"){
    	document.cookie = "Points=0;"
    }
    function shout(message){
    	ctx.fillStyle = "#000000"	
        ctx.font = "30px Arial"
        ctx.fillText(message,0,30)
    }
    function backgrounds(image,playerX,playerY,width,height,side){
    	var placementX = (-298)*4
        var placementY = (-298)*3
        var moddedX = playerX%width
        var moddedY = playerY%height
        i = 6
        while(i>0){
        	placementY += 298
        	placementX = -598
        	ii = 5
        	while(ii>0){
            	imageProcess(image,moddedX+placementX,moddedY+placementY,width,height,side)
                placementX += 298
                ii--
        	}
            i--
        }
    }
    function backgroundScroll(){
        backgrounds(tile,player1X*-1,player1Y*-1,300,300,"left")
        backgrounds(tile,player2X*-1,player2Y*-1,300,300,"right")
    }
    function getCookie(name) {
  		var cookies = document.cookie.split(';')
  		for(var i = 0; i < cookies.length; i++) {
    		var currentcookie = cookies[i];
    		if(name = currentcookie.split('=')[0]){
            	return currentcookie.split('=')[1];
            }
 		}
  	 	return "";
	}
    function drawCharacters(){
    	imageProcess(characters[character1].image,0,0,player2Height,player2Width,"left")
        imageProcess(characters[character2].image,player2X-player1X,player2Y-player1Y,player2Height,player2Width,"left")
        imageProcess(characters[character2].image,0,0,player2Height,player2Width,"right")
        imageProcess(characters[character1].image,player1X-player2X,player1Y-player2Y,player1Height,player1Width,"right")
    }
    function imageProcess(image,x,y,w,h,side){
    	if(side=="right"){
    		imageSlicer(image,x+((1366)/4)*3-w/2,y+(768/2)-h/2,w,h,1366/2,"right")
    	}else if(side=="left"){
        	imageSlicer(image,x+((1366)/4)-w/2,y+(768/2)-h/2,w,h,1366/2,"left")
        }
    }
    function imageSlicer(image,x,y, width, height,slicerX,side){
    	if(side=="left"){
    		if((x+width)>slicerX){
        		displayImage(image,x,y,width,height, (width*-1)+(slicerX-x))
        	}else{
      			displayImage(image,x,y,width,height,0)
        	}
        }else{
        	if(x<slicerX){
        		displayImage(image,x,y,width,height, slicerX-x)
        	}else{
      			displayImage(image,x,y,width,height,0)
        	}
        }
    }
    function displayImage(image,x,y, width, height,slicer){
        ctx.drawImage(image, slicer*(image.width / width), 0, image.width, image.height,(x+slicer)*pixelWidth,y*pixelHeight,width*pixelWidth,height*pixelHeight)
	}
    function selectCharacter(){
    	requirements()
    	ctx.textAlign = "center"
        character1 = (character1+characters.length)%characters.length
        character2 = (character2+characters.length)%characters.length
        ctx.fillStyle = "#000000"
        ctx.font = "30px Arial"
        if(resumeTo == "singlePlayer"){
        	ctx.fillText("If you win you will get "+Math.round(characters[character1].difficulty/characters[character2].difficulty+1)+" points",ctx.canvas.width/2,30)
        	ctx.fillText("If you lose you will lose "+Math.round(characters[character2].difficulty/characters[character1].difficulty+characters[character1].difficulty/characters[character2].difficulty/2)+" points",ctx.canvas.width/2,60)
        }
        ctx.font = "15px Arial"
        if(gameTo == "twoPlayer"){
        	ctx.fillText("W and S to select your character press 2 to confirm",(1366/4)*pixelWidth,600*pixelHeight)
            ctx.fillText("Up and Down Arrow to select your character press shift to confirm",(((1366/4)*3))*pixelWidth,600*pixelHeight)
        }else{
        	ctx.fillText("W and S to select your character press 2 and shift to confirm",(1366/4)*pixelWidth,600*pixelHeight)
        	ctx.fillText("Up and Down Arrow to select the computers character press 2 and shift to confirm",(((1366/4)*3))*pixelWidth,600*pixelHeight)
        }
        ctx.fillRect(ctx.canvas.width/2-1,0, 2,ctx.canvas.height)
        ctx.drawImage(characters[character1].image, 0, 0, characters[character1].image.width, characters[character1].image.height,(((1366/4)*1)-75)*pixelWidth,(768/2-125)*pixelHeight,150*pixelWidth,150*pixelHeight)
        ctx.font = "20px Arial"
        ctx.fillText(characters[character1].name,(1366/4)*pixelWidth,200*pixelHeight)
        ctx.fillText(characters[character1].description,(1366/4)*pixelWidth,500*pixelHeight)
        ctx.drawImage(characters[character2].image, 0, 0, characters[character2].image.width, characters[character2].image.height,(((1366/4)*3)-75)*pixelWidth,(768/2-125)*pixelHeight,150*pixelWidth,150*pixelHeight)
        ctx.fillText(characters[character2].name,(((1366/4)*3))*pixelWidth,200*pixelHeight)
        ctx.fillText(characters[character2].description,(((1366/4)*3))*pixelWidth,500*pixelHeight)
        if(wKeyPressed||sKeyPressed){
        	character1 += sKeyPressed - wKeyPressed
            sKeyPressed = false
            wKeyPressed = false
        }
        if(upArrowPressed||downArrowPressed){
        	character2 += downArrowPressed - upArrowPressed
            upArrowPressed = false
            downArrowPressed = false
        }
        if(twoKeyPressed&&shiftKeyPressed){
        	clearInterval(selectCharacterAction)
    		player1StartingHP = characters[character1].health*HPMultiplier
    		player2StartingHP = characters[character2].health*HPMultiplier
            clearInterval(menuAction)
            player1X = 0
    		player1Y = 0
    		player1Mana = (characters[character1].name == "Water Squeekee")
    		player1HP = player1StartingHP
   			player2X = 300
    		player2Y = 0
    		player2Mana = (characters[character2].name == "Water Squeekee")
    		player2HP = player2StartingHP
            if(wall){
            	entities = [["wall",150,0,10,100,0,0,10,10,10,"#000000"]]
            }else{
            	entities = []
            }
            if(gameTo == "twoPlayer"){
        	   twoPlayerAction = setInterval(twoPlayer, 1)
            }else{
               singlePlayerAction = setInterval(singlePlayer, 1)
            }
        }
    }
    function requirements(){
    	scrollTo(10, 10);
  	    ctx.canvas.width  = window.innerWidth
        ctx.canvas.height = window.innerHeight
        pixelWidth = window.innerWidth/1366
        pixelHeight = window.innerHeight/768
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height)
    }
    function scrollDrawRectangle(player,x,y,width,height){
		if(player=="player1"){
			if(((width/2)+x)>(1366/2)){
				if(x-(width/2)<(1366/2)){
					ctx.fillRect((x-(width/2))*pixelWidth,(y-(height/2))*pixelHeight,(((1366/2)-1)-(x-(width/2)))*pixelWidth,height*pixelHeight)
				}else{
					//this rectangle is off screen
				}
			}else{
				ctx.fillRect((x-(width/2))*pixelWidth,(y-(height/2))*pixelHeight,width*pixelWidth,height*pixelHeight)
			}
		}else if(player=="player2"){
			if((x-(width/2))<(1366/2)){
				if(x+(width/2)>(1366/2)){
					ctx.fillRect((x+(width/2))*pixelWidth,(y-(height/2))*pixelHeight,((x+(width/2))-((1366/2)+1))*pixelWidth*(-1),height*pixelHeight)
				}else{
					//this rectangle is off screen
				}
			}else{
				ctx.fillRect((x-(width/2))*pixelWidth,(y-(height/2))*pixelHeight,width*pixelWidth,height*pixelHeight)
			}
		}else{
			alert("remember to state which player to display it to for function drawRectangle")
		}
	}
	function drawRectangle(player,x,y,width,height){
		if(player=="player1"){
			scrollDrawRectangle(player,(x+(1366/4))-player1X,(y-player1Y)+(768/2),width,height)
		}else{
			scrollDrawRectangle(player,(x+((1366/4)*3))-player2X,(y-player2Y)+(768/2),width,height)
		}
	}
    function renderEntities(){
        i = -1
        while(++i < entities.length){
        	bulletDestroyed = false
            //does caluculations
            entities[i][1] += entities[i][5]
            entities[i][2] += entities[i][6]
            //hitboxes
            //if it hit the player
            ctx.fillStyle = "#000000"
            if (entities[i][0] == "player1Bullet"){
            	entities[i][9]--
                if((Math.abs(player2X-entities[i][1]) < (player2Width + entities[i][3])/2)&&(Math.abs(player2Y - entities[i][2]) < (player2Height + entities[i][4])/2)){
                    player2HP -= entities[i][7] 
                    entities[i][8]--
                }
                ii = -1
                while(++ii < entities.length){
                	if(entities[ii][0] != "player1Bullet"){
                		if((Math.abs(entities[i][1]-entities[ii][1]) < (entities[i][3] + entities[ii][3])/2)&&(Math.abs(entities[i][2] - entities[ii][2]) < (entities[i][4] + entities[ii][4])/2)){
                        	entities[i][8]--
                        }
                    }
                }
            }
            if (entities[i][0] == "player2Bullet"){
            	entities[i][9]--
                if((Math.abs(player1X-entities[i][1]) < (player1Width + entities[i][3])/2)&&(Math.abs(player1Y - entities[i][2]) < (player1Height + entities[i][4])/2)){
                    player1HP -= entities[i][7] 
                    entities[i][8]--
                }
                ii = -1
                while(++ii < entities.length){
                	if(entities[ii][0] != "player2Bullet"){
                		if((Math.abs(entities[i][1]-entities[ii][1]) < (entities[i][3] + entities[ii][3])/2)&&(Math.abs(entities[i][2] - entities[ii][2]) < (entities[i][4] + entities[ii][4])/2)){
                        	entities[i][8]--
                        }
                    }
                }
            }
            if(entities[i][8] > 1){
            	if((Math.abs(player1X-entities[i][1]) < (player1Width + entities[i][3])/2)&&(Math.abs(player1Y - entities[i][2]) < (player1Height + entities[i][4])/2)){
                	if((Math.abs(player1X - entities[i][1]) - (entities[i][3]/2) - (player1Width/2)) < (Math.abs(player1Y - entities[i][2]) - (entities[i][4]/2) - (player1Height/2))){
                    	if(0 < (player1Y - entities[i][2])) {
                			player1Y += characters[character1].speed
            			} else {
                			player1Y -= characters[character1].speed
            			}
                    }else{
                    	if(0 < (player1X - entities[i][1])) {
                			player1X += characters[character1].speed
            			} else {
                			player1X -= characters[character1].speed
            			}
                    }
                }
                if((Math.abs(player2X-entities[i][1]) < (player2Width + entities[i][3])/2)&&(Math.abs(player2Y - entities[i][2]) < (player2Height + entities[i][4])/2)){
                	if((Math.abs(player2X-entities[i][1]) < (player2Width + entities[i][3])/2)&&(Math.abs(player2Y - entities[i][2]) < (player2Height + entities[i][4])/2)){
                		if((Math.abs(player2X - entities[i][1]) - (entities[i][3]/2) - (player2Width/2)) < (Math.abs(player2Y - entities[i][2]) - (entities[i][4]/2) - (player2Height/2))){
                    		if(0 < (player2Y - entities[i][2])) {
                				player2Y += characters[character2].speed
            				} else {
                				player2Y -= characters[character2].speed
            				}
                    	}else{
                    		if(0 < (player2X - entities[i][1])) {
                				player2X += characters[character2].speed
            				} else {
                				player2X -= characters[character2].speed
            				}
                    	}
                	}
                }
            }
            //draws enity
            ctx.fillStyle = entities[i][10]
            drawRectangle("player1",entities[i][1],entities[i][2],entities[i][3],entities[i][4])
            drawRectangle("player2",entities[i][1],entities[i][2],entities[i][3],entities[i][4])
            if ((entities[i][8] <= 0)||(entities[i][9] <= 0)){
            	entities.splice(i--,1);
            }
        }
    }
    function menu(){
        requirements()
  		ctx.drawImage(background, 0, 0, background.width, background.height,0,0,window.innerWidth,window.innerHeight)
        ctx.textAlign = "left"
        ctx.fillStyle = "#000000"	
        ctx.font = "30px Arial"
		if(Math.round(parseInt(getCookie("Points")))!="1"){
        		ctx.fillText("You have "+Math.round(parseInt(getCookie("Points")))+" points",0,30)
		}else{
        		ctx.fillText("You have 1 point",0,30)
        }		
    	ctx.textAlign = "center"
		ctx.font = "20px Arial"
        ctx.fillText("W and S to move through the menu, press 2 to select",(1366/2)*pixelWidth,(((768/2)+300)*pixelHeight))
        ctx.font = "30px Arial"
        if(menuItemSelected==0){
        	ctx.fillStyle = "#555555"	
        }else{
        	ctx.fillStyle = "#000000"	
        }
        ctx.fillText("Single Player",(1366/2)*pixelWidth,((768/2)-100)*pixelHeight)
        if(menuItemSelected==1){
        	ctx.fillStyle = "#555555"	
        }else{
        	ctx.fillStyle = "#000000"	
        }
        ctx.fillText("Two Player",(1366/2)*pixelWidth,((768/2)-50)*pixelHeight)
        if(menuItemSelected==2){
        	ctx.fillStyle = "#555555"	
        }else{
        	ctx.fillStyle = "#000000"	
        }
        ctx.fillText("Controls",(1366/2)*pixelWidth,((768/2))*pixelHeight)
        if(wKeyPressed||sKeyPressed){
        	menuItemSelected += sKeyPressed - wKeyPressed
            sKeyPressed = false
            wKeyPressed = false
        }
        if(menuItemSelected==3){
        	ctx.fillStyle = "#555555"	
        }else{
        	ctx.fillStyle = "#000000"	
        }
        ctx.fillText("Options",(1366/2)*pixelWidth,((768/2)+50)*pixelHeight)
        if(wKeyPressed||sKeyPressed){
        	menuItemSelected += sKeyPressed - wKeyPressed
            sKeyPressed = false
            wKeyPressed = false
        }
        menuItemSelected = (menuItemSelected+4)%4
        if(twoKeyPressed){
            clearInterval(menuAction)
        	if(menuItemSelected==0){
                resumeTo = "singlePlayer"
                gameTo = "singlePlayer"
                selectCharacterAction = setInterval(selectCharacter,1)
            }
            if(menuItemSelected==1){
                resumeTo = "twoPlayer"
                gameTo = "twoPlayer"
                selectCharacterAction = setInterval(selectCharacter,1)
            }
            if(menuItemSelected==2){
                twoKeyPressed = 0
                goBackTo = "menu"
                controlsAction = setInterval(controls,1)
            }
            if(menuItemSelected==3){
                twoKeyPressed = 0
                menuItemSelected = 0
                optionsAction = setInterval(options,1)
            }
        }
    }
    function controls(){
    	requirements()
        ctx.textAlign = "center"
        ctx.font = "30px Arial"
      	ctx.fillStyle = "#555555"	
		ctx.fillText("Go Back",(1366/2)*pixelWidth,((768/2)+150)*pixelHeight)
        ctx.font = "15px Arial"
      	ctx.fillStyle = "#000000"	
        ctx.fillText("W A S D to move the character on the left and 2 to charge up mana, 2 + WASD to fire",(1366/2)*pixelWidth,((768/2)-150)*pixelHeight)
        ctx.fillText("Arrow Keys to move the character on the right and shift to charge up mana, shift + Arrow Keys to fire",(1366/2)*pixelWidth,((768/2)-50)*pixelHeight)
        ctx.fillText("On single player, W A S D to move the character on the left and shift to charge up mana, shift + WASD to fire",(1366/2)*pixelWidth,((768/2)+50)*pixelHeight)
        if(twoKeyPressed){
        	clearInterval(controlsAction)
            twoKeyPressed = 0
            if(goBackTo == "pause"){
            	pauseAction = setInterval(pause,1)
            }else if(goBackTo == "menu"){
            	menuAction = setInterval(menu,1)
            }
        }
    }
    function pause(){
        requirements()
    	ctx.textAlign = "center"
        ctx.fillStyle = "#000000"	
        ctx.font = "50px Arial"
        ctx.fillText("Paused",(1366/2)*pixelWidth,((768/2)-200)*pixelHeight)
		ctx.font = "20px Arial"
        ctx.fillText("W and S to move through the menu, press 2 to select",(1366/2)*pixelWidth,(((768/2)+300)*pixelHeight))
        ctx.font = "30px Arial"
        if(menuItemSelected==0){
        	ctx.fillStyle = "#555555"	
        }else{
        	ctx.fillStyle = "#000000"	
        }
        ctx.fillText("Resume",(1366/2)*pixelWidth,((768/2)-100)*pixelHeight)
        if(menuItemSelected==1){
        	ctx.fillStyle = "#555555"	
        }else{
        	ctx.fillStyle = "#000000"	
        }
        ctx.fillText("Quit to Title Screen",(1366/2)*pixelWidth,((768/2)-50)*pixelHeight)
        if(menuItemSelected==2){
        	ctx.fillStyle = "#555555"	
        }else{
        	ctx.fillStyle = "#000000"	
        }
        ctx.fillText("Controls",(1366/2)*pixelWidth,((768/2)-0)*pixelHeight)
        if(menuItemSelected==3){
        	ctx.fillStyle = "#555555"	
        }else{
        	ctx.fillStyle = "#000000"	
        }
        ctx.fillText("Reset",(1366/2)*pixelWidth,((768/2)+50)*pixelHeight)
        if(wKeyPressed||sKeyPressed){
        	menuItemSelected += sKeyPressed - wKeyPressed
            sKeyPressed = false
            wKeyPressed = false
        }
        menuItemSelected = (menuItemSelected+4)%4
        if(twoKeyPressed){
        	if(menuItemSelected==0){
            	clearInterval(pauseAction)
                if(resumeTo == "twoPlayer"){
                    twoPlayerAction = setInterval(twoPlayer,1)
                }else{
                    singlePlayerAction = setInterval(singlePlayer,1)
                }
            }
            if(menuItemSelected==1){
            	clearInterval(pauseAction)
                twoKeyPressed = 0
                menuItemSelected = 0
                menuAction = setInterval(menu,1)
                if(resumeTo == "singlePlayer"){
                	document.cookie = "Points="+(parseInt(getCookie("Points")) - characters[character2].difficulty/characters[character1].difficulty)
                }
            }
            if(menuItemSelected==2){
            	clearInterval(pauseAction)
                twoKeyPressed = 0
                goBackTo = "pause"
                controlsAction = setInterval(controls,1)
            }
            if(menuItemSelected==3){
            	clearInterval(pauseAction)
                player1X = 0
                player2X = 300
                player1Y = 0
                player2Y = 0
                if(resumeTo == "twoPlayer"){
                    twoPlayerAction = setInterval(twoPlayer,1)
                }else{
                    singlePlayerAction = setInterval(singlePlayer,1)
                }
            }
        }
    }
    function singlePlayer(){
		requirements()
        backgroundScroll()
        ctx.textAlign = "center"
        ctx.font = "30px Arial"
        ctx.fillStyle = "#FF0000"	
        ctx.fillRect(0,0,((1366/2)/(player1StartingHP))*player1HP*pixelWidth,33)
        ctx.fillRect((1366/2)*pixelWidth,0,((1366/2)/(player2StartingHP))*player2HP*pixelWidth,33)
        ctx.fillStyle = "#0000FF"	
        ctx.fillRect(0,32,((1366/2)/(characters[character1].maxMana))*player1Mana*pixelWidth,32)
        ctx.fillRect((1366/2)*pixelWidth,32,((1366/2)/(characters[character2].maxMana))*player2Mana*pixelWidth,32)
        ctx.fillStyle = "#000000"	
        ctx.fillText("HP:".concat(Math.ceil(player1HP)),(1366/4)*pixelWidth,30)
        ctx.fillText("HP:".concat(Math.ceil(player2HP)),(1366/4)*pixelWidth*3,30)
        ctx.fillStyle = "#000000"	
        if(characters[character1].name == "Water Squeekee"){
        	ctx.fillText("Infinite Mana",(1366/4)*pixelWidth,60)
        }else{
        	ctx.fillText("Mana:".concat(Math.ceil(player1Mana)),(1366/4)*pixelWidth,60)
        }
        if(characters[character2].name == "Water Squeekee"){
        	ctx.fillText("Infinite Mana",(1366/4)*pixelWidth*3,60)
        }else{
        	ctx.fillText("Mana:".concat(Math.ceil(player2Mana)),(1366/4)*pixelWidth*3,60)
        }
        //draws line
        ctx.fillRect(ctx.canvas.width/2-1,0, 2,ctx.canvas.height);
        //draws characters
        drawCharacters()
        //computer movement
        if(computerMode == "Charging"){
           player2Mana += characters[character2].manaRegen
           if(player2Mana > characters[character2].maxMana){
                player2Mana = characters[character2].maxMana
                computerMode = "Attack"
           }
        }else if((player2Y - player1Y)>(characters[character2].bulletSpeed*bulletLife*rangeMultiplier)){
           player2Y -= characters[character2].speed
        }else if((player2X - player1X)>(characters[character2].bulletSpeed*bulletLife*rangeMultiplier)){
           player2X -= characters[character2].speed
        }else if((player2Y - player1Y)<(characters[character2].bulletSpeed*bulletLife*-1*rangeMultiplier)){
           player2Y += characters[character2].speed
        }else if((player2X - player1X)<(characters[character2].bulletSpeed*bulletLife*-1*rangeMultiplier)){
           player2Y += characters[character2].speed
        }else if(Math.abs(player2X - player1X)<Math.abs(player2Y - player1Y)){
             if((player2X - player1X)<-1*(computerAccuracy)){
                player2X += characters[character2].speed
             }else if((player2X - player1X)>computerAccuracy){
                player2X -= characters[character2].speed
             }else{
                 //fire
                 if((player2Y-player1Y)>0){
                     if(player2Mana>=characters[character2].bulletCost){
                		entities.push(["player2Bullet", player2X, player2Y, characters[character2].bulletWidth, characters[character2].bulletHeight, 0, characters[character2].bulletSpeed*-1, characters[character2].bulletDamage,characters[character2].bulletPierce,bulletLife,characters[character2].color])
                    	player2Mana -= characters[character2].bulletCost
                    }else{
                    	computerMode = "Charging"
                    }
                 }else{
                    if(player2Mana>=characters[character2].bulletCost){
                		entities.push(["player2Bullet", player2X, player2Y, characters[character2].bulletWidth, characters[character2].bulletHeight, 0, characters[character2].bulletSpeed, characters[character2].bulletDamage,characters[character2].bulletPierce,bulletLife,characters[character2].color])
                    	player2Mana -= characters[character2].bulletCost
                    }else{
                    	computerMode = "Charging"
                    }
                 }
             }
        }else{
             if((player2Y - player1Y)<-1*(computerAccuracy)){
                player2Y += characters[character2].speed
             }else if((player2Y - player1Y)>computerAccuracy){
                player2Y -= characters[character2].speed
             }else{
                 //fire
                 if((player2X-player1X)>0){
                     if(player2Mana>=characters[character2].bulletCost){
                		entities.push(["player2Bullet", player2X, player2Y, characters[character2].bulletWidth, characters[character2].bulletHeight, characters[character2].bulletSpeed*-1,0,  characters[character2].bulletDamage,characters[character2].bulletPierce,bulletLife,characters[character2].color])
                    	player2Mana -= characters[character2].bulletCost
                    }else{
                    	computerMode = "Charging"
                    }
                 }else{
                    if(player2Mana>=characters[character2].bulletCost){
                		entities.push(["player2Bullet", player2X, player2Y, characters[character2].bulletWidth, characters[character2].bulletHeight, characters[character2].bulletSpeed, 0,characters[character2].bulletDamage,characters[character2].bulletPierce,bulletLife,characters[character2].color])
                    	player2Mana -= characters[character2].bulletCost
                    }else{
                    	computerMode = "Charging"
                    }
                 }
             }
        }
        if(shiftKeyPressed){
            if((sKeyPressed != wKeyPressed) || (dKeyPressed != aKeyPressed)) {
            	if((sKeyPressed + wKeyPressed + dKeyPressed + aKeyPressed) == 1||((sKeyPressed + wKeyPressed + dKeyPressed + aKeyPressed) == 2)&&canShootDiagonally){
               		if(player1Mana>=characters[character1].bulletCost){
               			entities.push(["player1Bullet", player1X, player1Y, characters[character1].bulletWidth, characters[character1].bulletHeight, (dKeyPressed - aKeyPressed)*characters[character1].bulletSpeed, (sKeyPressed - wKeyPressed)*characters[character1].bulletSpeed,characters[character1].bulletDamage,characters[character1].bulletPierce,bulletLife,characters[character1].color])
               			player1Mana -= characters[character1].bulletCost
               		}
            	}
            }else{
            	player1Mana += characters[character1].manaRegen
                if(player1Mana > characters[character1].maxMana){
                	player1Mana = characters[character1].maxMana
                }
            }
        }else{
        	if(sKeyPressed||wKeyPressed){
            player1Y += (sKeyPressed - wKeyPressed)*characters[character1].speed
            }else{
            player1X += (dKeyPressed - aKeyPressed)*characters[character1].speed
            }
            if((Math.abs(player1X-player2X) < (player1Width + player2Width)/2)&&(Math.abs(player1Y - player2Y) < (player1Height + player2Height)/2)){
                if((Math.abs(player1X - player2X) - (player2Width/2) - (player1Width/2)) < (Math.abs(player1Y - player2Y) - (player2Height/2) - (player1Height/2))){
                    if(0 < (player1Y - player2Y)) {
                		player1Y += characters[character1].speed
            		} else {
                		player1Y -= characters[character1].speed
            		}
                }else{
                    if(0 < (player1X - player2X)) {
                		player1X += characters[character1].speed
            		} else {
                		player1X -= characters[character1].speed
            		}
                }
            }
        }
        renderEntities()
        if(player1HP <= 0){
            document.cookie = "Points="+(parseInt(getCookie("Points")) - (characters[character2].difficulty/characters[character1].difficulty + ((characters[character1].difficulty/characters[character2].difficulty)/2)))
        	clearInterval(singlePlayerAction)
			menuItemSelected = 0
			twoKeyPressed = 0
            congratulationsAction = setInterval(congratulations,1)
        }
        if(player2HP <= 0){
            document.cookie = "Points="+(parseInt(getCookie("Points")) + (characters[character1].difficulty/characters[character2].difficulty)+1)
        	clearInterval(singlePlayerAction)
			menuItemSelected = 0
			twoKeyPressed = 0
            congratulationsAction = setInterval(congratulations,1)
        }
        //sets points to zero if below
        if(0 > (parseInt(getCookie("Points")))){
        	document.cookie = "Points=0"
        }
        if(escapeKeyPressed){
        	clearInterval(singlePlayerAction)
            menuItemSelected = 0
            twoKeyPressed = 0
            pauseAction = setInterval(pause,1)
        }
    }
    function twoPlayer(){
		requirements()
        backgroundScroll()
        ctx.textAlign = "center"
        ctx.font = "30px Arial"
        ctx.fillStyle = "#FF0000"	
        ctx.fillRect(0,0,((1366/2)/(player1StartingHP))*player1HP*pixelWidth,33)
        ctx.fillRect((1366/2)*pixelWidth,0,((1366/2)/(player2StartingHP))*player2HP*pixelWidth,33)
        ctx.fillStyle = "#0000FF"	
        ctx.fillRect(0,32,((1366/2)/(characters[character1].maxMana))*player1Mana*pixelWidth,32)
        ctx.fillRect((1366/2)*pixelWidth,32,((1366/2)/(characters[character2].maxMana))*player2Mana*pixelWidth,32)
        ctx.fillStyle = "#000000"	
        ctx.fillText("HP:".concat(Math.ceil(player1HP)),(1366/4)*pixelWidth,30)
        ctx.fillText("HP:".concat(Math.ceil(player2HP)),(1366/4)*pixelWidth*3,30)
        ctx.fillStyle = "#000000"	
        if(characters[character1].name == "Water Squeekee"){
        	ctx.fillText("Infinite Mana",(1366/4)*pixelWidth,60)
        }else{
        	ctx.fillText("Mana:".concat(Math.ceil(player1Mana)),(1366/4)*pixelWidth,60)
        }
        if(characters[character2].name == "Water Squeekee"){
        	ctx.fillText("Infinite Mana",(1366/4)*pixelWidth*3,60)
        }else{
        	ctx.fillText("Mana:".concat(Math.ceil(player2Mana)),(1366/4)*pixelWidth*3,60)
        }
        ctx.fillRect(ctx.canvas.width/2-1,0, 2,ctx.canvas.height);
        drawCharacters()
        if(shiftKeyPressed){
            if((upArrowPressed != downArrowPressed) || (leftArrowPressed != rightArrowPressed)){
            	if(((upArrowPressed + downArrowPressed + leftArrowPressed + rightArrowPressed) == 1)||( ( (upArrowPressed + downArrowPressed + leftArrowPressed + rightArrowPressed) == 2)&&canShootDiagonally)){
            		if(player2Mana>=characters[character2].bulletCost){
                		entities.push(["player2Bullet", player2X, player2Y, characters[character2].bulletWidth, characters[character2].bulletHeight, (rightArrowPressed - leftArrowPressed)*characters[character2].bulletSpeed, (downArrowPressed - upArrowPressed)*characters[character2].bulletSpeed,characters[character2].bulletDamage,characters[character2].bulletPierce,bulletLife,characters[character2].color])
                    	player2Mana -= characters[character2].bulletCost
                    }
                }
            }else{
                player2Mana += characters[character2].manaRegen
                if(player2Mana > characters[character2].maxMana){
                	player2Mana = characters[character2].maxMana
                }
            }
        }else{
            player2Y += (downArrowPressed - upArrowPressed)*characters[character2].speed
            player2X += (rightArrowPressed - leftArrowPressed)*characters[character2].speed
            if((Math.abs(player2X-player1X) < (player2Width + player1Width)/2)&&(Math.abs(player2Y - player1Y) < (player2Height + player1Height)/2)){
                if((Math.abs(player2X - player1X) - (player1Width/2) - (player2Width/2)) < (Math.abs(player2Y - player1Y) - (player1Height/2) - (player2Height/2))){
                    if(0 < (player2Y - player1Y)) {
                		player2Y += characters[character2].speed
            		} else {
                		player2Y -= characters[character2].speed
            		}
                }else{
                    if(0 < (player2X - player1X)) {
                		player2X += characters[character2].speed
            		} else {
                		player2X -= characters[character2].speed
            		}
                }
            }
        }
        if(twoKeyPressed){
            if((sKeyPressed != wKeyPressed) || (dKeyPressed != aKeyPressed)) {
            	if(((sKeyPressed + wKeyPressed + dKeyPressed + aKeyPressed) == 1)||(((sKeyPressed + wKeyPressed + dKeyPressed + aKeyPressed) == 2)&&canShootDiagonally)){
               		if(player1Mana>=characters[character1].bulletCost){
               			entities.push(["player1Bullet", player1X, player1Y, characters[character1].bulletWidth, characters[character1].bulletHeight, (dKeyPressed - aKeyPressed)*characters[character1].bulletSpeed, (sKeyPressed - wKeyPressed)*characters[character1].bulletSpeed,characters[character1].bulletDamage,characters[character1].bulletPierce,bulletLife,characters[character1].color])
               			player1Mana -= characters[character1].bulletCost
               		}
            	}
            }else{
            	player1Mana += characters[character1].manaRegen
                if(player1Mana > characters[character1].maxMana){
                	player1Mana = characters[character1].maxMana
                }
            }
        }else{
            player1Y += (sKeyPressed - wKeyPressed)*characters[character1].speed
            player1X += (dKeyPressed - aKeyPressed)*characters[character1].speed
            if((Math.abs(player1X-player2X) < (player1Width + player2Width)/2)&&(Math.abs(player1Y - player2Y) < (player1Height + player2Height)/2)){
                if((Math.abs(player1X - player2X) - (player2Width/2) - (player1Width/2)) < (Math.abs(player1Y - player2Y) - (player2Height/2) - (player1Height/2))){
                    if(0 < (player1Y - player2Y)) {
                		player1Y += characters[character1].speed
            		} else {
                		player1Y -= characters[character1].speed
            		}
                }else{
                    if(0 < (player1X - player2X)) {
                		player1X += characters[character1].speed
            		} else {
                		player1X -= characters[character1].speed
            		}
                }
            }
        }
        renderEntities()
        if((player1HP <= 0)||(player2HP <= 0)){
        	clearInterval(twoPlayerAction)
			menuItemSelected = 0
			twoKeyPressed = 0
            congratulationsAction = setInterval(congratulations,1)
        }
        if(escapeKeyPressed){
        	clearInterval(twoPlayerAction)
            menuItemSelected = 0
            twoKeyPressed = 0
            pauseAction = setInterval(pause,1)
        }
    }
    function congratulations(){
        requirements()
        ctx.fillStyle = "#000000"	
        if(resumeTo=="singlePlayer"){
        	ctx.textAlign = "left"
        	ctx.font = "30px Arial"
            if(Math.round(parseInt(getCookie("Points")))!="1"){
        		ctx.fillText("You have "+Math.round(parseInt(getCookie("Points")))+" points",0,30)
            }else{
        		ctx.fillText("You have 1 point",0,30)
            }
        }
    	ctx.textAlign = "center"
        ctx.font = "50px Arial"
        if(player1HP <= 0){
        	ctx.fillText("Player 2 Won!",(1366/2)*pixelWidth,((768/2)-200)*pixelHeight)
        }else if(player2HP <= 0){
			ctx.fillText("Player 1 Won!",(1366/2)*pixelWidth,((768/2)-200)*pixelHeight)
        }
		ctx.font = "20px Arial"
        ctx.fillText("W and S to move through the menu, press 2 to select",(1366/2)*pixelWidth,(((768/2)+300)*pixelHeight))
        ctx.font = "30px Arial"
        if(menuItemSelected==0){
        	ctx.fillStyle = "#555555"	
        }else{
        	ctx.fillStyle = "#000000"	
        }
        ctx.fillText("Play Again?",(1366/2)*pixelWidth,((768/2)-100)*pixelHeight)
        if(menuItemSelected==1){
        	ctx.fillStyle = "#555555"	
        }else{
        	ctx.fillStyle = "#000000"	
        }
        ctx.fillText("Quit to Title Screen",(1366/2)*pixelWidth,((768/2)-50)*pixelHeight)
        if(wKeyPressed||sKeyPressed){
        	menuItemSelected += sKeyPressed - wKeyPressed
            sKeyPressed = false
            wKeyPressed = false
        }
        menuItemSelected = (menuItemSelected+2)%2
        if(twoKeyPressed){
        	clearInterval(congratulationsAction)
        	if(menuItemSelected==0){
               selectCharacterAction = setInterval(selectCharacter,1)
            }
            if(menuItemSelected==1){
                twoKeyPressed = 0
                menuItemSelected = 0
                menuAction = setInterval(menu,1)
            }
        }
    }
    function options(){
    	requirements()
    	ctx.textAlign = "center"
        ctx.fillStyle = "#000000"	
        ctx.font = "50px Arial"
        ctx.fillText("Options",(1366/2)*pixelWidth,((768/2)-200)*pixelHeight)
        ctx.font = "15px Arial"
        ctx.fillText("W and S to move through the menu, press 2 to select, press A and D to edit the options",(1366/2)*pixelWidth,(((768/2)+300)*pixelHeight))
        ctx.font = "30px Arial"
        if(menuItemSelected==0){
        	ctx.fillStyle = "#555555"	
        }else{
        	ctx.fillStyle = "#000000"	
        }
        ctx.fillText("Health Multiplier:"+HPMultiplier,(1366/2)*pixelWidth,((768/2)-100)*pixelHeight)
        if(menuItemSelected==1){
        	ctx.fillStyle = "#555555"	
        }else{
        	ctx.fillStyle = "#000000"	
        }
        ctx.fillText("Bullet Life:"+bulletLife,(1366/2)*pixelWidth,((768/2)-50)*pixelHeight)
        if(menuItemSelected==2){
        	ctx.fillStyle = "#555555"	
        }else{
        	ctx.fillStyle = "#000000"	
        }
        ctx.fillText("Wall?:"+wall,(1366/2)*pixelWidth,((768/2))*pixelHeight)
        if(menuItemSelected==3){
        	ctx.fillStyle = "#555555"	
        }else{
        	ctx.fillStyle = "#000000"	
        }
        ctx.fillText("Computer Accuracy:"+computerAccuracy,(1366/2)*pixelWidth,((768/2)+50)*pixelHeight)
        if(menuItemSelected==4){
        	ctx.fillStyle = "#555555"	
        }else{
        	ctx.fillStyle = "#000000"	
        }
        ctx.fillText("Does not always work, Shoot Diagonally?:"+canShootDiagonally,(1366/2)*pixelWidth,((768/2)+100)*pixelHeight)
        if(menuItemSelected==5){
        	ctx.fillStyle = "#555555"	
        }else{
        	ctx.fillStyle = "#000000"	
        }
        ctx.fillText("Bot Range Multiplier:"+rangeMultiplier,(1366/2)*pixelWidth,((768/2)+150)*pixelHeight)
        if(menuItemSelected==6){
        	ctx.fillStyle = "#555555"	
        }else{
        	ctx.fillStyle = "#000000"	
        }
        ctx.fillText("Reset",(1366/2)*pixelWidth,((768/2)+200)*pixelHeight)
        if(menuItemSelected==7){
        	ctx.fillStyle = "#555555"	
        }else{
        	ctx.fillStyle = "#000000"	
        }
        ctx.fillText("Go Back",(1366/2)*pixelWidth,((768/2)+250)*pixelHeight)
        if(wKeyPressed||sKeyPressed){
        	menuItemSelected += sKeyPressed - wKeyPressed
            sKeyPressed = false
            wKeyPressed = false
        }
        menuItemSelected = (menuItemSelected+8)%8
        if(aKeyPressed){
        	if(menuItemSelected == 0){
        		HPMultiplier = HPMultiplier/10
            }
            if(menuItemSelected == 1){
            	bulletLife--
            }
            if(menuItemSelected == 2){
				wall = false
            }
            if(menuItemSelected == 3){
            	computerAccuracy--
            }
            if(menuItemSelected == 4){
				canShootDiagonally = false
			}
            if(menuItemSelected == 5){
            	rangeMultiplier -= 0.05
            }
             aKeyPressed = false
        }
        if(dKeyPressed){
        	if(menuItemSelected == 0){
            	HPMultiplier=HPMultiplier*10
            }
            if(menuItemSelected == 1){
            	bulletLife++
            }
            if(menuItemSelected == 2){
				wall = true	
			}
            if(menuItemSelected == 3){
            	computerAccuracy++
            }
            if(menuItemSelected == 4){
				canShootDiagonally = true	
			}
            if(menuItemSelected == 5){
            	rangeMultiplier += 0.05
            }
            dKeyPressed = false
        }
        if(twoKeyPressed){
        	if(menuItemSelected==6){
            	twoKeyPressed = 0
                HPMultiplier = 1
                computerAccuracy = 8
                wall = true
                bulletLife = 500
                canShootDiagonally = false
                RangeMultiplier = 0.4
            }
            if(menuItemSelected==7){
            	twoKeyPressed = 0
                menuItemSelected = 0
            	clearInterval(optionsAction)
                menuAction = setInterval(menu,1)
            }
        }
    }
    document.addEventListener('keydown', function(event) {
    //Blue (Player 2)
    if (event.keyCode == 38){
    upArrowPressed = true
    
    }
    if (event.keyCode == 40){
    downArrowPressed = true
    }
    if (event.keyCode == 39){
    rightArrowPressed = true
    }
    if (event.keyCode == 37){
    leftArrowPressed = true
    }
    if (event.keyCode == 50){
    twoKeyPressed = true
    }
    
    //Red (Player 1)
    if (event.keyCode == 87) {
    wKeyPressed = true
    }
    if (event.keyCode == 83) {
    sKeyPressed = true
    }
    if (event.keyCode == 65) {
    aKeyPressed = true
    }
    if (event.keyCode == 68) {
    dKeyPressed = true
    }
    if (event.keyCode == 16) {
    shiftKeyPressed = true
    }
    
    //Pause
    if (event.keyCode == 27) {
    escapeKeyPressed = true
    }
    })
    document.addEventListener('keyup', function(event) {
    //Blue (Player 2)
 	if (event.keyCode == 38){
    upArrowPressed = false
    }
    if (event.keyCode == 40){
    downArrowPressed = false
    }
    if (event.keyCode == 39){
    rightArrowPressed = false
    }
    if (event.keyCode == 37){
    leftArrowPressed = false
    }
    if (event.keyCode == 50){
    twoKeyPressed = false
    }
    
    //Red (Player 1)
    if (event.keyCode == 87) {
    wKeyPressed = false
    }
    if (event.keyCode == 83) {
    sKeyPressed = false
    }
    if (event.keyCode == 65) {
    aKeyPressed = false
    }
    if (event.keyCode == 68) {
    dKeyPressed = false
    }
    if (event.keyCode == 16) {
    shiftKeyPressed = false
    }
    
    //Pause
    if (event.keyCode == 27) {
   	escapeKeyPressed = false
    }
    })
