"use client";

import { quillText } from "@/app/_components/QuillTextEditor/quill.const";
import QuillTextEditor from "@/app/_components/QuillTextEditor/QuillTextEditor";
import { useState } from "react";

const PrivacyPolicyPage = () => {
  // const { data: privacy } = useGetPrivacyQuery(undefined);
  const [quillData, setQuillData] = useState("");

  // useEffect(() => {
  //   if (privacy?.success && privacy?.data?.body) {
  //     setQuillData(privacy.data.body);
  //   }
  // }, [privacy]);

  // const [updatePrivacy] = useUpdatePrivacyMutation();

  return (
    <>
      <QuillTextEditor
        title="Privacy Policy"
        quillData={quillData}
        setQuillData={setQuillData}
        updateTextIntoDB={quillText}
      />
    </>
  );
};

export default PrivacyPolicyPage;
