import Navbar from "./Navbar";
import LogoRing from "./LogoRing";
import Countdown from "./Countdown";
import EmailInput from "./EmailInput";
import { subscribeEmail } from "../api/subscribe";
import planet from "../../../assets/images/planet.svg";

export default function Hero() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-black text-white">

      {/* Planet artwork */}
      <img
        src={planet}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[375px] w-auto max-w-none -translate-x-1/2 select-none md:h-auto md:w-full"
      />

      <Navbar />

      {/* Countdown card positioning */}
      <div className="relative z-10 flex w-full flex-1 justify-center px-[22px] pb-6 pt-[calc(30dvh-55px)] md:absolute md:inset-x-0 md:top-0 md:h-full md:items-center md:px-8 md:pt-6">
        <section className="md:absolute md:top-[165px] h-fit w-full max-w-[291px] rounded-[18px] border-[0.73px] border-black bg-white/4 px-[14px] pb-[16px] pt-[8px] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_0_0_1px_rgba(255,255,255,0.07)] backdrop-blur-[14px] backdrop-saturate-150 md:backdrop-brightness-[0.45] md:h-[330px] md:max-w-[450px] md:scale-[max(0.72,min(1,tan(atan2(100vw,1920px))))] md:rounded-[20px] md:px-[20px] md:pb-[20px] md:pt-[17px]">

          <div className="flex flex-col items-center text-center">
            <LogoRing />

            <h1 className="mt-[2px] text-[18px] font-normal leading-[24px] text-white/90 md:mt-[6px] md:text-[24px] md:leading-[30px]">
              Be the first one to witness
            </h1>

            <Countdown />
          </div>

          <div className="mt-[14px] md:mt-[20px]">
            <EmailInput onSubmit={subscribeEmail} />
          </div>

        </section>
      </div>
    </main>
  );
}