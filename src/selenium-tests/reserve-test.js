const { Builder, By, Key, until } = require('selenium-webdriver');
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
    await inputFieldcontra.sendKeys('1234');

    console.log("He metido la contraseña");

    
    let button = await driver.findElement(By.id('Login'));
    await button.click();

    await driver.wait(until.elementLocated(By.id('add-court')), 10000);

    // Crear un conjunto de pistas
    button = await driver.findElement(By.id('add-court'));

    await driver.executeScript("arguments[0].scrollIntoView();", button);
    await driver.sleep(500);

    await button.click();

    let inputFieldname = await driver.findElement(By.id('nombre'));
    await inputFieldname.clear();
    await inputFieldname.sendKeys("Padel Evolution");

    console.log("\nHe metido el nombre del conjunto de pistas");

    
    let inputFieldciudad = await driver.findElement(By.id('ciudad'));
    await inputFieldciudad.clear();
    await inputFieldciudad.sendKeys('Burgos');


    let inputFielddireccion = await driver.findElement(By.id('direccion'));
    await inputFielddireccion.clear();
    await inputFielddireccion.sendKeys("Polígono Industrial Villalonquejar, C. Alfoz de Bricia, 09006 Burgos");


    let inputFieldnumberCourts = await driver.findElement(By.id('numberCourts'));
    await inputFieldnumberCourts.clear();
    await inputFieldnumberCourts.sendKeys(3);


    let inputFieldprecioDeReserva = await driver.findElement(By.id('precioDeReserva'));
    await inputFieldprecioDeReserva.clear();
    await inputFieldprecioDeReserva.sendKeys(12.7);

    let inputFieldprecioPorHoraConLuz = await driver.findElement(By.id('precioPorHoraConLuz'));
    await inputFieldprecioPorHoraConLuz.clear();
    await inputFieldprecioPorHoraConLuz.sendKeys(30);
    
    let inputFieldprecioPorHoraSinLuz = await driver.findElement(By.id('precioPorHoraSinLuz'));
    await inputFieldprecioPorHoraSinLuz.clear();
    await inputFieldprecioPorHoraSinLuz.sendKeys(1);

    let inputFieldhoraActivacionLuz = await driver.findElement(By.id('horaActivacionLuz'));
    await inputFieldhoraActivacionLuz.clear();
    await inputFieldhoraActivacionLuz.sendKeys('21:00');

    let inputFieldhoradeInicio = await driver.findElement(By.id('horadeInicio'));
    await inputFieldhoradeInicio.clear();
    await inputFieldhoradeInicio.sendKeys('9:30');

    let inputFieldhoradeFin = await driver.findElement(By.id('horadeFin'));
    await inputFieldhoradeFin.clear();
    await inputFieldhoradeFin.sendKeys('23:00');

    let inputFieldimagen = await driver.findElement(By.id('imagen'));
    await inputFieldimagen.clear();

    let filePath = path.resolve(__dirname, '../assets/images/padelevolution.png');

    await inputFieldimagen.sendKeys(filePath);


    button = await driver.findElement(By.id('add-pista'));

    await driver.executeScript("arguments[0].scrollIntoView();", button);
    await driver.sleep(500);

    await button.click();

    console.log("He creado el conjunto de pistas");

    await driver.wait(until.urlContains('/dashboard'), 10000);

    await driver.wait(until.elementIsVisible(driver.findElement(By.id('reservapista'))), 10000);
    console.log("He podido crear una pista correctamente");

    button = await driver.findElement(By.id('reservapista'));
    await button.click();

    await driver.wait(until.elementLocated(By.css('.pista-container')), 10000);

    let nombreSetPista = "Padel Evolution";
    let xSetpath = `//h5[contains(text(), '${nombreSetPista}')]/ancestor::div[contains(@class, 'card')]`;

    let pistaSetElement = await driver.findElement(By.xpath(xSetpath));
    await pistaSetElement.click();

    await driver.wait(until.elementIsVisible(driver.findElement(By.id('fecha'))), 10000);
    console.log("He entrado en la reservas");


    let inputFieldFecha = await driver.findElement(By.id('fecha'));
    await inputFieldFecha.clear();
    await inputFieldFecha.sendKeys("10-02-2025");

    await driver.sleep(5000);

    let inputFieldHora = await driver.findElement(By.id('hora'));
    await inputFieldHora.clear();
    await inputFieldHora.sendKeys("11:30");

    await driver.sleep(5000);

    let inputFieldDuracion= await driver.findElement(By.id('duracion'));
    await inputFieldDuracion.clear();
    await inputFieldDuracion.sendKeys(3);

    console.log("✅ Datos para la reserva introducidos correctamente.");

    await driver.sleep(2000);


    let cardElement = await driver.wait(until.elementLocated(By.css('.row .card')), 10000);
    await driver.wait(until.elementIsVisible(cardElement), 10000);

    console.log("Elemento pista encontrado"); // Para depurar

    let isVisible = await cardElement.isDisplayed();
    console.log(`Elemento pista visible: ${isVisible}`); // Verifica si el elemento está visible

    if (isVisible) {
        console.log("Esto sale"); // Asegúrate de que este console.log se muestra si el elemento es visible
    } else {
        console.log("El elemento no es visible");
    }


    let nombrePista = "Pista 1";
    let xpath = `//h5[contains(text(), '${nombrePista}')]/ancestor::div[contains(@class, 'card')]`;

    let pistaElement = await driver.findElement(By.xpath(xpath));

    console.log("He seleccionado la pista para la reserva");

    await driver.sleep(2000);

    // Espera hasta que el botón esté localizado en el DOM
    let reservabutton = await driver.wait(until.elementLocated(By.css('.card .btn-primary')), 10000);

    // Espera hasta que el botón sea visible en la pantalla
    await driver.wait(until.elementIsVisible(reservabutton), 10000);

    // Espera hasta que el botón esté habilitado para hacer clic
    await driver.wait(until.elementIsEnabled(reservabutton), 10000);

    console.log("✅ Botón de selección de pista listo para hacer clic.");

    // Ahora que el botón es visible y está habilitado, hacemos clic
    await reservabutton.click();

    console.log("✅ Botón de selección de pista clicado.");

    console.log("⏳ Esperando a que aparezca la alerta...");
    await driver.wait(until.alertIsPresent(), 20000);



    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();

    console.log("Mensaje del alert:", alertText);

    if (alertText === "Reserva realizada con éxito") {
        console.log("✅ El pop-up muestra el mensaje correcto.");
    } else {
        console.log("❌ El mensaje del pop-up es incorrecto: " + alertText);
    }

    await alert.accept();

  } finally {
    await limpiarBD(driver);
    await driver.quit();
  }
}

async function limpiarBD(driver) {
  await driver.executeScript(() => {
      fetch('http://localhost:8080/api/reserves/delete-all', { method: 'DELETE' });
  });
  console.log("✅ Datos de prueba eliminados.");
}

runTests();