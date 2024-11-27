"use client";
import { useRef, useState } from "react";

import { toPng, toJpeg } from "html-to-image";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Home() {
  const [text, setText] = useState("");
  const [imageFormat, setImageFormat] = useState("png");
  const cardRef = useRef(null);

  const exportAsImage = async () => {
    if (cardRef.current === null) {
      return;
    }
    try {
      let imageUrl;
      if (imageFormat === "png") {
        imageUrl = await toPng(cardRef.current);
      } else if (imageFormat === "jpeg") {
        console.log("image jjjj");
        imageUrl = await toJpeg(cardRef.current);
      } else {
        return;
      }
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `text-card.${imageFormat}`;
      link.click();
    } catch (error) {
      console.error("export error", error);
    }
  };

  return (
    <div className="">
      <main className="p-4">
        <h2>Preview</h2>
        <div ref={cardRef} className="bg-black text-white">
          {text || "Preview Text"}
        </div>
        <Textarea value={text} onChange={(e) => setText(e.target.value)}></Textarea>
        <Button onClick={exportAsImage}>Export</Button>
        <Select onValueChange={setImageFormat}>
          <SelectTrigger>
            <SelectValue placeholder="Image Format"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="png">png</SelectItem>
            <SelectItem value="jpeg">jpeg</SelectItem>
          </SelectContent>
        </Select>
      </main>
    </div>
  );
}
