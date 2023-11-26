import Image from 'next/image'
import ChatArea from './ChatArea'
// import ChatHistory from './ChatHistory'


export default function Home() {
  const messages: { role: string; content: string; }[] = []


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div id="chat_history"></div>
      <ChatArea messages={messages}></ChatArea>
    </main>
  )
}
