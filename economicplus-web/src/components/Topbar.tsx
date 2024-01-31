import { AlignJustify } from "lucide-react"
import { SelectCategory } from "./SelectCategory"
import { UserInfo } from "./UserInfo"

interface TopbarProps {
  expandedSidebar: () => void
}

export function Topbar({ expandedSidebar }: TopbarProps) {
  return (
    <nav className="w-full h-16 flex items-center justify-between px-2 bg-gray-900 rounded-2xl">
      <div className="w-16 h-16 flex items-center justify-center cursor-pointer" onClick={expandedSidebar}>
        <AlignJustify size={35} />
      </div>

      <SelectCategory />

      <div className="flex items-center justify-center gap-2 pr-2">
        <UserInfo />
      </div>
    </nav>
  )
}
