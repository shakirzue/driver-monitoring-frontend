// component for chat page
import React from "react";
import { ChatEngine } from "react-chat-engine";
import ChatFeed from "./ChatFeed";
import "./Chat.css";

//Riders have to be created manually

//Login
//Email: AbdullahaRaheel@gmail.com
//Password: A12341234

//Check These for APIS to create Chats and Delete Chats
// https://chatengine.io/docs/react/v1/server_rest

const Chat = (props) => {
  // Recieve the props from App.js here (Such as login info ect)
  return (
    <div>
      <ChatEngine
        height="100vh"
        projectID="9def7039-d257-441a-bdff-856ab0218b24"
        //Can Change Users here for example
        // 1. userName="Abdullah", userSecret: 1234
        // 2. userName="Tony", userSecret: 1234
        // 3. userName="John", userSecret: 1234
        // 4. userName="Carla", userSecret: 1234
        userName="Abdullah" // This should Change Dynamically from the back-end
        userSecret="1234"
        renderChatFeed={(chatFeedProps) => <ChatFeed {...chatFeedProps} />}
      />
    </div>
  );
};

export default Chat;
