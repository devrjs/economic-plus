import { InputHTMLAttributes, ReactElement, forwardRef } from "react"
import { FieldError } from "react-hook-form"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactElement
  error?: FieldError
  bgColor?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ icon, error, bgColor, ...props }, ref) => {
  return (
    <div
      className={`w-full h-12 flex items-center gap-2 pl-3 pr-2 rounded  ${
        bgColor ?? "bg-gray-900"
      }  focus-within:ring-2 ${!!error ? "redFocus ring-red-500" : "cyanFocus ring-cyan-400"}`}
    >
      {icon && (
        <span className="w-full max-w-[30px] h-full flex items-center justify-center text-gray-400">{icon}</span>
      )}

      <input
        ref={ref}
        className={`w-full h-12 outline-none bg-transparent placeholder:text-gray-400 webkit-autofill`}
        {...props}
      />
    </div>
  )
})
