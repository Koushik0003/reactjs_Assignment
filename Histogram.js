import React, { useState } from "react";
import Button from "./Button";

const Histogram = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await fetch(
      "https://www.terriblytinytales.com/test.txt"
    );
    const text = await response.text();
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .split(" ")
      .filter((word) => word !== "");
    const wordCount = {};
    words.forEach((word) => {
      if (wordCount[word]) {
        wordCount[word]++;
      } else {
        wordCount[word] = 1;
      }
    });
    const sortedData = Object.entries(wordCount).sort(
      (a, b) => b[1] - a[1]
    );
    setData(sortedData.slice(0, 20));
  };

  return (
    <div>
      <Button onClick={fetchData}>Submit</Button>
      {data && (
        <div>
          <h2>Top 20 most occurring words</h2>
          <table>
            <thead>
              <tr>
                <th>Word</th>
                <th>Frequency</th>
              </tr>
            </thead>
            <tbody>
              {data.map(([word, count]) => (
                <tr key={word}>
                  <td>{word}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            onClick={() => {
              const csvData = "data:text/csv;charset=utf-8," + data.map(([word, count]) => `${word},${count}`).join("\n");
              const encodedUri = encodeURI(csvData);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "histogram.csv");
              document.body.appendChild(link);
              link.click();
            }}
          >
            Export
          </Button>
        </div>
      )}
    </div>
  );
};
