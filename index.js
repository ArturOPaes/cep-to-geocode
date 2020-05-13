const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

async function getGeoCode() {
  const browser = await puppeteer.launch(); //{ headless: false }
  const page = await browser.newPage();
  const cep = readlineSync.question('Informe um cep: ');
  const qualquerUrl = `https://www.google.com.br/maps/`;
  await page.goto(qualquerUrl);
  await page.evaluate((cep) => {
    document.getElementById("searchboxinput").value = `${cep}`;
    document.getElementById("searchbox-searchbutton").click();
  }, cep);

  await page.waitForNavigation();

  const url = await page.url();

  let aux = url.substr(url.indexOf('@'), url.length);
  
  const lat = aux.substr(1, aux.indexOf(',')-1);
  
  aux = aux.substr(aux.indexOf(',') +1, aux.length);  
  
  const lon = aux.substr(0, aux.indexOf(',')-1);

  console.log('latitude: '+lat);
  console.log('longitude: '+lon);

  await browser.close();
}

getGeoCode();