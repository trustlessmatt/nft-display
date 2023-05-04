import Marketplace from "@/components/organisms/Marketplace";

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center py-10`}>
      <p className="text-xl lg:text-3xl font-bold py-8 mx-auto text-center">
        Magic Eden Engineering Challenge :)
      </p>
      <Marketplace />
    </main>
  );
}
