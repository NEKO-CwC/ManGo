const access_Key_Id = "LTAI5t5rPhn5UbdoLLQncn8r";
const access_Key_Secret = "KGJn7jyzCUBbX7wIgCFpVhngQhY7JK";
const role_Arn = "acs:ram::1463793512635270:role/ray";
const bucket_name = "spark-forge";
const stsToken =
  "CAIS5QF1q6Ft5B2yfSjIr5fzCuLClJoV3vaJVk3cgzMUSvtGn5zIrDz2IHhMe3FvBO8XsPQwm21U6fgblqpoV4QdsbEn+mApvPpt6gqET9frma7ctM4p6vCMHWyUFGSIvqv7aPn4S9XwY+qkb0u++AZ43br9c0fJPTXnS+rr76RqddMKRAK1QCNbDdNNXGtYpdQdKGHaOITGUHeooBKJUBQz5Vsn1Dolt//imJLE0HeE0g2mkN1yjp/qP52pY/NrOJpCSNqv1IR0DPGZiHEItEUVpfkm0/MZpWiZ58v2GEVK8/tZumBDc3kFGoABEDUlESGu16pwTcbydyWHzmrGuSr8VebA+TuE+YsFzwQlpuOPmgvp5QGichJK9nTpFba7mDw877EOIf4IfO16RPgolmgEJBwIKXM9GPJokX9slqi0fkh3BLjVASDizQ75wt2iqDq7YBUaJxZupjgRRBCCZqOoiKZrmyyxsz6UNlwgAA==";
const regionId = "oss-cn-hangzhou";
function upload() {
  const client = new OSS({
    region: "oss-cn-hangzhou",
    accessKeyId: access_Key_Id,
    accessKeySecret: access_Key_Secret,
    bucket: bucket_name,
  });

  function readFileContent(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const blob = new Blob([event.target.result]);
        resolve(blob);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }

  function createFileInput() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);
    return fileInput;
  }

  async function put() {
    try {
      const fileInput = createFileInput();

      // Trigger a click event to open the file dialog
      fileInput.click();

      // Wait for the user to select a file
      const fileChangePromise = new Promise((resolve) => {
        fileInput.addEventListener(
          "change",
          () => resolve(fileInput.files[0]),
          { once: true }
        );
      });

      const selectedFile = await fileChangePromise;

      if (!selectedFile) {
        console.error("No file selected");
        return;
      }

      const fileContent = await readFileContent(selectedFile);

      const result = await client.put("Picture/Skadi.jpg", fileContent);
      console.log(result);

      // Remove the dynamically created input element
      document.body.removeChild(fileInput);
    } catch (e) {
      console.error(e);
    }
  }

  put();
}

const filePath = "Picture/Skadi.jpg";
function GetURL() {
  const client = new OSS({
    bucket: bucket_name,
    region: regionId,
    accessKeyId: access_Key_Id,
    accessKeySecret: access_Key_Secret,
    stsToken: stsToken,
    refreshSTSTokenInterval: 9000,
  });
  // 生成下载文件的签名URL。
  const url = client.signatureUrl(filePath, {
    expires: 3600,
    method: "GET",
  });
  console.log("url:", url);
  //   client.get(filePath, Buffer.from("body")).then((res) => {
  //     console.log("res", res.url);
  //   });
}

document.addEventListener("DOMContentLoaded", function () {
  const uploadBTN = document.getElementById("upload");
  uploadBTN.addEventListener("click", () => {
    GetURL();
  });
});
