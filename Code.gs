/**
 * -------------------------------------------------------
 * Telegram Bot API
 * -------------------------------------------------------
 * by Warapetch  Ruangpornvisuthi
 * วรเพชร  เรืองพรวิสุทธิ์
 * Created :: 6711-21
 * Last Update :: 6711-27 10.00 น
 * -------------------------------------------------------
 */

let txtAbout = 'Telegram Bot API </br>by Warapetch  Ruangpornvisuthi </br>Last Update :: 6711-22';
let tgBotAPIUrl  = 'https://api.telegram.org';
let tgBotToken   = '';
let tgBotChatIDs = [];



/**
 * About
 * 
 * Telegram Bot API
 * 
 * by Warapetch  Ruangpornvisuthi
 * 
 * วรเพชร  เรืองพรวิสุทธิ์
 * 
 * Last Update :: 6711-22 13.30น.
 */
function about(){

  return txtAbout;

}


/**
 
 * กำหนดค่าตัวแปรที่สำคัญก่อนใช้งาน warapetch Telegram Bot
 *
 * สิ่งที่ควรรู้
 * 
 * botUrl กำหนดเฉพาะ API (เดี๋ยวภายใน Library จะไปแทนค่าเอง)
 * 
 * chat_id คือ ค่าที่บอท หรือ User พิมพ์มาในช่องแชท ไม่ใช่ BotID และไม่ใช่ UserID  !!
 * 
 * @param {String} botToken - บอทโทเคน
 * 
 * @param {Array<String>} botChatIDs - แชทไอดี เป็น Array ["id#1","id#2"] 
 * 
 * @param {String} botAPIUrl - Default 'https://api.telegram.org'
 * 
 * @example 
 * 
 * telegramAPIUrl   = 'https://api.telegram.org'
 * 
 * botToken = 'NNN:SSSSS'
 * 
 * botChatIDs = ["chat_id1","chat_id2"]
 * 
 */
function setBotConfig(botToken,botChatIDs,botAPIUrl='https://api.telegram.org'){

    tgBotAPIUrl  = botAPIUrl;
    tgBotToken   = botToken;
    tgBotChatIDs = botChatIDs;

}


/**
 * รับค่า Telegram API Url (ที่ตัดต่อแล้ว)
 * 
 * format >> https://api.telegram.org/bot<token>/
 * 
 * @returns {String} BotAPIUrl + 'bot'+BotToken + '/';
*/

function getAPIUrl(){

  let _url = tgBotAPIUrl + '/bot'+tgBotToken + '/';
  return _url;

}


/**
 * SendToAPI 
 * ส่งค่า Payload เองแบบทั้งหมด
 * @param {JSON} payload
 * @param {String} httpMethod @default "post"
 * @example
 * 
 * let payload = { 
 * 
 *         method: "sendMessage", 
 * 
 *         chat_id: String(chat_id), 
 * 
 *         text: text, 
 * 
 *         parse_mode: "HTML" 
 * 
 *       } 
 * 
 * SendToAPI(payload);
 * 
 */
function SendToAPI(payload,httpMethod = "post") {
  
  let options = {
        method: httpMethod,
        payload: payload
  };

  try {

    let url = getAPIUrl();
    let respData =  UrlFetchApp.fetch(url, options);

    console.log('API Response: ',respData.getContentText());

    return respData;

  } catch (e) {
    console.error('API Response Error: ', e);
  }

}


/**
 * getMe 
 * 
 * อ่านค่าของบอท ไอดี, ชื่อบอท , ชื่อเล่น
 *
*/
function getMe(){

  let payload = {
    method: "getMe"
  }
  let respData = SendToAPI(payload,"get");
  return respData.getContentText();

}


/**
 * getUpdates 
 * 
 * อ่านค่าความเคลื่อนไหว ในช่องแชท ที่เกิดกับบอท
 *
*/
function getUpdates(){

  let payload = {
    method: "getUpdates"
  }
  let respData = SendToAPI(payload,"get");
  return respData.getContentText();

}


/**
 * setWebhook 
 * 
 * กำหนดค่า Url ของ WebHook ให้บอท
 * 
 * @param {String} webHookUrl
 * 
 * Telegram API จะส่งข้อมูล Updates 
 * 
 * มาให้เมื่อมีความเคลื่อนไหวในห้องแชท
 *
*/
function setWebhook(webHookUrl){

  let payload = {
    method: "setWebhook",
    url: webHookUrl
  }

  let respData = SendToAPI(payload);
  return respData.getContentText();

}

/**
 * getWebhookInfo 
 * 
 * อ่านค่า WebHook ของบอท
 *
*/

