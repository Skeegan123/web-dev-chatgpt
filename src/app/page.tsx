import Image from 'next/image'
import ChatArea from './ChatArea'
import ThreadHistory from './ThreadHistory';
// import ChatHistory from './ChatHistory'


export default function Home() {
  const messages: { role: string; content: string; }[] = []


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div id="chat_history"><ThreadHistory username={"guest"}></ThreadHistory></div>
      <ChatArea messages={messages}></ChatArea>
    </main>
  )
}
