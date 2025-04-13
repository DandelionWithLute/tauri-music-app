import "./App.css";
import { useEffect, useRef, useState } from "react";
import { readDir, BaseDirectory, DirEntry } from "@tauri-apps/plugin-fs";
import { dataDir, desktopDir } from "@tauri-apps/api/path";
import { platform } from "@tauri-apps/plugin-os";
import { AnimatePresence, motion } from "motion/react";
import Folder from "./Folder";
import {
  File,
  FileSymlink,
  FolderClosed,
  FolderOpen,
  FolderSearch,
  FolderSymlink,
} from "lucide-react";

function App() {
  // tauriInitialization
  // https://v2.tauri.app/plugin/file-system/#scopes
  const [AppDataDir, setAppDataDir] = useState("");
  const [ReadDir, setReadDir] = useState<DirEntry[]>();
  // sth else...
  const [currentDir, setCurrentDir] = useState("");
  const [currentSection, setCurrentSection] = useState("folder");
  // ref
  const currentDirRef = useRef<HTMLInputElement>(null);

  const currentPlatform = platform();

  async function tauriInitialization() {
    const desktopPath = await desktopDir();
    console.log(desktopPath);
    setCurrentDir(desktopPath);
    if (currentDirRef.current) currentDirRef.current.value = desktopPath;
    setReadDir(await fetchDir(desktopPath));
    console.log(await fetchDir(desktopPath));
  }

  async function fetchDir(val: string) {
    return await readDir(val, {
      baseDir: BaseDirectory.AppLocalData,
    });
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
          <Folder
            currentDirRef={currentDirRef}
            ReadDir={ReadDir}
            currentPlatform={currentPlatform}
          />
        )}
        {currentSection == "notes" && <motion.div>123</motion.div>}
      </AnimatePresence>
      {/* Absolute Bottom Bar */}
    </div>
  );
}

export default App;
