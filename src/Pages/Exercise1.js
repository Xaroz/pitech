import React, { useState, useEffect } from "react";
import ReactFileReader from "react-file-reader";
import { SortedData } from "../Components/SortedData";

export const Exercise1 = () => {
  const [file, setFile] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //function to read the file uploaded
  const handleFiles = files => {
    var reader = new FileReader();
    reader.onload = function(e) {
      setFile(reader.result);
    };
    reader.readAsText(files[0]);
  };

  const checkForLetter = result => {
    for (let j = 0; j < result.length; j++) {
      if (result[j] !== "-") {
        if (isNaN(result[j])) {
          setError("There's a letter in the identity card number");
          return;
        }
      }
    }
  };

  useEffect(() => {
    if (file) {
      setAllUsers(file.split("\r\n"));
    }
  }, [file]);

  useEffect(() => {
    //check if csv is in correct format
    const ProcessFile = results => {
      for (let i = 0; i < results.length; i++) {
        let result = results[i].split(",");
        if (
          result.length !== 2 ||
          result[1][3] !== "-" ||
          result[1][11] !== "-" ||
          result[1].length !== 13
        ) {
          setError("Your data in csv is incorrect");
          return;
        }
        checkForLetter(result[1]);
      }
    };

    if (allUsers) {
      setError(null);
      ProcessFile(allUsers);
      setLoading(false);
    }
  }, [allUsers]);

  return (
    <div>
      <div>
        <h1>Ejercicio 1</h1>
        <hr />
        <h2>Selecciona tu archivo csv </h2>
        {/* <input type="file" onChange={ReadFile} accept=".csv" /> */}
        <ReactFileReader handleFiles={handleFiles} fileTypes={".csv"}>
          <button className="upload-btn">Subir archivo</button>
        </ReactFileReader>
      </div>
      <div>
        {loading ? null : error ? (
          <p className="error-msg">{error}</p>
        ) : (
          <SortedData users={allUsers} />
        )}
      </div>
    </div>
  );
};
