export function useDateFormatToUTC(dateStr: string) {
  const parts = dateStr.split("/")
  const newDateStr = parts[2] + "/" + parts[1] + "/" + parts[0]

  return newDateStr
}
