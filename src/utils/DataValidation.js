import { read, writeFileXLSX, utils } from "xlsx";
export async function parseExcelToJson(file) {       
    const data = await file.arrayBuffer()
    const wb = read(data); // parse the array buffer
    const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
    const jsonData = utils.sheet_to_json(ws); // generate objects
    jsonData.forEach(item => {
        item.Kundepris = priceFormat(item.Kundepris);
        item.Tidspunkt = formatDate();
    })
    
    console.log(jsonData);
    return jsonData;
}
  


    //Funksjon for å formattere prisen slik at den kan bli sendt inn til databasen.
    function priceFormat(price)
    {
    
    // Fjern mellomrom og erstatt desimalsymbol med punktum
    const formattedPrice = price.toString().replace(/,/g, "").replace(/\s/g, ".");
    
    //Gjør prisen til desimaltall
    const decimalPrice = parseFloat(formattedPrice);

    //Sjekker at inputen er et gyldig tall
    if(isNaN(decimalPrice)){
        return null;
    }
    return decimalPrice;
    }

    function formatDate(){
        const newDate = new Date();
        console.log(newDate);
        return newDate.toISOString();
    }

    export function validateRegistrationNumber(registrationNumber)
    {
        //Regex for registreringsnummer
        const registrationNumberRegex = /^[A-Z]{2}\d{5}$/;
        //Test regex
        const result = registrationNumberRegex.test(registrationNumber);

        return result
    }

    export function validateLøyve(løyveNummer){
        const løyveRegex = /^[A-Z]{2}\d{10}$/
        const løyveWithDashRegex = /^[A-Z]-\d{8}$/
        if(løyveRegex.test(løyveNummer) && løyveWithDashRegex.test(løyveNummer) === false){
            return false
        }
        else{
            return true
        }
    }