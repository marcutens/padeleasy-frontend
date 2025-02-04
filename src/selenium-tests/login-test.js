const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runTests() {
  let options = new chrome.Options();
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    // Abre la página de tu aplicación Angular
    await driver.get('http://localhost:4200'); // Si tu app está en otro puerto, ajústalo

    // Espera a que el título sea correcto
    await driver.wait(until.titleIs('PadeleasyFrontend'), 5000);

    // Interactúa con un elemento (por ejemplo, un botón)
    let inputField = await driver.findElement(By.id('username'));

    // Borrar el valor actual del input (si es necesario)
    await inputField.clear();

    // Escribir un nuevo valor en el input
    await inputField.sendKeys('Miguel');

    console.log("He metido el usuario");

    await driver.sleep(5000); 
    
    let inputFieldcontra = await driver.findElement(By.id('password'));

    // Borrar el valor actual del input (si es necesario)
    await inputFieldcontra.clear();

    // Escribir un nuevo valor en el input
    await inputFieldcontra.sendKeys('1234');

    console.log("He metido la contraseña")

    await driver.sleep(5000); 
    

    let button = await driver.findElement(By.id('Login'));
    await button.click();

    console.log("He pulsado en el botón de login");

    await driver.wait(until.urlContains('/dashboard'), 10000);
 
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('reservapista'))), 10000);

    console.log("Estoy dentro");

  } finally {
    await driver.quit();
  }
}

runTests();
