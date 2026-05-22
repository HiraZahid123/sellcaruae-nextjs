import type { Metadata } from "next";
import Image from "next/image";
import CarValuationWidget from "@/components/booking/CarValuationWidget";

export const metadata: Metadata = {
  title: "Sell Used Car in Dubai – Best Price Guaranteed",
  description: "Sell your used car in Dubai fast and hassle-free. Get the best price, same-day cash payment, and free inspection. We buy any car in any condition.",
};

const INFO_BOXES = [
  { img: "/assets/images/2.1.png", title: "Sell My Car", body: "Dubai and the UAE as a whole is a place of exciting opportunities which sees many people passing through its borders. Some stay a while, some stay for good, but Dubai is mostly a transitional city that appeals to individuals from across the world. This makes Dubai the ideal location to sell your used, scrap, or second-hand vehicle, as there's a strong need for used automobiles here. This is where SELLCARUAE comes in because even though there's a high demand for your car in Dubai, selling your car online can be a tricky process, so we've devoted our time and effort to make selling your vehicle online as simple and straightforward as possible. So, if you're wondering 'where to sell my car in Dubai?' then keep on reading." },
  { img: "/assets/images/carquestion-mark.png", title: "How To Sell My Car Online?", body: "Now you know the where and the why you need to know how to sell your car online. Here are a few tips and tricks we can suggest to make the sale of your car easy and stress-free, but you can already rest assured that you're at the best site in Dubai to sell your car. Without further ado, here's our expert guide to selling your motor online." },
  { img: "/assets/images/serch-icon.png", title: "Do Your Research!", body: "While we're proud to take on as much of the hard work as possible, a little of your own research can go a long way. We'll always offer you the fairest and most accurate price for your vehicle, but doing a little research to find out what your vehicle is worth will help you to avoid the scammers out there. When it comes to valuing your car the experts will consider three main factors; age, mileage, and condition, and you can use this intel to find the ballpark price you would expect to receive when you sell your car in Dubai." },
  { img: "/assets/images/u-turn.png", title: "Remember To Be Flexible", body: "It's estimated that a new car can lose up to 30% of its value within the first year, and up to 50% after its third. This can be a hard fact for sellers to accept. By selling your used car online with a service like ours you avoid this hassle. We keep up to date with the market value of all makes and models of cars, and our team of experts will assess the finer details of your vehicle so that the offer you receive from us is honest and fair. Our quotes come with no obligation, and we offer same-day cash payments to our customers." },
  { img: "/assets/images/car-true.png", title: "Your Vehicle Deserves A Thorough Inspection", body: "In the used car business we have the term 'tire kicker', this refers to the lazy dealerships who will look at your vehicle with the bare minimum of attention. To get the best and most accurate offer for your vehicle, we have a two-step evaluation process. By filling out our simple online form you provide our experts with the basic information on the make, model, age, and condition of your car. This means that when we inspect your car we will know the most relevant areas to inspect to provide an accurate assessment of your motor." },
  { img: "/assets/images/Plate_Number.png", title: "Your Number Plate Has Value Too!", body: "If you have a unique number plate, it might be frustrating to know that you can't take your plates into other countries, but don't despair too much as these plates still have value in the UAE and can be used to boost the worth of your car! Number plates from vehicles over a decade old are higher in value than more recent plates; meaning that even if your vehicle is an old rust bucket, its plates may still be worth a pretty penny." },
  { img: "/assets/images/dollersign-file.png", title: "Ensure You Have A Deposit And Receipts", body: "If you're still asking 'how do I sell my car in Dubai?', and you're not considering our service then you'll need to make sure you're safeguarding yourself when a prospective buyer is found. If you're selling your car yourself you should ask for a cash deposit of 5-7% of the car's value. Our car-buying service offers you the full value of your car upfront and in cash with the correct paperwork all in hand, so there's no need to worry with us." },
  { img: "/assets/images/file-tie.png", title: "Don't Skip Out On The Official Information", body: "In Dubai and across the UAE the vehicle selling and buying process is regulated by the Road Transport Authority (RTA) who lays out the specific procedure that must be followed for every sale. Your vehicle cannot have any outstanding loans or bills connected to it, and your vehicle must have a roadworthiness inspection before it can be sold. At SELLCARUAE we do all this hard work for you; it's all part of the amazing package we're proud to provide our customers." },
  { img: "/assets/images/thump-car.png", title: "How To Sell My Car The Right Way", body: "If you're asking us what the best way to sell your car is, the answer is whatever feels right for you. Personally, we'd recommend the ease and convenience of our online service as all the paperwork is done for you, the value of your car is fairly assessed, and you can receive same-day cash-in-hand payment. However, if you're confident in your sales skills and know your way around paperwork, you might want to go it alone." },
];

export default function SellUsedCarsDubai() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 bg-[#F8F8F8] overflow-hidden">
        <div className="conta-def">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="block w-[50px] h-[3px] bg-[#1EAD5E] mb-4" />
              <h1 className="def-h text-[#1D2126] mb-6">Sell Used Car in Dubai.</h1>
              <CarValuationWidget variant="form" />
            </div>
            <div className="hidden lg:flex justify-end">
              <Image src="/assets/images/Bmob_img01.png" alt="Sell Car Dubai" width={450} height={500}
                className="w-full max-w-sm object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Info boxes */}
      <section className="py-20 bg-white">
        <div className="conta-def space-y-10">
          {INFO_BOXES.map((box, i) => (
            <div key={i} className="relative bg-[#F7F7F7] border border-[#E1E1E1]/60 rounded-[30px_30px_14px_14px] pt-2 px-12 pb-8">
              <div className="absolute -top-10 left-8 w-[80px] h-[80px] rounded-full bg-white border border-[#E1E1E1] flex items-center justify-center shadow-sm">
                <Image src={box.img} alt={box.title} width={50} height={50} className="object-contain" />
              </div>
              <h3 className="inline-block bg-[#4EB876] text-white font-['Poppins'] font-bold text-[18px] px-4 py-1 rounded mb-4 mt-8">
                {box.title}
              </h3>
              <p className="font-['Poppins'] text-[15px] text-[#64607D] leading-7">{box.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1EAD5E]">
        <div className="conta-def text-center">
          <h2 className="font-['Geometria'] text-[clamp(24px,4vw,36px)] font-bold text-white mb-3">Turn Your Car into Cash Today</h2>
          <p className="font-['Poppins'] text-white/90 mb-8">Enter your details to start your free valuation now.</p>
          <a href="/car-valuation" className="inline-flex items-center justify-center bg-white text-[#1EAD5E] font-['Poppins'] font-semibold text-[14px] uppercase h-[50px] px-8 rounded-lg hover:bg-[#D8EEE0] transition-colors">
            Sell Your Car Today
          </a>
        </div>
      </section>
    </>
  );
}
