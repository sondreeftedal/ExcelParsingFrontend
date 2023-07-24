import { json } from "react-router-dom"

const apiUrl = process.env.REACT_APP_API_URL

export async function sendDataToDatabase(data){
    try{
        console.log("Function called with data" + JSON.stringify(data))
        const response = await fetch(`${apiUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the Content-Type header to JSON
              },
            body : JSON.stringify({
                betalingsMåte: data.Betalingsmåte,
                bookingNummer: data.BookingNr,
                kundePris: data.Kundepris,
                kundePrisEksMva: 0,
                løyve: data.Løyve,
                løyveHaver: data.Løyvehaver,
                mvaSats: 0,
                organisasjonsNummer: "",
                refundert: data.Refundert,
                sjåfør: data.Sjåfør,
                sjåførNummer: data.SjåførNr,
                status: data.Status,
                tidspunkt: data.Tidspunkt
            })
        })
        console.log(apiUrl)
        if(!response.ok){
            throw new Error("There is an error with the data")
          }
        const responseData = await response.json()
        return responseData
        
    }
    catch(error){
        return error.message
    }
}