
import nitoLogo from "../../../assets/logos/nito_logo.svg";
import ring from "../../../assets/images/ring.svg";
import ringDot from "../../../assets/images/ring-dot.svg";

export default function LogoRing() {
  return (
    <div className="relative size-[90px] md:size-[114px]">

       
      <div className="absolute left-1/2 top-1/2 size-[92%] -translate-x-1/2 -translate-y-1/2 animate-orbit motion-reduce:animate-none">
        <img
          src={ring}
          alt=""
          className="absolute inset-0 size-full"
        />

        <img
          src={ringDot}
          alt=""
          className="absolute left-[50.8%] top-[4.7%] w-[42.1%]"
        />
      </div>

      {/* NITO text — original size and position */}
      <img
        src={nitoLogo}
        alt="NITO"
        className="absolute left-1/2 top-1/2 w-[100px] -translate-x-1/2 -translate-y-1/2 md:w-[124px]"
      />
    </div>
  );
}
