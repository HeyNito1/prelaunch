import { Fragment } from "react";
import { useCountdown } from "../hooks/useCountdown";
import { LAUNCH_DATE } from "../config";

const pad = (n) => String(n).padStart(2, "0");

export default function Countdown() {
  const { days, hours, minutes, seconds, isComplete } =
    useCountdown(LAUNCH_DATE);

  if (isComplete) {
    return (
      <p className="mt-[11px] text-[24px] font-light text-white/90 md:text-[30px]">
        We&apos;re Live!
      </p>
    );
  }

  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div
      className="mt-[6px] flex items-start text-white/70 md:mt-[11px]"
      role="timer"
      aria-label="Time until launch"
    >
      {units.map((unit, i) => (
        <Fragment key={unit.label}>
          {i > 0 && (
            <span
              aria-hidden="true"
              className="mx-[3px] text-[18px] font-light leading-[26px] md:mx-[2px] md:text-[30px] md:leading-[36px]"
            >
              :
            </span>
          )}

          <div className="flex flex-col items-center">
            <span className="text-[18px] font-light leading-[26px] tabular-nums md:text-[30px] md:leading-[36px]">
              {pad(unit.value)}
            </span>
            {/* Labels are shown on desktop only (as in the Figma); read by screen readers on mobile */}
            <span className="sr-only px-1 text-[10px] leading-[12px] text-white/80 md:not-sr-only">
              {unit.label}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
