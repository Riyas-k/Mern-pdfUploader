import axios from "../axios/config";

export const upload = async (title: string, file: any) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    const result = await axios.post("/upload-files", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (result.data.status === "ok") {
      return true;
    } else {
      false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const allData = async () => {
  try {
    const data = await axios.get("/get-files");
    return data.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePdf = async (id: string) => {
  try {
    console.log(id);
    const data = await axios.delete(`/delete-file/${id}`);
    return data.data.status;
  } catch (error) {
    console.log(error);
  }
};
