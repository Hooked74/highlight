declare namespace HighlightCommon {
  type HighlightedId = string;
  type HighlightedNodesWithTheSameId = [Text, Node[]];
  type HighlightedNodes = HighlightedNodesWithTheSameId[];

  interface Options {
    id: HighlightedId;
    className: string;
  }

  type BrokenString = [string, string, string];
  type BrokenStringNodes = Node[];

  type NodeIteratorHandler = (node: Node, startOffset?: int, endOffset?: int) => Node;
}

import H74_H = HighlightCommon;
