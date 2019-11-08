import { isTextNode } from "./utils";

export default class NodeIterator {
  constructor(private handler: H74_H.NodeIteratorHandler) {}

  public iterate(startNode: Node, endNode: Node, startOffset: int, endOffset: int): void {
    const treeWalker: TreeWalker = this.createTreeWalker(startNode, endNode);
    const endNodeIsText: boolean = isTextNode(endNode);
    const endNodeIndex: int = endOffset - 1;

    if (startNode !== endNode || startOffset !== endNodeIndex) {
      treeWalker.currentNode = isTextNode(startNode)
        ? this.handler(startNode as Text, startOffset, null)
        : startNode.childNodes[startOffset];

      this.traverseNodeTree(
        treeWalker,
        endNodeIsText
          ? (node: Node) => node !== endNode
          : (node: Node) => node !== endNode.childNodes[endNodeIndex]
      );
    }

    if (endNodeIsText) {
      treeWalker.currentNode = this.handler(endNode as Text, null, endOffset);
    } else {
      const parent: Node = (treeWalker.currentNode = endNode.childNodes[endNodeIndex]);
      this.traverseNodeTree(treeWalker, (node: Node) => parent.contains(node));
    }
  }

  private traverseNodeTree(treeWalker: TreeWalker, condition: Handler): void {
    let prevNode: Node;
    while (prevNode !== treeWalker.currentNode && condition(treeWalker.currentNode)) {
      if (isTextNode(treeWalker.currentNode)) {
        treeWalker.currentNode = this.handler(treeWalker.currentNode as Text, null, null);
      }
      prevNode = treeWalker.currentNode;
      treeWalker.nextNode();
    }
  }

  private createTreeWalker(startNode: Node, endNode: Node): TreeWalker {
    const range: Range = new Range();
    range.setStart(startNode, 0);
    range.setEnd(endNode, 0);

    return document.createTreeWalker(
      range.commonAncestorContainer,
      NodeFilter.SHOW_ALL,
      null,
      false
    );
  }
}
