import React from "react";
import "./App.scss";
import "./styles/all.scss";
import SearchPage from "./pages/homepage";
import MainPage from './pages/mainpage';
import { URL_VIDEO } from "./constants";

function App() {
  const urlParameters = React.useMemo(
    () => new URL(document.location.href).searchParams,
    []
  );
  const videoUrl = React.useMemo(() => urlParameters.get(URL_VIDEO), [
    urlParameters,
  ]);

  return (
    <div className="page-wrapper">
      {videoUrl ? <MainPage /> : <SearchPage />}
    </div>
  );
}

export default App;
