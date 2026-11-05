import nitoLogo from "../../../assets/logos/nito_logo.svg";

export default function Navbar() {
  return (
    <header className="relative z-10 ml-[max(22px,env(safe-area-inset-left))] mr-[max(22px,env(safe-area-inset-right))] mt-[max(32px,env(safe-area-inset-top))] flex h-[39px] items-center justify-between rounded-full border border-white/15 bg-[#1a1a1a] px-[20px] md:mx-8 md:mt-[40px] md:h-[60px] md:px-[34px] lg:mx-[260px]">
      <img
        src={nitoLogo}
        alt="NITO"
        className="w-[86px] md:w-[143px]"
      />

      <p className="font-flex shrink-0 whitespace-nowrap text-right text-[10px] leading-[12px] text-white [font-stretch:125%] md:h-[30px] md:w-[183px] md:text-[12px] md:leading-normal">
        Neural Intelligence &amp;
        <br />
        Trans-human Omniscience
      </p>
    </header>
  );
}