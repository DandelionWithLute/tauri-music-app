import "./App.css";
import { useEffect, useState } from "react";
import { appDataDir } from "@tauri-apps/api/path";
import { readDir, BaseDirectory } from "@tauri-apps/plugin-fs";
import { dataDir } from "@tauri-apps/api/path";
import { AnimatePresence, motion } from "motion/react";
import { FolderClosed, FolderOpen } from "lucide-react";

function App() {
  // tauriInitialization
  // https://v2.tauri.app/plugin/file-system/#scopes
  const [AppDataDir, setAppDataDir] = useState("");
  const [ReadDir, setReadDir] = useState("");
  const [DataDir, setDataDir] = useState("");
  // sth else...
  const [currentDir, setCurrentDir] = useState("");
  const [currentSection, setCurrentSection] = useState("folder");

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
    <div className="flex w-full h-screen font-wk-md">
      <div className="opacity-80 bg-img-5 absolute w-full h-full -z-50"></div>
      <div className="absolute w-full h-full -z-40 bg-gradient-to-br from-zinc-50 to-red-50 opacity-5"></div>
      {/* Left Bar */}
      <div className="h-full min-w-[200px] relative">
        <div className="absolute w-full h-full -z-30 bg-slate-50 opacity-80"></div>
        <div className="flex flex-col w-full h-full gap-3 p-5">
          <div
            onClick={() => {
              currentSection == "folder"
                ? setCurrentSection("")
                : setCurrentSection("folder");
            }}
            className={`h-12 z-0 relative flex gap-3 items-center px-3 ${
              currentSection == "folder"
                ? "border-2 border-slate-800"
                : "border"
            } border-slate-300 rounded-md bg-slate-50 cursor-pointer select-none hover:bg-gray-200`}
          >
            {currentSection == "folder" ? <FolderOpen /> : <FolderClosed />}
            <div>文件夹</div>
            {/* <div className="absolute h-full left-0 bg-red-500 rounded-l-md -z-10"></div> */}
          </div>
        </div>
      </div>
      {/* Main Container */}
      <AnimatePresence>
        {currentSection == "folder" && (
          <motion.div
            key="mainContainerBackground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex flex-col relative"
          >
            <div className="absolute w-full h-full bg-white opacity-80 -z-40"></div>
            <div>123456</div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Absolute Bottom Bar */}
    </div>
  );
}

export default App;
