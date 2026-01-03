import { useState } from 'react'
import { type BaseNode, type BaseNodeInput } from '@weser/tree'
import * as utils from '@weser/tree'

export default function useTree<T extends BaseNode<T>>(initialTree: T) {
  type NodeInput = BaseNodeInput<T>

  const [tree, setTree] = useState<T>(initialTree)

  return {
    tree,
    setTree,
    // helpers
    traverse: (callback: (node: T) => void) => utils.traverse(tree, callback),
    create: utils.create<T>,
    get: (id: string, rootNode: T = tree) => utils.get(rootNode, id),
    clone: (id: string) => utils.clone(tree, id),
    getParent: (id: string) => utils.getParent(tree, id),
    find: (condition: (node: T) => boolean) => utils.find(tree, condition),
    findAll: (condition: (node: T) => boolean) =>
      utils.findAll(tree, condition),
    // actions
    update: (id: string, newNode: Partial<NodeInput>) =>
      setTree((tree) => utils.update(tree, id, newNode)),
    replace: (id: string, newNode: T) =>
      setTree((tree) => utils.replace(tree, id, newNode)),
    remove: (id: string) => setTree((tree) => utils.remove(tree, id)),
    add: (id: string, newNode: T) =>
      setTree((tree) => utils.add(tree, id, newNode)),
    insert: (id: string, index: number, newNode: T) =>
      setTree((tree) => utils.insert(tree, id, index, newNode)),
    move: (id: string, parentId: string, index?: number) =>
      setTree((tree) => utils.move(tree, id, parentId, index)),
  }
}
