import Image from "next/image"
import logo from "../assets/logo.svg"

export function LogoName() {
  return (
    <header className="h-14 mb-2 flex items-center overflow-hidden">
      <span className="min-w-[55px] flex items-center">
        <Image
          alt="Logo do Economic Plus"
          src={logo}
          width="0"
          height="0"
          style={{ width: "2rem", height: "auto" }}
          priority
        />
      </span>
      <span className="text-md font-bold whitespace-nowrap">Economic Plus</span>
    </header>
  )
}
