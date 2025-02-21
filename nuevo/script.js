let nombre="Tanjiro"
let anime="kimetsu no yaiba"
let edad="16"




let personaje = {
    nombre: "Tanjiro",
    anime: "Kimetsu no yaiba",
    edad: 16,

};
/*
console.log(personaje.nombre);
console.log(personaje.anime);
console.log(personaje.edad);
*/
delete personaje.nombre;
console.log(personaje);

duplicarNumero(10)

function duplicarNumero(num){
return num*3;
}

console.log(duplicarNumero(10));

invertirCadenas("Hola Mundo");

function invertirCadenas(str){
    return str.split("").reverse().join("");
}

console.log(invertirCadenas("Hola Mundo"));


let suma=1+2+3+4+5+6+7+8+9+10;
console.log("LA SUMA DE LOS 10 PRIMEROS NUMEROS ES:",suma);

let base=30;
let altura=10;

let resultado=(base*altura/5);
console.log("el resultado es:",resultado);


let lado=23;
let volumen=(lado*lado*lado);
console.log("el volumen es:",volumen);



//perimetro//
let largo=10;
let ancho=5;

let total=2*(largo+ancho);
console.log("el perimetro viene a ser",total);

let num1=10;
let num2=20;
let num3=30;
let num4=50;

let result=(num1+num2+num3+num4)/4;

console.log("El promedio de los cuatro numeros viene a ser:",result);

//grados celcius a grados fahnhriet//
let celcius=30;
let fahnhriet=(celcius*9/5)+32;

console.log( "en grados fahnreihriet es:",fahnhriet);

let number1=20;
let number2=10;

let adicion=( number1+number2);
let resta=(number1-number2);
let multiplicacion=(number1*number2);
let division=(number1/number2);

console.log("suma",adicion);
console.log("resta",resta);
console.log("multiplicacion",multiplicacion);
console.log("division",division);

function celciusAFahrenheit(celcius){
    return (celcius*9/5)+32;
}

function celciusAKelvin(celcius){
    return(celcius+273.15);
}

function fahnhrietACelsius(fahnhriet){
    return(fahnhriet-32)*5/9;
}

function fahnhrietAKelvin(fahnhriet){
    return(fahnhriet-32)*5/9+273.15;
}

function kelvinACelcius(kelvin){
    return(kelvin-273.15);
}

function kelvinAFahnhriet(kelvin){
    return(kelvin-273.15)*9/5+32;
}
//nse pq no lo pinta pero xd//
let celsius=10;

let fahnrie=9;

let kelvin=6;

console.log(celsius + "°C = " + celsiusAFahrenheit(celsius) + "°F");
console.log();
console.log();
console.log();
console.log();
console.log();


let numer=2;
if (numer>=3);{
console.log("Es mayor igual a",numer);
}
else {
    console.log("XDDD")
}

