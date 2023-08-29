import { SearchIcon } from "lucide-react"
import { SetStateAction, useRef } from "react"

interface SearchProps {
  setSearchValue: React.Dispatch<SetStateAction<string>>
}

export function Search({ setSearchValue }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearchClick = () => {
    setSearchValue(String(inputRef.current!.value))
  }

  return (
    <div className="w-full sm:max-w-[350px] h-full min-h-[48px] max-h-[48px] flex items-center pl-4 pr-1 bg-gray-800 rounded-2xl focus-within:ring-2 ring-cyan-400">
      <input
        ref={inputRef}
        className="w-full h-full outline-none bg-transparent text-gray-100 placeholder:text-gray-400"
        placeholder="Pesquisar..."
      />
      <button
        className="text-[22px] p-2 bg-purple-500 hover:bg-purple-400 text-black rounded-xl"
        onClick={handleSearchClick}
      >
        <SearchIcon size={22} />
      </button>
    </div>
  )
}
