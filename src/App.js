import React from "react";
import "./App.scss";
import "./styles/all.scss";
import SearchPage from "./pages/homepage";
import MainPage from "./pages/mainpage";
import { URL_VIDEO } from "./constants";
import useTracking from "./hooks/useTracking";

function App() {
  const urlParameters = React.useMemo(
    () => new URL(document.location.href).searchParams,
    []
  );
  const videoUrl = React.useMemo(() => urlParameters.get(URL_VIDEO), [
    urlParameters,
  ]);

  useTracking();

  return (
    <div className="page-wrapper">
      {videoUrl ? <MainPage /> : <SearchPage />}
    </div>
  );
}

export default App;