function getWebhookInfo(){

  let payload = {
    method: "getWebhookInfo",
  }
  let respData = SendToAPI(payload,"get");
  return respData.getContentText();

}


/**
 * deleteWebhook 
 * 
 * ลบค่า Url WebHook ของบอท
 * 
 * Telegram API จะไม่ส่งข้อมูล Updates มาให้แล้ว
*/
function deleteWebhook(){

  let payload = {
    method: "deleteWebhook",
  }
  let respData = SendToAPI(payload);
  return respData.getContentText();

}


/**
 * sendMessage ส่งข้อความ
 *
 * @param {String} text เป็นข้อความที่ต้องการส่ง
 * 
 */

function sendMessage(text) {

  for (var _chatId of tgBotChatIDs){

    let payload = {
            method: "sendMessage",
            chat_id: String(_chatId),
            text: text,
            parse_mode: "HTML"
          }

    return SendToAPI(payload);

  }

}


/**
 * sendSticker ส่งสติ๊กเกอร์ Id , InputFile()
 *
 * @param {String} stickId เป็นไอดีของสติ๊กเกอร์ ที่ต้องการส่ง
 */

function sendSticker(stickId) {

  for (var _chatId of tgBotChatIDs){

    let payload = {
            method: "sendSticker",
            chat_id: String(_chatId),
            sticker: stickId,
          }

    return SendToAPI(payload);

  }

}


/**
 * sendDice 
 * 
 * เป็นการทอยลูกเต๋า (สุ่มแต้ม 6 ค่า)
 */
function sendDice() {

  for (var _chatId of tgBotChatIDs){

    let payload = {
            method: "sendDice",
            chat_id: String(_chatId),
            emoji: '🎲',
          }

    return SendToAPI(payload);

  }

}


/**
 * sendSlotMachine 
 * 
 * เป็นการเล่นสล็อตแมชชีน (สุ่มได้ 64 ค่า)
 */

function sendSlotMachine() {

  for (var _chatId of tgBotChatIDs){

    let payload = {
            method: "sendDice",
            chat_id: String(_chatId),
            emoji: '🎰',
          }

    return SendToAPI(payload);

  }

}


/**
 * sendDart 
 * 
 * เป็นการเล่นปาลูกดอก(Dart) (สุ่มได้ 6 ค่า)
 */
function sendDart() {

  for (var _chatId of tgBotChatIDs){

    let payload = {
            method: "sendDice",
            chat_id: String(_chatId),
            emoji: '🎯',
          }

    return SendToAPI(payload);

  }

}


/**
 * sendBall 
 * 
 * เป็นการเล่นเตะบอลเข้าประตู (สุ่มได้ 5 ค่า)
 */

function sendBall() {

  for (var _chatId of tgBotChatIDs){

    let payload = {
            method: "sendDice",
            chat_id: String(_chatId),
            emoji: '⚽',
          }

    return SendToAPI(payload);

  }

}


/**
 * sendBaseketBall 
 * 
 * เป็นการเล่นชูทลูกบาส (สุ่มได้ 5 ค่า)
 */
function sendBaseketBall() {

  for (var _chatId of tgBotChatIDs){

    let payload = {
            method: "sendDice",
            chat_id: String(_chatId),
            emoji: '🏀',
          }

    return SendToAPI(payload);

  }

}


/**
 * sendBowling 
 * 
 * เป็นการเล่นโยนโบว์ลิ่ง (สุ่มได้ 6 ค่า)
 */

function sendBowling() {

  for (var _chatId of tgBotChatIDs){

    let payload = {
            method: "sendDice",
            chat_id: String(_chatId),
            emoji: '🎳',
          }

    return SendToAPI(payload);

  }

}


/**
 * sendPhoto ส่งรูปภาพ Url
 *
 * @param {String} photoUrl
 * 
 * @param {String} photoCaption (Option)
 * 
 * ถ้าส่งภาพ หรือ ไฟล์จาก Google Drive ต้องแชร์ไฟล์ ก่อน
 * 
 * @example
 * 
 * ด้วยคำสั่ง 
 * 
 * file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
 */

function sendPhoto(photoUrl,photoCaption = null) {

  // Google Drive ต้องแชร์ไฟล์ ก่อน
  // newFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  
  for (var _chatId of tgBotChatIDs){

    let payload = {
            method: "sendPhoto",
            chat_id: String(_chatId),
            photo: photoUrl,
            caption: photoCaption,
            parse_mode: "HTML"
          }

    return SendToAPI(payload);

  }
}


