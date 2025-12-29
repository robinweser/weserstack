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
    create: utils.createNode<T>,
    get: (id: string, rootNode: T = tree) => utils.getNode(rootNode, id),
    clone: (id: string) => utils.cloneNode(tree, id),
    getParent: (id: string) => utils.getParentNode(tree, id),
    find: (condition: (node: T) => boolean) => utils.findNode(tree, condition),
    findAll: (condition: (node: T) => boolean) =>
      utils.findAllNode(tree, condition),
    // actions
    update: (id: string, newNode: Partial<NodeInput>) =>
      setTree((tree) => utils.updateNode(tree, id, newNode)),
    replace: (id: string, newNode: T) =>
      setTree((tree) => utils.replaceNode(tree, id, newNode)),
    remove: (id: string) => setTree((tree) => utils.removeNode(tree, id)),
    add: (id: string, newNode: T) =>
      setTree((tree) => utils.addNode(tree, id, newNode)),
    insert: (id: string, index: number, newNode: T) =>
      setTree((tree) => utils.insertNode(tree, id, index, newNode)),
    move: (id: string, parentId: string, index?: number) =>
      setTree((tree) => utils.moveNode(tree, id, parentId, index)),
  }
}
