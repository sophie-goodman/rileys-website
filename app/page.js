import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Riley Midroni | Home"
};

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col">
   

        <div className="md:absolute md:inset-0 md:-z-10">
        <Image
          src="/assets/IMG_0356.JPG"
          alt="Art Thumbnail"
          fill
          className="object-cover"
          priority
        />
        </div>


        <div className="flex flex-col flex-grow md:flex-row md:flex-row p-6 gap-6">

        <div className="flex flex-col flex-grow">
        <div className="text-white font-Notable md:text-6xl ">
            Riley <br />Midroni
        </div>

         {/* CONTACT INFO (desktop bottom) */}
         <div className="hidden md:block mt-auto md:justify-start text-sm text-white">
          <div>@rileyMidroni</div>
          <div>rileymidroni@info.com</div>
        </div>
      </div>

        
        <nav className="flex flex-col text-2xl text-white items-center gap-2 md:self-start text-right md:mr-20 md:mt-35">
        <Link href="/portfolio" className="underline hover:text-black">PORTFOLIO</Link>
        <Link href="/about" className="underline hover:text-black">ABOUT</Link>
        <Link href="/CV" className="underline hover:text-black">CV</Link>
        </nav>
        
      </div>


      {/* CONTACT INFO (mobile bottom) */}
      <div className="block md:hidden text-center mt-6 mb-4 text-sm text-gray-700">
        <div>@truckerskiss</div>
        <div>evanlwsgn@gmail.com</div>
      </div>


    </main>
  );
}