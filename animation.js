var can;
var context;
var myInterval;
var animate;
var diametreBalle;
var posX;
var posY;
var vitesseX;
var vitesseY;
var img;
function dessinerTerrain()
{
	can =document.getElementById("canvas");
	can.width=document.getElementById("w").value;
	can.height=document.getElementById("h").value;
	can.style.border="2px solid brown";
	context=can.getContext('2d');
	var choixC=document.getElementsByName("c");
	for(i=0;i<=choixC.length;i++)
	{
		if(choixC[i].checked)
		{
			can.style.backgroundColor=choixC[i].value;
			break;
		}
	}
}
function dessinerBallon()
{
	//Couleur de remplissage
	var choixCR=document.getElementsByName("cr");
	for(i=0;i<=choixCR.length;i++)
	{
		if(choixCR[i].checked)
		{
			context.fillStyle=choixCR[i].value;
			break;
		}
	}
	//Couleur du contour
	var choixCC=document.getElementsByName("cc");
	for(i=0;i<=choixCC.length;i++)
	{
		if(choixCC[i].checked)
		{
			context.strokeStyle=choixCC[i].value;
			break;
		}
	}
	
	diametreBalle =eval(document.getElementById("d").value) ;
	posX = eval(document.getElementById("pox").value);
	posY = eval(document.getElementById("poy").value);
	//Tracé de la balle
	context.beginPath();
	context.arc(posX, posY, diametreBalle/2, 0, Math.PI*2,true);
	context.fill();
	context.stroke();
}
function start()
{
	animate=true;
	vitesseX = eval(document.getElementById("v").value);
	vitesseY = eval(document.getElementById("v").value);
	myInterval= setInterval(function ()
    {
		if(animate)
		{
			context.clearRect(0, 0, canvas.width, canvas.height);
			//Tracé de la balle
			context.beginPath();
			context.arc(posX, posY, diametreBalle/2, 0, Math.PI*2,true);
			context.fill();
			context.stroke(); 
			
			//vérifier si la balle a touché l'un des bords du canvas.
			if(posX+diametreBalle/2 >= canvas.width || posX <= diametreBalle/2)//Si on touche le bord gauche ou droit
			{
				vitesseX *= -1;//On inverse la vitesse de déplacement sur l'axe horizontal.
			}
			if(posY+diametreBalle/2 >= canvas.height || posY <= diametreBalle/2)//Si on touche le bord du bas ou du haut
			{
				vitesseY *= -1;//On inverse la vitesse de déplacement sur l'axe vertical.
			}
			//On additionne les vitesses de déplacement avec les positions
			posX += vitesseX;
			posY += vitesseY;
		}
		else
		{
			posX=posX;
			posY=posY;
		}
}, 1000/30);
}

function stop()
{
		clearInterval(myInterval);
		posX = 1+diametreBalle/2;
		posY = 1+diametreBalle/2;
		context.clearRect(0, 0, canvas.width, canvas.height);
        //Tracé de la balle
        context.beginPath();
        context.arc(posX, posY, diametreBalle/2, 0, Math.PI*2);
        context.fill();
		context.stroke();
		animate=false;
}
function pause()
{
	animate=false;
	clearInterval( myInterval);
	myInterval=null;
}