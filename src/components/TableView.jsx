function TableView({data: jsonData}){
    
    
    return(
<>
    <table class="table table-hover table-dark">
        <thead>
            <tr>
              <th>Tidspunkt</th>
              <th>Kundepris</th>
              <th>Løyve</th>
              <th>Løyvehaver</th>
            </tr>
        </thead>
        <tbody>
        {jsonData.map((item) => (
              <tr key={item.BookingNr}>
                <td>{item.Tidspunkt}</td>
                <td>{item.Kundepris} kr</td>
                <td>{item.Løyve}</td>
                <td>{item.Løyvehaver}</td>
              </tr>
            ))}
        </tbody>
    </table>
</>
    )
}
export default TableView