/**
 * sendPhotoFromGGDrive 
 * 
 * ส่งรูปภาพ Url จาก Google Drive เป็น Url หรือ Blob
 *
 * @param {Blob} fileBlob
 * 
 * @param {String} fileUrl (Option) ส่ง URL / Blob อย่างใดอย่างหนึ่ง
 * 
 * @param {String} photoCaption (Option)
 * 
 * ถ้าส่งภาพ หรือ ไฟล์จาก Google Drive ต้องแชร์ไฟล์ ก่อน
 * 
 * @example
 * 
 * ด้วยคำสั่ง 
 * 
 * file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
 */
function sendPhotoFromGGDrive(fileBlob , fileUrl = "" , photoCaption = null) {

  // Google Drive
  // 3 Type of Url
  // https://drive.usercontent.google.com/download?id={file_imge_id}
  // https://drive.google.com/file/d/{file_imge_id}/view
  // https://docs.google.com/uc?id={file_imge_id}

  // Create Blob
  // let imgBlob = DriveApp.getFileById(fileId).getBlob();
  
  // Google Drive ต้องแชร์ไฟล์ ก่อน
  // newFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  
  // let media = {"InputMedia":`Photo(InputMediaPhoto.new(InputFile.url(${fileUrl})`};

  for (var _chatId of tgBotChatIDs){

    if (fileBlob != null){
      let payload = {
            method: "sendPhoto",
            chat_id: String(_chatId),
            photo: fileBlob,
            caption: photoCaption,
            parse_mode: "HTML"
          }

    } else {
      let payload = {
            method: "sendPhoto",
            chat_id: String(_chatId),
            photo: fileUrl,
            caption: photoCaption,
            parse_mode: "HTML"
          }
    }

    return SendToAPI(payload);

  }
  
}


/**
 * sendDocument ส่งไฟล์ (ได้หลายชนิด) จาก Google Drive เป็น Blob
 *
 * @param {Blob} fileBlob
 * 
 * @param {String} fileCaption (Option)
 * 
 * ถ้าส่งภาพ หรือ ไฟล์จาก Google Drive ต้องแชร์ไฟล์ ก่อน
 * 
 * @example
 * 
 * ด้วยคำสั่ง 
 * 
 * file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
 */

function sendDocument(fileBlob,fileCaption = null) {

  // file Blob หาได้จาก
  // var blob = DriveApp.getFileById(fileId).getBlob();
  
  for (var _chatId of tgBotChatIDs){

    let payload = {
            method: "sendDocument",
            chat_id: String(_chatId),
            document: fileBlob,
            caption: fileCaption,
            parse_mode: "HTML"
          }

    return SendToAPI(payload);

    }

}


/**
 * sendVideo ส่งไฟล์วิดีโอ
 *
 * ถ้าส่งวิดีโอ หรือ ไฟล์จาก Google Drive ต้องแชร์ไฟล์ ก่อน
 * 
 * @param {String} fileUrl
 * 
 * @param {String} fileCaption (Option)
 * 
 * @example
 * 
 * ด้วยคำสั่ง 
 * 
 * file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  */
function sendVideo(fileUrl,fileCaption = null) {

 
  for (var _chatId of tgBotChatIDs){

    let payload = {
            method: "sendVideo",
            chat_id: String(_chatId),
            video: fileUrl,
            caption: fileCaption
          }

    return SendToAPI(payload);

    }

}


/**
 * sendLocation 
 * 
 * แชร์ตำแหน่ง Latitude,Longitude
 * 
 * @param latitude {Float} เลขทศนิยม
 * 
 * @param longitude {Float} เลขทศนิยม
 *
 * @param headingDirection {Number} ตำแหน่งทิศทางหัวลูกศร บนแผนที่ 1-360 องศา
 * 
 */
function sendLocation(latitude,longitude , headingDirection = 1){

  for (var _chatId of tgBotChatIDs){

    let payload = {
            method: "sendLocation",
            chat_id: String(_chatId),
            latitude: latitude,
            longitude: longitude,
            heading: headingDirection
          }

    return SendToAPI(payload);

    }

}


/**
 * sendVenue 
 * 
 * แชร์ตำแหน่ง+สถานที่ Latitude,Longitude รายละเอียด
 *
  * @param {Float} latitude เลขทศนิยม
 * 
 * @param {Float} longitude เลขทศนิยม
 *
 * @param {String} title ชื่อสถานที่
 * 
 * @param {String} address ที่อยู่
 */

function sendVenue(latitude,longitude ,title,address){

  for (var _chatId of tgBotChatIDs){

    let payload = {
            method: "sendVenue",
            chat_id: String(_chatId),
            latitude: latitude,
            longitude: longitude,
            title: title ,
            address: address
          }

    return SendToAPI(payload);

    }

}
