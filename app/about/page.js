import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Riley Midroni | Home"
};

export default function Home() {
  return (
    <main className="">
   
      <div className="">
        {/* MENU BAR */}
        <nav className="">
        <Link href="/portfolio" className="hover:underline">PORTFOLIO</Link>
        <Link href="/about" className="hover:underline">ABOUT</Link>
        <Link href="/CV" className="hover:underline">CV</Link>
          
      
        </nav>


        <div className="text-black font-Notable text-60 ">
            Riley Midroni
        </div>

        {/* CONTACT INFO (desktop bottom) */}
        <div className="hidden md:block md:mt-25 md:ml-[-1rem] text-sm">
          <div>@rileyMidroni</div>
          <div>rileymidroni@info.com</div>
        </div>
      </div>



      {/* CONTACT INFO (mobile bottom) */}
      <div className="block md:hidden text-center mt-6 mb-4 text-sm text-gray-700">
        <div>@truckerskiss</div>
        <div>evanlwsgn@gmail.com</div>
      </div>
    </main>
  );
}