import { useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function ArrowIcon() {
  return (
    <svg
      viewBox="8 6 14 14"
      className="size-[14px]"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10 12.25C9.58579 12.25 9.25 12.5858 9.25 13C9.25 13.4142 9.58579 13.75 10 13.75V13V12.25ZM10 13V13.75H20V13V12.25H10V13ZM20.5303 13.5303C20.8232 13.2374 20.8232 12.7626 20.5303 12.4697L15.7574 7.6967C15.4645 7.40381 14.9896 7.40381 14.6967 7.6967C14.4038 7.98959 14.4038 8.46447 14.6967 8.75736L18.9393 13L14.6967 17.2426C14.4038 17.5355 14.4038 18.0104 14.6967 18.3033C14.9896 18.5962 15.4645 18.5962 15.7574 18.3033L20.5303 13.5303Z" />
    </svg>
  );
}


export default function EmailInput({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "loading") return;

    const value = email.trim();

    if (!EMAIL_PATTERN.test(value)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const result = await onSubmit(value);
      setStatus("success");
      setMessage(result?.message || "You're on the list!");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative w-full">
      
      <input
        type="email"
        inputMode="email"
        autoComplete="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status !== "idle") {
            setStatus("idle");
            setMessage("");
          }
        }}
        placeholder="example@gmail.com"
        aria-label="Email address"
        aria-invalid={status === "error"}
        className="h-[30px] w-full appearance-none rounded-full border-[0.73px] border-black bg-black/40 pl-4 pr-[40px] text-[16px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_0_0_1px_rgba(255,255,255,0.07)] outline-none backdrop-blur-[14px] backdrop-saturate-150 placeholder:text-[11px] placeholder:text-white/70 focus:border-[#08D0F8]/70 md:h-[34px] md:pl-[19px] md:placeholder:text-[15px]"      />


      <button
        type="submit"
        aria-label="Notify me"
        disabled={status === "loading"}
        className="absolute right-[3px] top-1/2 flex size-[24px] -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#021AA5] to-[#08D0F8] text-white transition hover:brightness-110 active:scale-95 disabled:opacity-60 md:right-[3px] md:size-[28px]"
      >
        <ArrowIcon />
      </button>

      <p
        role="status"
        className={`absolute left-0 right-0 top-full mt-1 text-center text-[12px] ${
          status === "error" ? "text-[#E05A64]" : "text-white"
        }`}
      >
        {message}
      </p>
    </form>
  );
}
