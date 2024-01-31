import { Pencil } from "lucide-react"
import { ReactElement, SetStateAction } from "react"

interface GoalCardProps {
  icon?: ReactElement
  title: string
  value: string | undefined
  setStartingAmount?: React.Dispatch<SetStateAction<string>>
  setTargetAmount?: React.Dispatch<SetStateAction<string>>
  setTargetDate?: React.Dispatch<SetStateAction<string>>
  disabled?: boolean
  textColor: string
}

export function GoalCard({
  title,
  value,
  icon,
  setStartingAmount,
  setTargetAmount,
  setTargetDate,
  textColor,
  disabled,
}: GoalCardProps) {
  return (
    <div className="flex flex-col justify-between p-4 bg-gray-800 rounded-lg md:rounded-xl">
      <header className="flex items-center gap-3 text-xl md:text-2xl">
        {icon}
        <h3>{title}</h3>
      </header>

      <div className="mt-4 flex items-center pr-2 rounded-lg ring-cyan-400 focus-within:ring-2">
        <input
          className={`w-full h-full px-2 py-2 text-3xl md:text-4xl bg-gray-800 ${textColor} outline-none rounded-lg`}
          defaultValue={value}
          onChange={e => {
            setStartingAmount && setStartingAmount(e.target.value)
            setTargetAmount && setTargetAmount(e.target.value)
            setTargetDate && setTargetDate(e.target.value)
          }}
          disabled={disabled}
        />

        <button
          className={`${
            disabled && "hidden"
          } max-w-[48px] max-h-12 px-2 py-2 bg-purple-500 rounded-lg hover:bg-purple-400`}
        >
          <Pencil className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  )
}
