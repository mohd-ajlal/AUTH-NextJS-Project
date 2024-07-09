import Image from "next/image";
import Homepage from "./home/page";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] ">
      <Homepage/>
    </main>
  );
}
