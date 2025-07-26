"use client";

import { quillText } from "@/app/_components/QuillTextEditor/quill.const";
import QuillTextEditor from "@/app/_components/QuillTextEditor/QuillTextEditor";
import { useState } from "react";

const TermsCondition = () => {
  // const { data: quillDataText, isLoading } = useGetTermsQuery(undefined);
  const [quillData, setQuillData] = useState("");

  // useEffect(() => {
  //   if (quillDataText?.success && quillDataText?.data?.body) {
  //     setQuillData(quillDataText.data.body);
  //   }
  // }, [quillDataText]);

  // const [updateTerms] = useUpdateTermsMutation();

  return (
    <>
      <QuillTextEditor
        title="Terms & Conditions"
        quillData={quillData}
        setQuillData={setQuillData}
        updateTextIntoDB={quillText}
      />
    </>
  );
};

export default TermsCondition;
