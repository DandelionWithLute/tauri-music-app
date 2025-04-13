import { File, FileSymlink, FolderSearch, FolderSymlink } from "lucide-react";
import { motion } from "motion/react";
import { Folder as FolderIcon } from "lucide-react";

const Folder = ({ currentDirRef, ReadDir, currentPlatform }: any) => {
  return (
    <motion.div
      key="mainContainerBackground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col relative"
      // p-5 here will make page overflow
    >
      <div className="absolute w-full h-full bg-white opacity-80 -z-40"></div>
      <div className="min-h-20"></div>
      <div className="flex fixed w-[calc(100vw-250px)] ml-5 mt-5">
        <FolderSearch className="absolute top-3 left-3" />
        <input
          ref={currentDirRef}
          className="border rounded-md p-3 pl-12 w-full flex items-center ring-0 outline-none"
        />
      </div>
      <div className="px-5 flex flex-col overflow-y-scroll">
        {/* location bar ctrl+l */}
        <div className="">
          {ReadDir?.map(
            (i: any) =>
              i.isDirectory && (
                <div
                  key={i.name}
                  onClick={() => {
                    if (currentPlatform == "windows") {
                    } else {
                    }
                  }}
                  className="p-3 border rounded-sm flex gap-3 select-none cursor-pointer"
                >
                  {i.isSymlink ? <FolderSymlink /> : <FolderIcon />}
                  {i.name}
                </div>
              )
          )}
          {ReadDir?.map(
            (i: any) =>
              i.isFile && (
                <div
                  key={i.name}
                  className="p-3 border rounded-sm flex gap-3 select-none cursor-pointer"
                >
                  {i.isSymlink ? <FileSymlink /> : <File />}
                  {i.name}
                </div>
              )
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Folder;
