import React, { useState } from "react";
import {
  Form,
  Input,
  Upload,
  Button,
  Space,
  message
} from "antd";
import axios from "axios";
import { PlusOutlined, SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export default function UserForm() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleSend = async (event) => {
    event.preventDefault();
    try {
      const values = await form.validateFields();
      const formData = new FormData();
  
      // Append form data fields
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
  
      // Append files
      fileList.forEach((file) => {
        formData.append("files", file.originFileObj);
      });
  
      // Send POST request
      const result = await axios.post("http://localhost:3000/api/file/addfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log(result.data);
      // Reset form and file list
      form.resetFields();
      setFileList([]);
      message.success("PDF file(s) have been uploaded successfully!");
    } catch (error) {
      console.error("Error uploading PDF file:", error);
      message.error("Failed to upload PDF file. Please try again later.");
    }
  };
  


  const props = {
    name: "files",
    multiple: true,
    fileList,
    onChange(info) {
      setFileList(info.fileList);
    },
    onRemove(file) {
      setFileList((prevList) =>
        prevList.filter((item) => item.uid !== file.uid)
      );
    },
  };

  return (
    <div className="user-form">
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 1200,
        }}
      >
        <Form.Item label="Doc Code" name="Doc_code">
          <Input />
        </Form.Item>

        <Form.Item label="Sender" name="sender">
          <Input />
        </Form.Item>

        <Form.Item label="Recipient" name="recipient">
          <Input />
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Input />
        </Form.Item>

        <Form.Item label="Prioritization" name="prioritization">
          <Input />
        </Form.Item>

        <Form.Item label="Description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload.Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <PlusOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSend}
            >
              Send
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
