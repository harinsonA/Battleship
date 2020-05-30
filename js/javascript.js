// Declaracion de las variables a utilizar
var filas = 10;
var columnas = 10;
var tamaño_casilla = 50;
var intento =25;
var marcador = 0;
var nro_naves = 17;

// Obeneter los elementos del dom
var contenedor_tablero = document.getElementById("tablero");
var puntos = document.getElementById('destruidas');
var intentos = document.getElementById('intentos');

//Creacion del tablero
for (let i = 0; i < columnas; i++) {
    for (let j = 0; j < filas; j++) {

        var casilla = document.createElement("div"); 

        casilla.id = "b" + j + i; //identificacion para cada casilla del tablero 

        var topPosition = j * tamaño_casilla;
        var leftPosition = i * tamaño_casilla;

        casilla.style.top = topPosition + "px";
        casilla.style.left = leftPosition + "px";


        
        contenedor_tablero.appendChild(casilla);
    }
}

//tablero por defecto
var posicion_naves = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// genera posiciones de las naves en el tablero
while (nro_naves > 0) {

    posicion_navesx = Math.floor(Math.random() * (10 - 0));
    posicion_navesy = Math.floor(Math.random() * (10 - 0));

    //valida si la casilla se encuentra vacia
    if (posicion_naves[posicion_navesy][posicion_navesx] != 0) {
        continue
    } else {
        posicion_naves[posicion_navesy][posicion_navesx] = 1;
        nro_naves--;
    }

}

//Evento click
contenedor_tablero.addEventListener('click', dispararTorpedo, false);


function dispararTorpedo(e) {
    if (e.target !== e.currentTarget) {

        //descompone el id creado en la linea 20 en coordendas 
        //ejemplo: "b01" = "01"
        var fila = e.target.id.substring(1, 2);// "0" Primer numero obtenido 
        var columna = e.target.id.substring(2, 3);// "1" Segundo numero obtenido 

        //Valida si el juego termino
        if (intento != 0 && marcador !=17) {
            
            //valida si la posicion donde ataco no hay una nave
            if (posicion_naves[fila][columna] == 0) {

                e.target.style.background = 'transparent';
                e.target.style.color = 'green';
                e.target.style.border = '1px solid rgba(171, 235, 198,0.5)';
                e.target.classList.add('fas');
                e.target.classList.add('fa-ship');

                intento--;
                posicion_naves[fila][columna] = 2; //nuevo valo de la posicion
            
               //valida si la posicion donde ataco hay una nave
            } else if (posicion_naves[fila][columna] == 1) {
                e.target.style.background = 'transparent';
                e.target.style.color = 'red';
                e.target.style.border = '1px solid rgba(255, 0, 0, 0.5)';
                e.target.classList.add('fas');
                e.target.classList.add('fa-ship');                
                posicion_naves[fila][columna] = 2;

                intento--;
                marcador++; //aumento del marcador
                puntos.innerHTML = "Naves Destruidas: " + marcador; //actualiza del marcador
            
                //valida si ya ataco en esa posicion
            } else if (posicion_naves[fila][columna] > 1) {

                alert('Ya atacaste en esta posicion');

            }

            intentos.innerHTML = 'Intentos Restantes: '+ intento; //actualiza el marcador de intentos
            
            //valida si acabaron los intentos
        }else if(intento == 0){

            alert('Termino el juego');
            alert('Total de Naves Destruidas = '+ marcador)

        //valida si ganó el juego
        }else if (marcador == 17) {

            alert('Ganaste!! Destruiste todas las naves');

        }
    }e.stopPropagation();
    
}