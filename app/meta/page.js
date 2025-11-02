import Facebook from "./../components/facebook";
import WhatsApp from "./../components/whatsapp";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-b from-blue-500 to-blue-800">
      <Facebook />
      <WhatsApp />
    </main>
  );
}
