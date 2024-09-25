import axios from "axios";

interface ExtractPDFProps {
  formData: FormData;
}

const extractPDF = async (props: ExtractPDFProps) => {
  const { formData } = props;

  const { data } = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/extract-pdf`,
    formData,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
};

export default extractPDF;
