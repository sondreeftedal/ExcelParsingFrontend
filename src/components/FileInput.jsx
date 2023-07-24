import { useState } from "react";
import {parseExcelToJson} from "../utils/DataValidation"
import {sendDataToDatabase} from "../api/data"
import FileOutput from "./FileOutput";
import TableView from "./TableView";

const apiUrl = process.env.REACT_APP_API_URL



function FileInput(){
    const [selectedFile,setSelectedFile] = useState(null);
    const [jsonData, setJsonData] = useState(null);
    const[showDownloadFile, setShowDownloadFile] = useState(false);
    const[showTable, setShowTable] = useState(false);

async function handleUpload() {
  //console.log("API URL: "+ apiUrl)
  if (selectedFile) {
    try {
      const jsonData = await parseExcelToJson(selectedFile);
      setJsonData(jsonData);
      setShowTable(true);
      for (const item of jsonData) {
        try {
          const data = await sendDataToDatabase(item);
          console.log(data);
          

        } catch (error) {
          window.alert(error.message);
        }
      }
      window.alert("Data is successfully added to the database");
      setShowDownloadFile(true);
    } catch (error) {
      console.error("Error parsing Excel:", error);
    }
  }
}

    function handleFileChange(event){
        const file = event.target.files[0];
        setSelectedFile(file);
        
    }




    
    
    return(
        <>
        <div class="mb-5">
        <label for="formFile" class="form-label" onChange={handleFileChange}>Velg fil du vil laste opp til databasen</label>
        <input class="form-control" type="file" id="formFile"/>
        <button class="btn btn-dark" onClick={handleUpload}>Last opp</button>
        </div>
        {showTable && <TableView data ={jsonData}/>}
        {showDownloadFile && <FileOutput data={jsonData}/>}
        </>
    );
};
export default FileInput;