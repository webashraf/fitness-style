"use client";

import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { toast } from "sonner";

const PersonalInfoPage = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://res.cloudinary.com/demo/image/upload/v1698900000/default-profile.jpg"
  );

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "+880123456789",
    },
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const toggleEditMode = () => {
    if (!isDisabled) {
      toast.success("Changes saved (demo only)");
    }
    setIsDisabled(!isDisabled);
  };

  const handleUploadImage = async (info: any) => {
    if (info.file.status === "done") {
      const newImageUrl = URL.createObjectURL(info.file.originFileObj);
      setProfileImage(newImageUrl);
      toast.success(`${info.file.name} uploaded successfully (demo only)`);
    } else if (info.file.status === "error") {
      toast.error(`${info.file.name} upload failed.`);
    }
  };

  const onSubmit = (values: any) => {
    console.log("Submitted Values (demo):", values);
    toast.success("Info updated successfully (demo only)!");
  };

  return (
    <Form
      className="w-[1026px] !pt-5"
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
    >
      <div className="flex items-center justify-between mb-[40px]">
        <span className="flex items-center gap-3 text-[#333333]">
          <Link href="/settings">
            <HiOutlineArrowSmLeft color="#333333" size={30} />
          </Link>
          <h2 className="font-medium">Personal Information</h2>
        </span>
        <Button
          icon={<FaRegEdit size={18} />}
          className="!bg-brand-primary w-[206px] h-[56px]"
          size="large"
          type="primary"
          onClick={toggleEditMode}
          htmlType={!isDisabled ? "submit" : "button"}
        >
          {isDisabled ? "Edit Form" : "Save Changes"}
        </Button>
      </div>
      <div className="flex items-center justify-start gap-10">
        {/* Profile Image Section */}
        <div className="min-w-[300px] h-[365px] bg-[#C4E5CD] border border-[#41AB5D] rounded-lg flex flex-col items-center justify-center">
          <Image
            src={profileImage}
            width={144}
            height={144}
            alt="admin-image"
            className="rounded-full object-cover size-28 mb-3"
          />
          <Upload onChange={handleUploadImage} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          <h3 className="text-[18px] mt-[30px]">Profile</h3>
          <h2 className="capitalize">admin</h2>
        </div>
        {/* Form Fields */}
        <div className="mt-[12px] min-w-[700px]">
          <Form.Item label="Name">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  disabled={isDisabled}
                  style={{
                    backgroundColor: "#C4E5CD",
                    borderColor: "#41AB5D",
                    height: "56px",
                    color: "#000",
                    cursor: isDisabled ? "not-allowed" : "auto",
                  }}
                  placeholder="Enter your name"
                />
              )}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  disabled
                  className="cursor-not-allowed"
                  style={{
                    backgroundColor: "#C4E5CD",
                    borderColor: "#41AB5D",
                    height: "56px",
                    color: "#000",
                    cursor: "not-allowed",
                  }}
                  placeholder="Enter your email"
                />
              )}
            />
          </Form.Item>
          <Form.Item label="Phone Number">
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  disabled={isDisabled}
                  style={{
                    backgroundColor: "#C4E5CD",
                    borderColor: "#41AB5D",
                    height: "56px",
                    color: "#000",
                    cursor: isDisabled ? "not-allowed" : "auto",
                  }}
                  placeholder="Enter your phone number"
                />
              )}
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default PersonalInfoPage;
