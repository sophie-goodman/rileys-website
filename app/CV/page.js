import Link from "next/link";

export const metadata = {
  title: "Riley Midroni | CV"
};

export default function CV() {

  return (
    <main className="flex flex-col">
      <h1 className="font-Notable text-center text-3xl md:text-5xl flex justify-center md:mt-6">
          Riley Midroni
        </h1>

    <header className="flex flex-row justify-center">
        {/* LEFT SIDE MENU */}
        <nav className="flex flex-col text-center gap-3 md:flex-row md:gap-20 mt-3">
          <Link href="/portfolio" className="hover:underline">PORTFOLIO</Link>
          <Link href="/about" className="hover:underline">ABOUT</Link>
          <Link href="/" className="hover:underline">HOME</Link>
        </nav>

       
      </header>

    <div className="pt-20 flex flex-col  w-full md:items-center align-text-left justify-left min-h-screen">

    <div className="w-full md:w-1/2 text-start">
    <div className="pb-3 p-2 underline">
      EXHIBITIONS
    </div>


    <div className="p-2">

    <p></p>
    </div>


    <div className="pb-3 pt-8 p-2 underline">
      PUBLICATIONS
    </div>

    </div>

    </div>





      </main>

  );
}