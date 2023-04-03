// Esta función genera un número de cuenta aleatorio de 6 dígitos
function generateAccount() {
  let number = '';
  // Generamos un dígito aleatorio y lo concatenamos a la cadena de número
  for (let i = 0; i < 6; i++) {
    number += Math.floor(Math.random() * 10);
  }
  // Devolvemos el número generado
  return number;
}

// Exportamos la función para que pueda ser utilizada en otros archivos
module.exports = generateAccount;
