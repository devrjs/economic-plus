import { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`w-full h-12 flex items-center justify-center px-4 rounded outline-none bg-cyan-500 hover:bg-cyan-400 transition-colors text-md font-medium text-black focus:ring-2 ring-white ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
