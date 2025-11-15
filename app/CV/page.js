import Link from "next/link";

export const metadata = {
  title: "Evan Sagman | CV"
};

export default function CV() {

  return (
    <main className="">
    <header className="">
        {/* LEFT SIDE MENU */}
        <nav className="">
          <Link href="/portfolio" className="hover:underline">PORTFOLIO</Link>
          <Link href="/" className="hover:underline">HOME</Link>
          <Link href="/about" className="hover:underline">ABOUT</Link>
        </nav>

        <h1 className="">
          Riley Midroni
        </h1>
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