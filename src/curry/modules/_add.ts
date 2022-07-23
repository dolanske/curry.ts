// append

import { $, Curry } from ".."
import { VNode } from "../types"

type NewNode =
  | Element
  | Element[]
  | string
  | string[]
  | Node
  | Node[]
  | VNode
  | VNode[]

export type Add = (
  this: Curry,
  nodes: NewNode,
  location?: "prepend" | "append"
) => Curry
