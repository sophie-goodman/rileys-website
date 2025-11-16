import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Riley Midroni | Portfolio"
};

export default function Home() {
  return (
    <main className="">
   
   <div className="min-h-screen flex flex-col sm:flex-row">

   <div className="flex flex-col p-3 sm:flex-grow sm:p-6">
        <div className="text-black font-Notable text-center text-3xl md:text-5xl md:ml-5 sm:text-left">
            Riley Midroni
        </div>


        {/* CONTACT INFO (desktop bottom) */}
        <div className="hidden md:block mt-auto text-sm">
          <div>@rileyMidroni</div>
          <div>rileymidroni@info.com</div>
        </div>

    </div>

    <div className="flex  text-center justify-center md:justify-end md:mt-5 md:mr-4 sm:p-6 sm:mt-3 md:text-lg">
        {/* MENU BAR */}
        <nav className="flex flex-col gap-3 sm:gap-5 sm:flex-row md:gap-8">
        <Link href="/" className="hover:underline">HOME</Link>
        <Link href="/about" className="hover:underline">ABOUT</Link>
        <Link href="/CV" className="hover:underline">CV</Link>
        </nav>
        </div>

        </div>

    <div className="mt-8 px-6 text-md">
        <div className="">All</div>
        <div className="">Jewelery</div>
        <div className="">Sculpture and Instillation</div>
        <div className="">Painting and Drawing</div>
    </div>
    

      {/* CONTACT INFO (mobile bottom) */}
      <div className="block hidden text-center mt-6 mb-4 text-sm text-gray-700">
        <div>@truckerskiss</div>
        <div>evanlwsgn@gmail.com</div>
      </div>
    </main>
  );
}