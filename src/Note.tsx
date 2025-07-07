import React, { useEffect, useState } from "react";
import { readFile, BaseDirectory } from "@tauri-apps/plugin-fs";

type Props = {};

const Note = (props: Props) => {
  const [vid, setVid] = useState("");
  async function fetchMyVid() {
    const v = await readFile("D:\\jianpianDownload\\无名记忆第二季01.mp4");
    const mynewvideoblob = new Blob([v]);
    const vidUrl = URL.createObjectURL(mynewvideoblob);
    setVid(vidUrl);
  }

  useEffect(() => {
    fetchMyVid();
  }, []);

  return (
    <div>
      Note
      <video src={vid} controls />123{vid}
    </div>
  );
};

export default Note;
