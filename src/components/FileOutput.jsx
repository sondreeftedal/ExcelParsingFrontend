import { useCallback } from 'react';
import { utils, writeFileXLSX } from 'xlsx';

function FileOutput({ data: fileData }) {
  // Remove the useState for 'data' since we are using 'fileData' from props
  function createOutputFile() {
    // Map the fileData and return the mapped array
    const mappedData = fileData.map((item) => ({
      Tidspunkt: item.Tidspunkt,
      Kundepris: item.Kundepris,
      Løyve: item.Løyve,
      Løyvehaver: item.Løyvehaver
    }));

    const ws = utils.json_to_sheet(mappedData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFileXLSX(wb, 'Ridel.xlsx');
  }

  const exportFile = useCallback(createOutputFile, [fileData]); // Use 'fileData' as a dependency

  return (
    <>
      <button class ="btn btn-dark mt-5"onClick={exportFile}>Last ned excel fil</button>
    </>
  );
}

export default FileOutput;