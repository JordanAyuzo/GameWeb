/*Segmento para variables*/
var canvas =document.getElementById("miCanvas");
var ctx = canvas.getContext('2d');
//variables para el fondo
var fondo =new Image();
fondo.src ="fondo.png";
var yfondo =-800;
var avancefondo=2;var fondo =new Image();
fondo.src ="fondo.png";
var yfondo =-800;
var avancefondo=2;
//variales para el  carro
var car =new Image();
car.src ="carro1.png";
var xcar=(canvas.width/2)+20;
var ycar=450;
var tecla=0;
var rapicar=2;
//variales paralos obstaculos 
var obs1 =new Image();
obs1.src ="obs1.png";
var xobs= 0;
var yobs=-150;
var rapiobs=3;
var subenivel= 10
var choco =false;
//variables para menu
pagprin = 1;
var minimizarx=470;
var minimizary=350;
var menux= (canvas.height/2)-195;
var menuy =(canvas.width/2)-140;
//variables para las recompensas
var bono =new Image();
bono.src ="acelera.png";
var xbono= 0;
var ybono=-150;
var rbono=2;
var tambono =64;
var contpuntos = 0;
var recordmetros =0;;
var recordpuntos = 0;
var rapmetros = 1
//variales para diseño 
var over =new Image();
over.src ="gameover.png";
var semaforo =new Image();
semaforo.src ="semaforo.png";
var punto =new Image();
punto.src ="puntos.png";
var menu =new Image();
menu.src ="cuadro.png";
var banderai =new Image();
banderai.src ="bandera.png";
//variables para detectar coliciones 
var bandera = false;
var bloqueador=0;
var inicio = 1;
var cin = 0;
var cpun =0;
var marcador =0;
//variables de sonido
var sonido = new Audio("corriendo.m4a");
var salida = new Audio("salida.mp3");
var tomapuntos = new Audio("comemonedas.mp3")
var choque = new Audio("choque.mp3  ")
/*segmento de incializacion*/
fondo.onload=function(){
    setInterval(drawn,1);
    //ctx.drawImage(obs1,8,1,61,467,0,0,80,50);
}
document.addEventListener('keydown',manejadorTecladoAbajo,false);
/* segmento para funciones de dibujo*/
function dibujamenu() {
    ctx.drawImage(menu,78,405,1942,1520,menux,menuy,minimizarx,minimizary);
    //ctx.drawImage(banderai,0,0,1188,750,150,130,200,100);
    ctx.drawImage(car,11,5,162,460,145  ,205,100,140);
    ctx.fillText("Presiona Espacio Para Iniciar El Juego",(canvas.width/2)-150,370);
    ctx.fillText("Mejor Puntuaje: "+recordpuntos+".",(canvas.width/2)-10,270);
    ctx.fillText("Mejor Ditancia: "+recordmetros+" m.",(canvas.width/2)-10,310);
    ctx.font="20px Bitstream Vera Srif";
    ctx.fillStyle="#FFFFff";
}
function carretera(){
    ctx.drawImage(fondo,65,0,700,1500,0,yfondo,730,1500);
    if(yfondo>-37){
        yfondo=-729
    }else{
        yfondo+=avancefondo;
    }
}
function carreteraquiet(){
    ctx.drawImage(fondo,65,0,700,1500,0,-800,730,1500);
    ctx.drawImage(car,11,5,162,460,xcar,ycar,60,100);
}
function carro(){
    ctx.drawImage(car,11,5,162,460,xcar,ycar,60,100);
    if(tecla==39 && xcar<370){
        xcar+=rapicar;
    }
    if(tecla==37 && xcar>170){
        xcar-=rapicar;
    }

}
function obstaculo(){
    if (yobs<-130){
        xobs=getRandomInt(170,370)
    }
    if(yobs>700){
        yobs=-150;
    }else{
        yobs+=rapiobs
    }
    ctx.drawImage(obs1,1,1,365,695,xobs,yobs,70,130);

}
function dibujapuntos(){
    if (ybono<-130){
        xbono=getRandomInt(170,370);
    }
    if(ybono>700){
        ybono=-150;
    }else{
        ybono+=rbono;
    }
    ctx.drawImage(bono,0,0,64,64,xbono,ybono,tambono,tambono);
}
function gameover(){
    ctx.drawImage(over,0,0,700,400,(canvas.width/2)-120,200,280,200);
    
        
    ctx.beginPath();
    ctx.rect((canvas.width/2)-150,365,300,55);
    ctx.fillStyle ="#FFFF00";
    ctx.fill();
    ctx.closePath(); 
    ctx.font="20px Bitstream Vera Serif";
    ctx.fillStyle="#000000";
    ctx.fillText("Presiona Q Para Reiniciar",(canvas.width/2)-110,390);
    ctx.fillText("Presiona M Para Ir Al Menú",(canvas.width/2)-115,410);
}
function rojo(){
    ctx.drawImage(semaforo,48,96,400,840,(canvas.width/2)-35,200,80,150);
}
function amarillo(){
        ctx.drawImage(semaforo,440,96,400,840,(canvas.width/2)-35,200,80,150);
}
function verde(){
    ctx.drawImage(semaforo,835,96,400,840,(canvas.width/2)-35,200,80,150);
}
function marca(){
    cpun+= rapmetros;
    ctx.drawImage(punto,98,280,1000,840,0,0,150,70);
    if (cpun== 40){
        marcador+=1;
        cpun=0
    }
    ctx.font="15px Arial";
    ctx.fillStyle="#000000";
    ctx.fillText("metros="+marcador,20,35);

    ctx.drawImage(punto,98,280,1000,840,0,70,150,70);
    ctx.font="15px Arial";
    ctx.fillStyle="#000000";
    ctx.fillText("Puntos="+contpuntos,20,105);
}
function dibujabandera(){
    //verde();
    ctx.drawImage(banderai,0,0,1188,750,200,200,200,120);
}
function dibujasemaforo(){
    if (cin<60) {
        carreteraquiet();
        rojo();
        pausa();}
    if (cin>=240 && cin<630) {
        carreteraquiet();
        amarillo();
        pausa();}
    if (cin>=650 && cin<770) {
        console.log(cin)
        carretera();
        carro()
        verde();
        }
    if (cin>768){
        inicio=0;
    }
}
function drawn(){//funcion principal
    if (pagprin==1){
        ctx.drawImage(fondo,65,0,700,1500,0,yfondo,730,1500);
        carro();
        if (tecla==32){
            carro();
            ctx.drawImage(menu,78,405,1942,1520,menux,menuy,minimizarx,minimizary);
            minimizarx=minimizarx-3;
            minimizary=minimizary-2.2;
            menux+=1.4;
            menuy+=2;
            if (minimizarx<=0){
                pagprin=0;
            }
        }else{
            dibujamenu();
        }
    }else{
        if (inicio==1){
            salida.play();
            dibujasemaforo();
            cin ++;
        }else{
            if (tecla==80) {
                dibujabandera();
                pausa();
            }else{
                carretera();
                dibujapuntos();
                carro();
                marca();
                obstaculo();
                sumapuntos();
            }
            detectarColision();   
        }

    }
}

