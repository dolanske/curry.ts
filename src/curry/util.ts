export function isArray(value: any): value is any[] {
  return Array.isArray(value)
}

export function toEl(node: Node): Element {
  return node as Element
}
