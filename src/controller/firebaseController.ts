import fs from "fs";
import path from 'path';
import * as fbInit from "../configs/fbconfigs";
export function handlepushNotification(req: any, res: any, next: any) {
  const pushOption = req.body.send_option
  if(!pushOption || (pushOption !== "topic" && pushOption !== "device")) 
  return res.status(400).json({message:`Please select true option (\"topic\" or \"device\" - one of them)!`})
  if(pushOption === "topic"){
    const topic = req.body.topic;
    const title = req.body.title;
    const content = req.body.content;
    if(!topic ) return res.status(400).json({message:"Please input topic name!"})
    if(!title ) return res.status(400).json({message:"Please input title name!"})
    if(!content ) return res.status(400).json({message:"Please input content!"})
    const message = {
      notification: {
        title: title,
        body: content,
      },
       topic: topic
    };
    fbInit.firebaseConnect
      .messaging()
      .send(message)
      .then((response) => {
        console.log("Successfully sent message with topic:", response);
        res.status(200).json({message: "Successfully sent message", data: response});
      })
      .catch((error) => {
        console.error("Error sending message with topic:", error);
        res.status(500).json({message: `Error sending message (${error})`});
      });
  }
  else if(pushOption === "device"){
  const fcmToken = req.body.device_token;
  if (!fcmToken) {
    return res.status(404).json({ message: "Token device not found!" });
  }
  const title = req.body.title;
  if(!title ) return res.status(400).json({message:"Please input title name!"})
  const content = req.body.content; 
  if(!content ) return res.status(400).json({message:"Please input content!"})
  const message = {
      notification: {
        title: title,
        body: content,
      },
      token: fcmToken,    
    };
    fbInit.firebaseConnect
      .messaging()
      .send(message)
      .then((response) => {
        console.log("Successfully sent message with particular device:", response);
        res.status(200).json({message: "Successfully sent message with particular device", data: response});
      })
      .catch((error) => {
        console.error("Error sending message with particular device:", error);
        res.status(500).json({message: `Error sending message with particular device (${error})`});
      });
  }
}

export function handlePostFile(req: any, res: any) {
  var fileGet = req.file;
  if(!fileGet) return res.status(404).json({ message: "File not found" });
  let pathSave = "./src/image/" + fileGet.originalname;
  console.log(pathSave);
  const bucket = fbInit.firebaseConnect.storage().bucket();
  const file = bucket.file(fileGet.originalname);
  const stream = file.createWriteStream({
    resumable: false,
  });

      console.log("file ok");
      var pathImg = "./src/image/" + fileGet.originalname;
      fs.createReadStream(pathImg)
        .pipe(stream)
        .on("error", (error) => {
          console.error("Error uploading image:", error);
          return res.status(500).json({ message: "Upload file to firebase error!" });
        })
        .on("finish", () => {
          console.log("Successfully uploaded image.");
        });
      file
        .getSignedUrl({
          action: "read",
          expires: "01-01-2030",
        })
        .then((signedUrls) => {
          console.log(signedUrls);
          fs.unlink(pathImg, (err) => {
            if (err) throw err;
            console.log(`${pathImg} was deleted`);
          });
          res.status(200).json({data: signedUrls[0], message: "Successfully uploaded image"});
        })
        .catch((error) => {
          console.error("Error getting image URL:", error);
          res.status(500).json({ message: "Error get link image from firebase!" });
        });
    
  
};

