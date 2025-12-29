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
    createNode: utils.createNode<T>,
    getNode: (id: string, rootNode: T = tree) => utils.getNode(rootNode, id),
    cloneNode: (id: string) => utils.cloneNode(tree, id),
    getParentNode: (id: string) => utils.getParentNode(tree, id),
    findNode: (condition: (node: T) => boolean) =>
      utils.findNode(tree, condition),
    findAllNode: (condition: (node: T) => boolean) =>
      utils.findAllNode(tree, condition),
    // actions
    updateNode: (id: string, newNode: Partial<NodeInput>) =>
      setTree((tree) => utils.updateNode(tree, id, newNode)),
    replaceNode: (id: string, newNode: T) =>
      setTree((tree) => utils.replaceNode(tree, id, newNode)),
    removeNode: (id: string) => setTree((tree) => utils.removeNode(tree, id)),
    addNode: (id: string, newNode: T) =>
      setTree((tree) => utils.addNode(tree, id, newNode)),
    insertNode: (id: string, index: number, newNode: T) =>
      setTree((tree) => utils.insertNode(tree, id, index, newNode)),
    moveNode: (id: string, parentId: string, index?: number) =>
      setTree((tree) => utils.moveNode(tree, id, parentId, index)),
  }
}
