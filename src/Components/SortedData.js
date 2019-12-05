import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
export const SortedData = props => {
  const [sortedData, setSortedData] = useState(null);

  function Less(firstString, secondString) {
    for (
      let i = firstString.length - 1, j = secondString.length - 1;
      i >= 0;
      i--, j--
    ) {
      if (firstString[i] === ",") {
        break;
      }
      if (firstString[i] !== "-") {
        if (firstString[i] < secondString[j]) {
          return true;
        } else if (firstString[i] > secondString[j]) {
          return false;
        }
      }
    }
    return false;
  }
  const DownloadFile = () => {
    let output = "";
    sortedData.forEach(data => (output += data + "\r\n"));
    let blob = new Blob([output], { type: "text/plain/charset=utf-8" });
    saveAs(blob, "output.csv");
  };

  useEffect(() => {
    function MergeSort(array) {
      if (array.length <= 1) {
        return array;
      }
      let mid = Math.floor(array.length / 2);
      let a = MergeSort(array.slice(0, mid));
      let b = MergeSort(array.slice(mid));

      let result = [];

      let indexA = 0;
      let indexB = 0;

      while (indexA < a.length && indexB < b.length) {
        let firstString = a[indexA];
        let secondString = b[indexB];

        if (Less(firstString, secondString)) {
          result.push(firstString);
          indexA += 1;
        } else {
          result.push(secondString);
          indexB += 1;
        }
      }

      while (indexA < a.length) {
        result.push(a[indexA]);
        indexA += 1;
      }
      while (indexB < b.length) {
        result.push(b[indexB]);
        indexB += 1;
      }
      return result;
    }
    if (props.users) {
      let array = props.users;
      setSortedData(MergeSort(array));
    }
  }, [props.users]);

  return (
    <div className="container">
      <h2 className="title">Sorted data</h2>
      <hr />
      <div className="data-container">
        <div className="unsorted-data">
          <h3>Unsorted data</h3>
          {props.users ? (
            <ul className="list">
              {props.users.map((user, idx) => (
                <li key={idx}>{user}</li>
              ))}
            </ul>
          ) : null}
        </div>

        {sortedData ? (
          <div className="sorted-data">
            <h3>Your data</h3>
            <ul className="list">
              {sortedData.map((user, idx) => (
                <li key={idx}>{user}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      {sortedData ? (
        <button className="download-btn" onClick={DownloadFile}>
          Descargar csv
        </button>
      ) : null}
    </div>
  );
};
