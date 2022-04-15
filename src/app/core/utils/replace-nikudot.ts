export function replaceNekudot(verb: string): string {
  return verb.replace(/[\u0591-\u05C7]/g, '').trim()
}
