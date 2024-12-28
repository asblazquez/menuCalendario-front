export function formatDateToServer(date: Date) {
  if (!(date instanceof Date)) {
    throw new Error('Invalid date object')
  }
  date.setDate(date.getDate() + 1)
  // Formatear la fecha en ISO 8601 y extraer la parte de la fecha
  const isoString = date.toISOString()
  const dateOnlyString = isoString.substring(0, 10) // Extraer 'yyyy-MM-dd'

  return dateOnlyString
}

export function formatStringToDate(fechaString: string) {
  // Intentamos crear un objeto Date directamente a partir de la cadena
  const fecha = new Date(fechaString)

  fecha.setHours(0, 0, 0, 0)

  // Verificamos si la fecha es válida
  if (isNaN(fecha.getTime())) {
    console.error('Fecha inválida: ', fechaString)
    return null
  } else {
    return fecha
  }
}
