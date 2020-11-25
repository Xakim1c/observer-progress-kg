import React, { useEffect, useState, Fragment } from "react";
import Tabletop from "tabletop";

export default function Test() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Tabletop.init({
      key: 'https://docs.google.com/spreadsheets/d/1mpsk4sFCmNi96xuSNT0FsazpAx15tgSM3hqEB4kvVQk/edit?usp=sharing',
      simpleSheet: true
    })
      .then((data) => setData(data))
      .catch((err) => console.warn(err));
  }, []);

  console.log(data)
  return (
    <>
      <h1>data from google sheets</h1>
      <ul>
        {data.map((item, i) => (
          <Fragment key={i}>
            <li>URL -- {item['Всего необходимо']}</li>
            <li>Email - {item.Current}</li>
            <br />
          </Fragment>
        ))}
      </ul>
    </>
  );
}