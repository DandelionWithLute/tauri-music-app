import "./App.css";
import { useEffect, useState } from "react";
import { appDataDir } from "@tauri-apps/api/path";

function App() {
  // tauriInitialization
  const [AppDataDir, setAppDataDir] = useState("");
  // sth else...

  async function tauriInitialization() {
    const appDataDirPath = await appDataDir();
    setAppDataDir(appDataDirPath);
  }

  useEffect(() => {
    tauriInitialization();
  }, []);

  return (
    <div>
      <p>123</p>
      {AppDataDir}
    </div>
  );
}

export default App;
