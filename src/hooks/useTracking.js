import React from "react";
import { postData } from "../utils/api";
import { USER_FLAG } from "../constants";

function useTracking(props) {
  React.useEffect(() => {
    let newUser =localStorage.getItem(USER_FLAG) ? false : true;

    const id = process.env.REACT_APP_ID;
    const key = process.env.REACT_APP_KEY;
    const viewsTable = process.env.REACT_APP_VIEWS_TABLE;
    const visitorsTable = process.env.REACT_APP_VISITORS_TABLE;

    if (id && key && viewsTable)
      postData(`https://api.backendless.com/${id}/${key}/data/${viewsTable}`, {
        message: "Hi! :)",
      })
    //   .then((data) => {
    //     console.log("data", data); // JSON data parsed by `data.json()` call
    //   });

    if (newUser && id && key && visitorsTable)
      postData(
        `https://api.backendless.com/${id}/${key}/data/${visitorsTable}`,
        {
          message: "Hi! :)",
        }
      ).then(() => {
        localStorage.setItem(USER_FLAG, "Hi! :)");
      });
  }, []);
}

export default useTracking;
