import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "./Coordinate.css";

function Coordinate() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="number-container">
      <h3>Chapter 3. 좌표 평면과 그래프</h3>
      <div className="pdf-book-viewer">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl="/chapter3.pdf"
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
      </div>
    </div>
  );
}

export default Coordinate;