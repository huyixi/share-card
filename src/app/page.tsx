"use client"
import { useRef, useState } from 'react'

import * as htmlToImage from 'html-to-image'
import { toPng, toJpeg } from 'html-to-image'

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [text, setText] = useState('')
  const cardRef = useRef(null)

  const exportAsImage = async () => {
    if (cardRef.current === null) {
      return
    }
    try {
      const imageUrl = await toPng(cardRef.current)
      const link = document.createElement('a')
      link.href = imageUrl
      link.download = 'text-card.png'
      link.click()
    } catch (error) {
      console.error("export error", error)
    }
  }

  return (
    <div className="">
      <main className="p-4">
        <h2>Preview</h2>
        <div ref={cardRef}>
          {text || "Preview Text"}
        </div>
        <Textarea value={text} onChange={(e) => setText(e.target.value)}></Textarea>
        <Button onClick={exportAsImage}>Export</Button>
      </main>
    </div>
  );
}
