import { PaginationItem } from "./PaginationItem"

const siblingsCount = 2

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter(page => page > 0)
}

interface PaginationProps {
  totalCountOfRegisters: number | undefined
  registersPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.ceil(Number(totalCountOfRegisters) / registersPerPage)
  const previousPages = currentPage > 1 ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1) : []
  const nextPages =
    currentPage < lastPage ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage)) : []

  return (
    <nav className="min-h-[56px] max-h-[56px] flex items-center justify-center gap-1">
      {currentPage > 1 + siblingsCount && (
        <>
          <PaginationItem onPageChange={onPageChange} number={1} />
          {currentPage > 2 + siblingsCount && <span className="text-cyan-500">{"<<"}</span>}
        </>
      )}

      {previousPages.length > 0 &&
        previousPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}

      <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

      {nextPages.length > 0 &&
        nextPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}

      {currentPage + siblingsCount < lastPage && (
        <>
          {currentPage + 1 + siblingsCount < lastPage && <span className="text-cyan-500">{">>"}</span>}
          <PaginationItem onPageChange={onPageChange} number={lastPage} />
        </>
      )}
    </nav>
  )
}
