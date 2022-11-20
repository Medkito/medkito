// @ts-nocheck
import { Button } from "@material-ui/core";
import { PDFExport } from "@progress/kendo-react-pdf";
import dayjs from "dayjs";
import React, { Fragment, useRef } from "react";

function PrescriptionPDFExport({ id, items, pacient, medic, createdAt }) {
  const pdfExportComponent = useRef(null);
  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  };

  const data = dayjs(createdAt).format("DD-MM-YYYY");

  return (
    <Fragment>
      <Button onClick={handleExportWithComponent}>Export</Button>
      <div
        style={{
          position: "absolute",
          left: "-1000px",
          top: 0,
        }}
      >
        <PDFExport
          paperSize="A4"
          margin="1cm"
          fileName={`${id}.pdf`}
          creator={"Medkito"}
          author={"Medkito"}
          ref={pdfExportComponent}
        >
          <div
            style={{
              width: "500px",
            }}
          >
            <p>
              <b>Nume pacient: </b>
              {pacient.name}
            </p>
            <p>
              <b>Varsta pacient: </b>
              {pacient.age ? pacient.age : "-"}
            </p>
            <p>
              <b>Sex: </b>
              {pacient.sex ? pacient.sex : "-"}
            </p>
            <hr />

            {items.map((item) => {
              return (
                <div key={item.medicament.id}>
                  <p>{item.medicament.name}</p>

                  <p style={{ fontSize: 10 }}>Zile: {item.zile}</p>
                  <p style={{ fontSize: 10 }}>Cantitate: {item.cantitate}</p>
                  <p style={{ fontSize: 10 }}>Interval: {item.interval} ore</p>
                </div>
              );
            })}

            <hr />
            <p>
              <b>Nume medic: </b>
              {medic.name}
            </p>
            <p>
              <b>Data: </b>
              {data}
            </p>
            <p>
              <b>Semnatura si parafa medicului: </b>
            </p>
          </div>
        </PDFExport>
      </div>
    </Fragment>
  );
}

export default PrescriptionPDFExport;
