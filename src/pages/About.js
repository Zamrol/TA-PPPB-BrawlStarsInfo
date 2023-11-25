import React, { Fragment } from "react";
import data from "../components/data/data";
import "./About.css";


export default function About() {
  return (
    <>
      {data.map((tentang, index) => (
        <Fragment key={tentang.id}>
          <div className="profile-card" onClick={() => alert(tentang.nama+" aseli " +tentang.alamat)}>
            <div className="content">
              <img src={tentang.imageUrl} alt="" className="photo" />
              <div className="description">
                <p id="nama">{tentang.nama}</p>
                <p id="nim">{tentang.nim}</p>
                <p id="kelompok">{tentang.kelompok}</p>
              </div>
            </div>
          </div>
          {data.length === index + 1 && <div style={{ marginBottom: 80 }} />}
        </Fragment>
      ))}
    </>
  );
}
