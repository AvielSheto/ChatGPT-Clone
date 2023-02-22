import Chat from "../../../components/Chat"
import ChatInput from "../../../components/ChatInput"

function ChatPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
        <Chat/>
        <ChatInput/>
    </div>
  )
}

export default ChatPage