import "./App.css";
import { useEffect, useState } from "react";
import { appDataDir } from "@tauri-apps/api/path";
import { readDir, BaseDirectory } from "@tauri-apps/plugin-fs";
import { dataDir } from "@tauri-apps/api/path";

function App() {
  // tauriInitialization
  // https://v2.tauri.app/plugin/file-system/#scopes
  const [AppDataDir, setAppDataDir] = useState("");
  const [ReadDir, setReadDir] = useState("");
  const [DataDir, setDataDir] = useState("");
  // sth else...
  const [currentDir, setCurrentDir] = useState("");

  async function tauriInitialization() {
    const appDataDirPath = await appDataDir();
    setAppDataDir(appDataDirPath);
    setCurrentDir(appDataDirPath);
    const entries = await readDir("/", {
      baseDir: BaseDirectory.AppLocalData,
    });
    console.log(entries, BaseDirectory.AppLocalData);

    const dataDirPath = await dataDir();
    setDataDir(dataDirPath);
  }

  useEffect(() => {
    tauriInitialization();
  }, []);

  return (
    <div className="font-wk-md bg-img-1">
      <p>美妙的字体和背景</p>
      <div className="text-red-500">{AppDataDir}</div>
      <div>{ReadDir}</div>
      <div>{DataDir}</div>
    </div>
  );
}

export default App;
