import Image from 'next/image'
import ChatArea from './ChatArea'
import ChatHistory from './ChatHistory'


export default function Home() {
  const messages=[
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Who won the world series in 2020?"},
    {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
    {"role": "user", "content": "Where was it played?"}
  ]


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div id="chat_history"></div>
      <ChatArea messages={messages}></ChatArea>
    </main>
  )
}
