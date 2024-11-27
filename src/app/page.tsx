"use client"
import { useRef, useState } from 'react'

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [text, setText] = useState('')
  const cardRef = useRef(null)

  return (
    <div className="">
      <main className="p-4">
        <h2>Preview</h2>
        <div ref={cardRef}>
          {text || "Preview Text"}
        </div>
        <Textarea value={text} onChange={(e) => setText(e.target.value)}></Textarea>
        <Button>Export</Button>
      </main>
    </div>
  );
}
