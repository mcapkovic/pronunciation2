import React from "react";
import "./App.scss";
import "./styles/all.scss";
import SearchPage from "./pages/homepage";
import MainPage from "./pages/mainpage";
import { URL_VIDEO } from "./constants";
// import useTracking from "./hooks/useTracking";
import { getBrowserName } from "./utils/generalUtils";

function App() {
  const urlParameters = React.useMemo(
    () => new URL(document.location.href).searchParams,
    []
  );
  const videoUrl = React.useMemo(() => urlParameters.get(URL_VIDEO), [
    urlParameters,
  ]);

  const browser = React.useMemo(getBrowserName, []);

  // useTracking();

  return (
    <div className={"page-wrapper " + browser}>
      {videoUrl ? <MainPage /> : <SearchPage />}
    </div>
  );
}

export default App;
