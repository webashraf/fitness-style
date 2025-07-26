"use client";

import { quillText } from "@/app/_components/QuillTextEditor/quill.const";
import QuillTextEditor from "@/app/_components/QuillTextEditor/QuillTextEditor";

import { useState } from "react";

const AboutUsPage = () => {
  const [quillData, setQuillData] = useState("");

  return (
    <>
      <QuillTextEditor
        title="About Us"
        quillData={quillData}
        setQuillData={setQuillData}
        updateTextIntoDB={quillText}
      />
    </>
  );
};

export default AboutUsPage;
