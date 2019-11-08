import uniqueId from "lodash/uniqueId";
import NodeIterator from "./NodeIterator";
import NodeReplacer from "./NodeReplacer";
import { isTextNode } from "./utils";

export default class Highlight {
  public fromSelection(options?: Partial<H74_H.Options>): H74_H.HighlightedId {
    let id: H74_H.HighlightedId = null;
    const selection: Selection = window.getSelection();

    if (!selection.isCollapsed) {
      id = this.fromRange(selection.getRangeAt(0), options);
      this.selectHighlightedRange(id, selection);
    }

    return id;
  }

  public fromRange(range: Range, options?: Partial<H74_H.Options>): H74_H.HighlightedId {
    return !range.collapsed
      ? this.fromNodes(
          range.startContainer,
          range.endContainer,
          range.startOffset,
          range.endOffset,
          options
        )
      : null;
  }

  public fromNodes(
    startNode: Node,
    endNode: Node,
    startOffset?: int,
    endOffset?: int,
    options?: Partial<H74_H.Options>
  ): H74_H.HighlightedId {
    if (startNode instanceof Node && endNode instanceof Node) {
      options = this.getSafeOptions(options);

      const nodeReplacer: NodeReplacer = new NodeReplacer(options as H74_H.Options);

      if (startNode === endNode && isTextNode(startNode)) {
        nodeReplacer.replaceTextNode(startNode as Text, startOffset, endOffset);
      } else {
        const nodeIterator: NodeIterator = new NodeIterator(nodeReplacer.replaceTextNode);
        nodeIterator.iterate(startNode, endNode, startOffset, endOffset);
      }

      return options.id;
    }

    return null;
  }

  public remove(id: H74_H.HighlightedId): void {
    let wrapper: Element;
    while ((wrapper = document.querySelector(`[${NodeReplacer.attribute}="${id}"]`))) {
      NodeReplacer.expandElement(wrapper);
    }
  }

  private getSafeOptions(options: Partial<H74_H.Options>): H74_H.Options {
    return Object.assign(Object.seal({ id: uniqueId(), className: "highlight" }), options);
  }

  private selectHighlightedRange(id: H74_H.HighlightedId, selection: Selection): void {
    const highlightedNodes: NodeListOf<Element> = document.querySelectorAll(
      `[${NodeReplacer.attribute}="${id}"]`
    );
    const range: Range = new Range();

    range.setStartBefore(highlightedNodes[0]);
    range.setEndAfter(highlightedNodes[highlightedNodes.length - 1]);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
