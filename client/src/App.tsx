import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import extractPDF from "./apis/extractPDF";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const [isExtractSuccess, setIsExtractSuccess] = useState<boolean>(false);
  const [downloadURL, setDownloadURL] = useState<string>("");
  const { mutateAsync: extractPDFAction, isPending } = useMutation({
    mutationFn: extractPDF,
    onMutate: () => {
      console.log("Extracting PDF ⌛");
    },
    onSuccess: (data) => {
      console.log("Success to Extract PDF ✅", data);
      setIsExtractSuccess(true);
      setDownloadURL(`http://${data?.data?.downloadURL}`);
    },
    onError: (error) => {
      console.log("Failed to Extract PDF ⛔", error);
      setIsExtractSuccess(false);
    },
  });

  const handleExtractPDF = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile!);

    await extractPDFAction({
      formData: formData,
    });
  };

  const handleDownloadPDF = () => {
    if (downloadURL) {
      const link = document.createElement("a");
      link.href = downloadURL;
      link.download = "extracted-file.pdf";
      link.click();
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setIsExtractSuccess(false);
    setDownloadURL("");
    const fileInput = document.getElementById("pdf") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <>
      <section className="custom__container fixed left-0 top-0 z-10 flex h-full items-center justify-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          className="flex h-auto w-full items-center justify-center rounded-[20px] bg-[#E4E4E3] p-[1px] shadow-[0_8px_10px_0_rgba(0,0,0,0.1)] backdrop-blur-md lg:w-fit lg:rounded-[1.450vw] lg:p-[0.130vw] lg:shadow-[-0.150vw_0.361vw_1.807vw_0_rgba(0,0,0,0.1)] dark:bg-white/[8%] dark:shadow-none"
        >
          <div className="h-fit w-full flex-col items-center justify-start overflow-hidden rounded-[19.5px] bg-[#F8F6F5] lg:w-[27.086vw] lg:max-w-none lg:rounded-[1.333vw] dark:bg-[#1B202A]">
            <div className="flex h-auto w-full items-center justify-center rounded-b-[20px] bg-[#E4E4E3] pb-[1px] backdrop-blur-md lg:rounded-b-[1.450vw] lg:pb-[0.130vw] dark:bg-white/[8%]">
              <div className="flex w-full flex-col items-center justify-center gap-y-7 rounded-b-[19.5px] rounded-t-[21px] bg-white px-6 py-6 lg:gap-y-[1.807vw] lg:rounded-b-[1.560vw] lg:rounded-t-[1.300vw] lg:px-[1.445vw] lg:py-[1.445vw] dark:bg-[#0D111D]">
                <div className="flex w-full flex-col gap-y-7 lg:gap-y-[1.807vw]">
                  <div className="flex w-full flex-col items-center gap-y-6 lg:gap-y-[1vw]">
                    <img
                      src="/pdf.png"
                      alt="PDF"
                      className="h-[88px] w-[88px] lg:h-[4.7vw] lg:w-[4.7vw]"
                    />
                    <div className="flex w-full flex-col items-center justify-center gap-y-1 lg:gap-y-[0.361vw]">
                      <h3 className="text-center text-[24px] font-bold text-[#041815] lg:text-[1.445vw] dark:text-white">
                        PDF Extractor
                      </h3>
                      <div className="w-full">
                        <label
                          htmlFor="pdf"
                          className="my-3 block w-full cursor-pointer rounded-lg border border-dashed border-white/60 py-8 text-center text-base text-white lg:my-[0.8vw] lg:py-[2vw] lg:text-[1.084vw]"
                        >
                          {selectedFile === null
                            ? "Upload your file here"
                            : selectedFile?.name}
                        </label>
                        <input
                          id="pdf"
                          type="file"
                          onChange={handleFileChange}
                          className="mx-auto hidden text-white"
                        />
                      </div>
                      <span className="text-center text-sm text-[#041815]/60 lg:text-[0.903vw] lg:leading-[1.3vw] dark:text-white/60">
                        It will extract text from your pdf file into specific
                        format.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* B. Button & Footer */}
            <div className="relative flex h-auto w-full items-center justify-center">
              <div className="flex w-full flex-col items-center gap-y-5 px-6 py-6 lg:gap-y-[1.445vw] lg:px-[1.463vw] lg:py-[1.463vw]">
                <button
                  onClick={handleExtractPDF}
                  disabled={selectedFile === null || isPending}
                  className="flex h-[56px] w-full cursor-pointer items-center justify-center gap-x-2 overflow-hidden rounded-[10px] bg-[#3C67ED] shadow-[0_4px_8px_0_rgba(0,0,0,0.28)] duration-300 hover:bg-[#3158cd] disabled:cursor-not-allowed disabled:opacity-20 lg:h-[3.250vw] lg:rounded-[0.542vw] lg:shadow-[0_0.143vw_0.368vw_0_rgba(0,0,0,0.28)]"
                >
                  {isPending ? (
                    <span className="animate-pulse text-base font-bold text-white lg:text-[0.903vw]">
                      Loading...
                    </span>
                  ) : (
                    <span className="text-base font-bold text-white lg:text-[0.903vw]">
                      Extract PDF
                    </span>
                  )}
                </button>
                <div className="flex items-center justify-center gap-x-2 lg:gap-x-[0.260vw]">
                  <span className="text-xs text-[#041815] lg:text-[0.728vw] dark:text-white/60">
                    made by
                  </span>
                  <div className="flex items-center gap-x-1 lg:gap-x-[0.195vw]">
                    <h1 className="mt-0.5 text-[14.25px] font-bold text-black lg:mt-[0.065vw] lg:text-[0.780vw] dark:text-white">
                      Bradley Ganap
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pop Up Modal */}
      <AnimatePresence>
        {isExtractSuccess && (
          <>
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed left-0 top-0 z-[100] h-full w-full bg-[#0D111D]/[90%] backdrop-blur-sm lg:backdrop-blur-[0.195vw]"
            ></motion.section>
            <section className="custom__container fixed left-0 top-0 z-[200] flex h-full items-center justify-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="flex h-auto w-full items-center justify-center rounded-[20px] bg-[#E4E4E3] p-[1px] shadow-[0_8px_10px_0_rgba(0,0,0,0.1)] backdrop-blur-md lg:w-fit lg:rounded-[1.450vw] lg:p-[0.130vw] lg:shadow-[-0.150vw_0.361vw_1.807vw_0_rgba(0,0,0,0.1)] dark:bg-white/[8%] dark:shadow-none"
              >
                <div className="h-fit w-full flex-col items-center justify-start overflow-hidden rounded-[19.5px] bg-[#F8F6F5] lg:w-[27.086vw] lg:max-w-none lg:rounded-[1.333vw] dark:bg-[#1B202A]">
                  <div className="flex h-auto w-full items-center justify-center rounded-b-[20px] bg-[#E4E4E3] pb-[1px] backdrop-blur-md lg:rounded-b-[1.450vw] lg:pb-[0.130vw] dark:bg-white/[8%]">
                    <div className="flex w-full flex-col items-center justify-center gap-y-7 rounded-b-[19.5px] rounded-t-[21px] bg-white px-6 py-6 lg:gap-y-[1.807vw] lg:rounded-b-[1.560vw] lg:rounded-t-[1.300vw] lg:px-[1.445vw] lg:py-[1.445vw] dark:bg-[#0D111D]">
                      <div className="flex w-full flex-col gap-y-7 lg:gap-y-[1.807vw]">
                        <div className="flex w-full flex-col items-center gap-y-6 lg:gap-y-[1vw]">
                          <img
                            src="/success-icon.png"
                            alt="Success"
                            className="h-[88px] w-[88px] animate-pulse lg:h-[4.7vw] lg:w-[4.7vw]"
                          />
                          <div className="flex w-full flex-col items-center justify-center gap-y-1 lg:gap-y-[0.361vw]">
                            <h3 className="text-center text-[24px] font-bold text-[#041815] lg:text-[1.445vw] dark:text-white">
                              Extract Success
                            </h3>
                            <span className="text-center text-sm text-[#041815]/60 lg:text-[0.903vw] lg:leading-[1.3vw] dark:text-white/60">
                              You can download your file.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* B. Button & Footer */}
                  <div className="relative flex h-auto w-full items-center justify-center">
                    <div className="flex w-full flex-col items-center gap-y-5 px-6 py-6 lg:gap-y-[1.445vw] lg:px-[1.463vw] lg:py-[1.463vw]">
                      <button
                        onClick={handleDownloadPDF}
                        className="flex h-[56px] w-full cursor-pointer items-center justify-center gap-x-2 overflow-hidden rounded-[10px] bg-[#3C67ED] shadow-[0_4px_8px_0_rgba(0,0,0,0.28)] duration-300 hover:bg-[#3158cd] disabled:cursor-not-allowed disabled:opacity-20 lg:h-[3.250vw] lg:rounded-[0.542vw] lg:shadow-[0_0.143vw_0.368vw_0_rgba(0,0,0,0.28)]"
                      >
                        <span className="text-base font-bold text-white lg:text-[0.903vw]">
                          Download Extracted PDF
                        </span>
                      </button>
                      <button
                        onClick={reset}
                        className="flex h-[56px] w-full cursor-pointer items-center justify-center gap-x-2 overflow-hidden rounded-[10px] bg-red-500 duration-300 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-20 lg:h-[3.250vw] lg:rounded-[0.542vw] lg:shadow-[0_0.143vw_0.368vw_0_rgba(0,0,0,0.28)]"
                      >
                        <span className="text-base font-bold text-white lg:text-[0.903vw]">
                          Reset
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
