// script.js

let sudokuGrid = document.getElementById("sudokuGrid");
let mensaje = document.getElementById("mensaje");
let tiempoSpan = document.getElementById("tiempo");
let intentosSpan = document.getElementById("intentos");

let puzzle = [];
let solucion = [];
let intentosFallidos = 0;
let timer = null;
let tiempo = 0;
let startTime = 0;
let difficulty = 'easy';

// Función para generar el Sudoku
function generarPuzzle() {
  // Detener el cronómetro si estaba corriendo
  if (timer) clearInterval(timer);
  tiempo = 0;
  startTime = Date.now();
  timer = setInterval(actualizarTiempo, 1000);
  intentosFallidos = 0;
  intentosSpan.textContent = intentosFallidos;

  // Crear puzzle según dificultad
  switch (difficulty) {
    case 'easy':
      generarSudoku(36);
      break;
    case 'medium':
      generarSudoku(46);
      break;
    case 'hard':
      generarSudoku(56);
      break;
  }

  generarCuadrícula();
}

// Generar un Sudoku con una cantidad de celdas vacías
function generarSudoku(celdasVacias) {
  // Creamos el tablero vacío de Sudoku
  let base = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];

  // Creamos una copia de la solución del tablero
  solucion = JSON.parse(JSON.stringify(base));

  // Llenar celdas vacías según la dificultad
  puzzle = JSON.parse(JSON.stringify(base));

  let celdasRestantes = celdasVacias;
  while (celdasRestantes > 0) {
    let fila = Math.floor(Math.random() * 9);
    let col = Math.floor(Math.random() * 9);
    if (puzzle[fila][col] !== 0) {
      puzzle[fila][col] = 0;
      celdasRestantes--;
    }
  }
}

// Generar la cuadrícula de Sudoku
function generarCuadrícula() {
  sudokuGrid.innerHTML = "";

  for (let i = 0; i < 81; i++) {
    const input = document.createElement("input");
    input.type = "number";
    input.min = 1;
    input.max = 9;
    input.id = `cell${i}`;
    input.addEventListener("input", validarEntrada);

    const row = Math.floor(i / 9);
    const col = i % 9;
    if (row % 3 === 0 || col % 3 === 0) {
      input.classList.add("bold");
    }

    const valor = puzzle[row][col];
    if (valor !== 0) {
      input.value = valor;
      input.disabled = true; // Celdas predefinidas
    }

    sudokuGrid.appendChild(input);
  }
}

// Actualizar el tiempo en el cronómetro
function actualizarTiempo() {
  tiempo = Math.floor((Date.now() - startTime) / 1000);
  let minutos = Math.floor(tiempo / 60);
  let segundos = tiempo % 60;
  tiempoSpan.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

// Validar la entrada de los jugadores
function validarEntrada(event) {
  const value = event.target.value;
  if (value < 1 || value > 9) {
    event.target.value = '';
  }
}

// Verificar si el Sudoku es válido
function verificarSudoku() {
  const celdas = [];
  let esValido = true;

  for (let i = 0; i < 81; i++) {
    celdas.push(document.getElementById(`cell${i}`).value);
  }

  if (!comprobarFilas(celdas) || !comprobarColumnas(celdas) || !comprobarBloques(celdas)) {
    esValido = false;
  }

  if (esValido && !celdas.includes('')) {
    mensaje.textContent = "¡Sudoku completado correctamente!";
    mensaje.style.color = "green";
  } else if (!esValido) {
    mensaje.textContent = "El Sudoku no es válido. Revisa tus entradas.";
    mensaje.style.color = "red";
  } else {
    mensaje.textContent = "Todavía te falta completar el Sudoku.";
    mensaje.style.color = "orange";
  }
}

// Dar una pista lógica
function darPista() {
  for (let i = 0; i < 81; i++) {
    const input = document.getElementById(`cell${i}`);
    if (!input.value && input.disabled === false) {
      input.value = solucion[Math.floor(i / 9)][i % 9];
      break;
    }
  }
}

// Reiniciar el juego
function reiniciarJuego() {
  clearInterval(timer);
  tiempo = 0;
  tiempoSpan.textContent = "00:00";
  startTime = 0;
  intentosFallidos = 0;
  intentosSpan.textContent = intentosFallidos;
  generarPuzzle();
}

// Comprobar filas
function comprobarFilas(celdas) {
  for (let i = 0; i < 9; i++) {
    let fila = [];
    for (let j = 0; j < 9; j++) {
      fila.push(celdas[i * 9 + j]);
    }
    if (!esValida(fila)) return false;
  }
  return true;
}

// Comprobar columnas
function comprobarColumnas(celdas) {
  for (let i = 0; i < 9; i++) {
    let columna = [];
    for (let j = 0; j < 9; j++) {
      columna.push(celdas[j * 9 + i]);
    }
    if (!esValida(columna)) return false;
  }
  return true;
}

// Comprobar bloques 3x3
function comprobarBloques(celdas) {
  for (let i = 0; i < 9; i++) {
    let bloque = [];
    let filaInicio = Math.floor(i / 3) * 3;
    let colInicio = (i % 3) * 3;
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        bloque.push(celdas[(filaInicio + j) * 9 + colInicio + k]);
      }
    }
    if (!esValida(bloque)) return false;
  }
  return true;
}

// Verificar si una fila, columna o bloque tiene valores duplicados
function esValida(conjunto) {
  const conjuntoSinVacios = conjunto.filter(num => num !== "");
  const conjuntoSinRepetidos = new Set(conjuntoSinVacios);
  return conjuntoSinVacios.length === conjuntoSinRepetidos.size;
}

// Inicializar el juego
generarPuzzle();
