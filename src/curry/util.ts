export function isArray(value: any): value is any[] {
  return Array.isArray(value)
}

export function toEl<T = Element>(node: Node): T {
  //@ts-ignore
  return node as T
}
