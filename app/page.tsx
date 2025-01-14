import { ChatContainer } from './components/chat/chat-container';

export default function Home() {
  return (
    <main className="min-h-screen gradient-background">
      <div className="container mx-auto flex min-h-screen flex-col items-center gap-4 sm:gap-6 md:gap-8 px-4 py-4 sm:py-6 md:py-8">
        <div className="text-center w-full">
          <h1 className="mb-2 text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-700 to-indigo-900 bg-clip-text text-transparent">
            CDP Support Assistant
          </h1>
          <p className="text-base sm:text-lg text-indigo-900/80">
            Get help with Segment, mParticle, Lytics, and Zeotap
          </p>
        </div>
        <br />
        <div className="w-full max-w-3xl flex-1">
          <ChatContainer />
        </div>
      </div>
    </main>
  );
}