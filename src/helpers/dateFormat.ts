export function dateFormat(date:string): string {
  return new Date(date).toLocaleDateString('pt-BR')
}