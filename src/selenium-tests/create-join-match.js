const { Builder, By, Key, until } = require('selenium-webdriver');
const { Select } = require('selenium-webdriver/lib/select');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');

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

    
    let inputFieldcontra = await driver.findElement(By.id('password'));

    // Borrar el valor actual del input (si es necesario)
    await inputFieldcontra.clear();

    // Escribir un nuevo valor en el input
    await inputFieldcontra.sendKeys('G7#mXq!29vP');

    console.log("He metido la contraseña");

    
    let button = await driver.findElement(By.id('Login'));
    await button.click();

    console.log("He pulsado en el botón de login");

    await driver.wait(until.urlContains('/dashboard'), 10000);
 
    button = await driver.findElement(By.id('crearpartido'));

    await button.click();

    let inputFieldFecha = await driver.findElement(By.id('fecha'));
    await inputFieldFecha.clear();
    await inputFieldFecha.sendKeys("10-02-2025");

    await driver.sleep(5000);

    let inputFieldHora = await driver.findElement(By.id('hora'));
    await inputFieldHora.clear();
    await inputFieldHora.sendKeys("11:30");

    let dropdown = await driver.findElement(By.id('pista'));
    let select = new Select(dropdown);

    // Esperar a que las opciones se carguen si es necesario
    await driver.wait(until.elementIsVisible(dropdown), 10000);

    // Seleccionar una opción por valor
    await select.selectByVisibleText('Pádel Rex - Pista 1');

    button = await driver.findElement(By.id('crear-partido'));
    await button.click();

    await driver.wait(until.urlContains('/match-list'), 10000);

    console.log("✅ He podido crear un partido.");


    button = await driver.findElement(By.id('log-out'));
    await button.click();


    // Interactúa con un elemento (por ejemplo, un botón)
    inputField = await driver.findElement(By.id('username'));

    // Borrar el valor actual del input (si es necesario)
    await inputField.clear();

    // Escribir un nuevo valor en el input
    await inputField.sendKeys('Paco');

    console.log("He metido el usuario");

    
    inputFieldcontra = await driver.findElement(By.id('password'));

    // Borrar el valor actual del input (si es necesario)
    await inputFieldcontra.clear();

    // Escribir un nuevo valor en el input
    await inputFieldcontra.sendKeys('1234');

    console.log("He metido la contraseña");

    
    button = await driver.findElement(By.id('Login'));
    await button.click();

    console.log("He pulsado en el botón de login");

    await driver.wait(until.urlContains('/dashboard'), 10000);

    button = await driver.findElement(By.id('unirse-partido'));

    await button.click();

    console.log("Estoy en la parte de unirme a un partido");

    await driver.sleep(10000);

    await driver.wait(until.elementLocated(By.id('match-table')), 10000);

    const botonUnirse = await driver.wait(until.elementLocated(By.xpath('//*[@id="match-table"]/tbody/tr[1]/td/button[1]')), 10000);

    // Esperar a que el botón sea visible y hacer clic
    await driver.wait(until.elementIsVisible(botonUnirse), 10000);
    await botonUnirse.click();

    console.log("✅ He conseguido unirme al partido");


  } finally {
        await driver.quit();
    }
}
  
runTests();