export default function Footer() {
  return (
    <footer className="bg-white relative overflow-hidden pt-16 pb-4">
      <div className="conta-wide">
        {/* Newsletter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <h2 className="font-['Geometria'] text-[25px] font-bold text-[#1D2126] whitespace-nowrap">
            Subscribe <span className="font-normal">to Our Newsletter ?</span>
          </h2>
          <div className="flex w-full max-w-md gap-2">
            <input type="email" placeholder="Email..."
              className="flex-1 h-[55px] bg-white rounded-xl px-4 font-['Poppins'] text-[17px] font-medium
                border border-[#E9ECEF] outline-none"
              style={{ boxShadow: "0 5px 40px #F8F9FA" }} />
            <button className="btn-green px-5 text-sm rounded-[5px] h-[55px]">Subscribe</button>
          </div>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-[10px] mb-8">
          {[
            { href: "https://www.facebook.com/SellCaruae1/", icon: "/assets/images/facebook_01.svg", label: "Facebook" },
            { href: "https://twitter.com/SellcarUae", icon: "/assets/images/twitter.svg", label: "Twitter" },
            { href: "https://www.instagram.com/sellcaruae1", icon: "/assets/images/instagram.svg", label: "Instagram" },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
              className="w-10 h-10 rounded-full bg-[#4EB876] flex items-center justify-center
                hover:-translate-y-1 transition-transform duration-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.icon} alt={s.label} className="w-5 h-5 invert brightness-0 invert" />
            </a>
          ))}
        </div>

        <p className="text-center text-[16px] text-[#2B7647] mt-24 mb-5">
          © SellCarUAE 2022. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
