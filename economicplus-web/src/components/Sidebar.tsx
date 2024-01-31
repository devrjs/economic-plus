import { Coins, HelpingHand, LayoutDashboard, LogOut, Tags, User, Wallet } from "lucide-react"
import { LogoName } from "./LogoName"
import { SidebarLink } from "./SidebarLink"

interface SidebarProps {
  expanded: boolean
}

export function Sidebar({ expanded }: SidebarProps) {
  return (
    <aside
      className={`${
        expanded ? "w-72 lg:w-16 block" : "w-16 lg:w-72 hidden lg:block"
      } h-fit py-2 bg-gray-900 rounded-2xl duration-500`}
    >
      <div className="ml-4 overflow-hidden">
        <LogoName />
      </div>

      <ul className="overflow-hidden text-gray-200">
        <SidebarLink href="/dashboard" name="Dashboard" icon={<LayoutDashboard />} />
        <SidebarLink href="/finances" name="Finanças Realizadas" icon={<Coins />} />
        <SidebarLink href="/pendencies" name="Finanças Pendetes" icon={<HelpingHand />} />
        <SidebarLink href="/category" name="Categorizar Finança" icon={<Tags />} />
        <SidebarLink href="/goals" name="Carteira e Metas" icon={<Wallet />} />
        <SidebarLink href="/profile" name="Perfil do Usuário" icon={<User />} />
      </ul>

      <a href="/api/auth/logout" className="w-full flex items-center overflow-hidden rounded-b-2xl hover:text-red-500">
        <span className="min-w-[60px] h-14 flex items-center justify-center text-[32px]">
          <LogOut />
        </span>
        <span className="whitespace-nowrap px-2">Deslogar</span>
      </a>
    </aside>
  )
}