/*Funciones para operaciones y logica del videojuego*/

function manejadorTecladoAbajo(e){
    if(e.keyCode==39 && bloqueador ==0){
        tecla=39;
    }
    if(e.keyCode==37 && bloqueador==0){
        tecla=37;
    }
    if(e.keyCode==38 && ycar>0){
        ycar-=8;
    }
    if(e.keyCode==40&& ycar<600-160){
        ycar+=8;
    }
    if(e.keyCode==80){
        tecla=80;
    }
    if(e.keyCode==81){
        tecla=81;
    }
    if(e.keyCode==32 && bloqueador ==0){
        tecla=32;
    }
    if(e.keyCode==77 ){
        tecla=77;
    }
    


}
function getRandomInt(min,max) {
    return Math.random() * (max - min) + min;
  }
  function detectarColision(){
    if(xcar<=xobs+60 && ycar<=yobs+115 && xcar>=xobs-45 && ycar>=yobs-100){
        if (choco == false){
            sonido.pause();
            choque.play();
            choco = true;
        }
        if (tecla==81 || tecla == 77){
            if (tecla == 77){
                minimizarx=470;
                minimizary=350;
                menux= (canvas.height/2)-195;
                menuy =(canvas.width/2)-140;
                pagprin = 1;
            }
            restablecer();
        }else{
            tecla= 80;
            bloqueador=1
        gameover()
        }
    }else{
        sonido.play();
    }
}
function restablecer(){
    if (contpuntos>recordpuntos)
        recordpuntos= contpuntos;
    if (marcador>recordmetros)
        recordmetros= marcador;
    choco = false;
    yfondo =-800;
    xcar=(canvas.width/2)+20;
    ycar=450;
    xobs= 0;
    yobs=-150;
    rapiobs=3;
    bandera= false;
    tecla = 0;
    bloqueador = 0;
    cin=0;
    inicio = 1;
    cpun=0;
    marcador =0;
    contpuntos =0;
    tambono= 64;
    rapicar=2;
    rapiobs=3;
    rapmetros=1;
    avancefondo=2;
    subenivel=10
    
}
function sumapuntos(){
    if(xcar<=xbono+50 && ycar<=ybono+50 && xcar>=xbono-50 && ycar>=ybono-50){
        tomapuntos.play();
        bandera=true;
    }
    if (bandera== true){
        
        tambono =tambono-1;
        if (tambono<1){
            ybono=-350;
            tambono=64 ;
            bandera=false;
            contpuntos++;
        }
        if (contpuntos==subenivel){
            subenivel=subenivel+10;
            rapicar=rapicar+1;
            rapiobs=rapiobs+1.5;
            rapmetros+=1;
            avancefondo+=.5;
        }
    }
}
function pausa(){
    yfondo =yfondo;
    xcar=xcar;
    ycar=ycar;
    xobs= xobs;
    yobs=yobs;
}
