"use client";
import { useRef, useState } from "react";

import { toPng, toJpeg } from "html-to-image";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [text, setText] = useState("");
  const [imageFormat, setImageFormat] = useState("png");
  const [imageWidth, setImageWidth] = useState(400);
  const [imageHeight, setImageHeight] = useState(300);
  const cardRef = useRef(null);

  const handleImageWidthChange = (e) => {
    setImageWidth(e.target.value);
  };

  const handleImageHeightChange = (e) => {
    console.log(e);
    setImageHeight(e.target.value);
  };

  const handleImageSizeChange = (value) => {
    console.log(value);
    const [width, height] = value.split("*").map(Number);
    setImageWidth(width);
    setImageHeight(height);
  };

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
        <p>
          imageWidth:{imageWidth},image height:{imageHeight}
        </p>
        <div ref={cardRef} className="bg-black text-white">
          {text || "Preview Text"}
        </div>
        <Textarea value={text} onChange={(e) => setText(e.target.value)}></Textarea>
        <div className="flex rounded-xl border bg-card text-card-foreground shadow p-4 my-4 mx-8">
          <div className="flex-1">
            <Popover>
              <PopoverTrigger>Style</PopoverTrigger>
              <PopoverContent>
                <p>Digest</p>
                <Card></Card>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex-1">
            <Popover>
              <PopoverTrigger>Image Size</PopoverTrigger>
              <PopoverContent>
                <CardTitle>Image Size</CardTitle>
                <CardDescription>Set Image Size</CardDescription>
                <div className="flex items-center gap-4">
                  <Label>Preset:</Label>
                  <Select defaultValue="300*400" onValueChange={handleImageSizeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Image Size"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="300*400">300px * 400px</SelectItem>
                      <SelectItem value="400*500">400px * 500px</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-4 my-2">
                  <Label>Width:</Label>
                  <Input value={imageWidth} onChange={handleImageWidthChange}></Input>
                </div>
                <div className="flex items-center gap-4">
                  <Label>Height:</Label>
                  <Input value={imageHeight} onChange={handleImageHeightChange}></Input>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex-1">
            <Popover>
              <PopoverTrigger>File Format</PopoverTrigger>
              <PopoverContent>
                <Select onValueChange={setImageFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="File Format"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">png</SelectItem>
                    <SelectItem value="jpeg">jpeg</SelectItem>
                  </SelectContent>
                </Select>
              </PopoverContent>
            </Popover>
          </div>
          <Button onClick={exportAsImage}>Export</Button>
        </div>
      </main>
    </div>
  );
}
