"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { Frame } from "react95";

import { Button } from "@/components/button";
import { TextInput } from "@/components/text-input";

import { input, inputWrapper, previewContainer, svgImg } from "./index.css";

const SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_API_HOST;

export const ExtractSVGContent = () => {
  const params = useParams();
  const EXTRACT_SVG_URL = `${SERVER_DOMAIN}/widget/guestbook/${params["user-name"]}/basic.svg`;
  return (
    <>
      <div className={inputWrapper}>
        <TextInput
          variant="flat"
          multiline
          readOnly
          className={input}
          value={EXTRACT_SVG_URL}
        />
        <Button
          onClick={() => {
            navigator.clipboard.writeText(EXTRACT_SVG_URL);
          }}
        >
          Copy
        </Button>
      </div>
      <div className={previewContainer}>
        <Frame>
          <img src={EXTRACT_SVG_URL} alt="preview" className={svgImg} />
        </Frame>
      </div>
    </>
  );
};
