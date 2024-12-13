/**
 * -------------------------------------------------------
 * ช่วยจัดการเรื่อง WebHook
 * (Telegram Bot API)
 * -------------------------------------------------------
 * by Warapetch  Ruangpornvisuthi
 * วรเพชร  เรืองพรวิสุทธิ์
 * Created :: 6711-21
 * Last Update :: 6711-27 10.00 น
 * -------------------------------------------------------
 */



/**
 * saveUpdatesToGGSheet
 * บันทึกข้อมูล Update จาก Telegram API ไปยัง Google Sheet
 * ตาม Sheet-ID Sheet-Name ที่กำหนด
 * 
 * @returns {JSON}
 */
function saveUpdatesToGGSheet(e,sheetID ,sheetName) {
  // e : eventObject

  // --------------------------------------------------
  // ปัญหา GGSheet ไม่รองรับ/แสดงผลผิด Int64,BigInt
  // date=1.73263991E9 (ผิด)
  // id=7.617153844E9  (ผิด)
  // --------------------------------------------------

  // get Body data (contents)
  // --------------------------------------------------
  // ข้อความ String
  let contensAsStr  = e.postData.contents;

  // Json Object
  let contensAsJson = JSON.parse(e.postData.contents);
  // --------------------------------------------------


  // เก็บค่า property ที่สนใจ
  // --------------------------------------------------
  // get Chat Text (ถ้ามี) {String}
  let chattext = contensAsJson.message.text;
  
  // get Chat_ID {BigInt / String}
  let chatid   = contensAsJson.message.chat.id;

  // get Chat:From {Json}
  let chatfrom = contensAsJson.message.from;

  // get Chat:To {Json}
  let chatto   = contensAsJson.message.to;
  // --------------------------------------------------


  // Connect / Open Sheet
  let ss = SpreadsheetApp.openById(sheetID);

  // สั่งทำงานกับ Sheet อะไร
  let sheet = ss.getSheetByName(sheetName);

  if (sheet.getLastRow() == 0){
      sheet.appendRow(['Date','Chat-ID','Text(ถ้ามี)','Chat-From','Chat-To','Contens-Str','Contens-Json']);
    }

  // บันทึกไปยัง GGSheet
  // รับค่าวันเวลา ปัจจุบัน
  let newDate = new Date();

  // เขียนคำสั่ง ให้เพิ่ม บรรทัดใหม่
  // ส่ง contensAsStr ไปเขียนใน GGSheet เพราะแสดงวันที่ id ถูกต้อง ภาษาไทยเป็น Unicode [Encode]
  //-------------------------------------------------------------------------
  sheet.appendRow([newDate,chatid,chattext,chatfrom,chatto,contensAsStr,contensAsJson]);
  //-------------------------------------------------------------------------

  return contensAsJson;

}

