import axios from "../axios/config";

export const upload = async (title: string, file: any) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("file", file);
  console.log(formData);
  const result = await axios.post("upload-files", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  console.log(result);
};
