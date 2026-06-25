const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbymuXeecTAkhS_90daEZZGAFdk02FSOKkt3wFVG0xqpCZlqv5an1gL7Am9PBofhZjYZ/exec";
async function submitToGoogleSheet(sheet, data) {
  const response = await fetch(GOOGLE_SHEET_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain"
    },
    body: JSON.stringify({
      sheet,
      data
    })
  });
  return response.json();
}
export {
  submitToGoogleSheet as s
};
