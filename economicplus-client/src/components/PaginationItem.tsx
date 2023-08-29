import { ButtonHTMLAttributes } from "react"

interface PaginationItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  number: number
  isCurrent?: boolean
  onPageChange: (page: number) => void
}

export function PaginationItem({ number, isCurrent, onPageChange, ...props }: PaginationItemProps) {
  return (
    <button
      className={`w-8 h-8 rounded text-cyan-500 bg-transparent border border-cyan-500 hover:bg-cyan-500 hover:text-black disabled:bg-cyan-500 disabled:text-black disabled:cursor-default`}
      disabled={isCurrent}
      onClick={() => {
        !isCurrent && onPageChange(number)
      }}
      {...props}
    >
      {number}
    </button>
  )
}
