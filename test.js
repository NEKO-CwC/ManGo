const role_Arn = "acs:ram::1463793512635270:role/ray";
const access_Key_Id = "LTAI5t5rPhn5UbdoLLQncn8r";
const access_Key_Secret = "KGJn7jyzCUBbX7wIgCFpVhngQhY7JK";
const bucket_name = "spark-forge";
const stsToken =
  "CAIS5QF1q6Ft5B2yfSjIr5bQJdDSh4x28aHcQRPgj1gFT/dah6idmzz2IHhMe3FvBO8XsPQwm21U6fgblqpoV4Qd0dJzkmcpvPpt6gqET9frma7ctM4p6vCMHWyUFGSIvqv7aPn4S9XwY+qkb0u++AZ43br9c0fJPTXnS+rr76RqddMKRAK1QCNbDdNNXGtYpdQdKGHaOITGUHeooBKJUBQz5Vsn1Dolt//imJLE0HeE0g2mkN1yjp/qP52pY/NrOJpCSNqv1IR0DPGZiHEItEUVpfkm0/MZpWiZ58v2GEVK8/tZumBDc3kFGoABXDiWUr/MSKRcporXddLPIE+IjP/h+cW+TiREJzpDNuci6WUDBOnYy0i2Hmwu7zST9wHYKqNwkZeQx0obBt5g2k/mAoexWDamoTaHxqo/J+NDwkuZ4jkOWiQqiUKfTtNxUaVElgxZz7fqG9JUUyA7ml0oeypEz52LhXpxt8ORGf8gAA==";
const regionId = "oss-cn-hangzhou";
const backendUrl = "localhost:8080/SendUrl";
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
function extractUrl(response) {
  // 检查响应是否包含名称和 URL
  if (response && response.name && response.url) {
    return response.url;
  } else {
    console.error("Invalid response format. Missing name or URL.");
    return null;
  }
}
async function sendUrlToBackend(url) {
  // 使用 fetch 或其他适当的方式发送 URL 到后端
  const response = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: url }),
  });
  // 解析后端响应
  const responseBody = await response.json();
  return responseBody;
}
async function fetchStsTokenFromBackend() {
  // 使用 fetch 或其他适当的方式从后端获取 STS Token
  const response = await fetch(backendUrl);
  const responseBody = await response.json();
  return responseBody.stsToken;
}

async function uploadAndSendUrl() {
  try {
    // 从后端获取 STS Token
    // const stsToken = await fetchStsTokenFromBackend();
    const client = new OSS({
      accessKeyId: access_Key_Id,
      accessKeySecret: access_Key_Secret,
      region: "oss-cn-hangzhou",
      stsToken: stsToken,
      bucket: bucket_name,
    });
    const fileInput = createFileInput();
    // Trigger a click event to open the file dialog
    fileInput.click();
    // Wait for the user to select a file
    const fileChangePromise = new Promise((resolve) => {
      fileInput.addEventListener("change", () => resolve(fileInput.files[0]), {
        once: true,
      });
    });
    const selectedFile = await fileChangePromise;
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }
    const fileContent = await readFileContent(selectedFile);
    // Get file type and name
    const fileType = selectedFile.type.split("/")[0]; // e.g., "image" from "image/jpeg"
    const fileName = selectedFile.name;
    // Construct the desired path
    const filePath = `${fileType}/${fileName}`;
    const result = await client.put(filePath, fileContent);
    console.log(result);
    // // 提取上传后的 URL
    // const Url = extractUrl(result);
    // // 如果提取成功，发送 URL 到后端
    // if (Url) {
    //   // 调用后端接口，发送 Url 到后端
    //   const backendResponse = await sendUrlToBackend(Url);
    //   console.log("Backend response:", backendResponse);
    // }
    // Remove the dynamically created input element
    document.body.removeChild(fileInput);
  } catch (e) {
    console.error(e);
  }
}
// const filePath = "Picture/Skadi.jpg";
// function GetURL() {
//   const client = new OSS({
//     bucket: bucket_name,
//     region: regionId,
//     accessKeyId: access_Key_Id,
//     accessKeySecret: access_Key_Secret,
//     stsToken: stsToken,
//     refreshSTSTokenInterval: 9000,
//   });
//   // 生成下载文件的签名URL。
//   const url = client.signatureUrl(filePath, {
//     expires: 3600,
//     method: "GET",
//   });
//   console.log("url:", url);
//   //   client.get(filePath, Buffer.from("body")).then((res) => {
//   //     console.log("res", res.url);
//   //   });
// }

document.addEventListener("DOMContentLoaded", function () {
  const uploadBTN = document.getElementById("upload");
  uploadBTN.addEventListener("click", () => {
    uploadAndSendUrl();
  });
});
