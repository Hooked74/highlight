import { addClassName } from "./utils";

export default class NodeReplacer {
  public static readonly attribute: string = "data-id";

  public static expandElement(element: Element): void {
    const parent: Element = element.parentNode as Element;
    element.insertAdjacentHTML("afterend", element.innerHTML);
    parent.removeChild(element);
    parent.innerHTML = parent.innerHTML; // collapse text nodes
  }

  constructor(private options: H74_H.Options) {}

  public readonly replaceTextNode = (node: Text, startOffset: int, endOffset: int): Text => {
    const { id, className }: H74_H.Options = this.options;
    const [
      firstPartOfString,
      stringToBeWrapped,
      lastPartOfString
    ]: H74_H.BrokenString = this.breakTextContent(node, startOffset, endOffset);

    if (stringToBeWrapped) {
      const fragment: DocumentFragment = document.createDocumentFragment();

      if (firstPartOfString) {
        fragment.appendChild(document.createTextNode(firstPartOfString));
      }

      const wrapper: HTMLSpanElement = document.createElement("span");
      wrapper.innerHTML = stringToBeWrapped;
      wrapper.setAttribute(NodeReplacer.attribute, id);
      if (className) addClassName(wrapper, className);
      fragment.appendChild(wrapper);

      if (lastPartOfString) {
        fragment.appendChild(document.createTextNode(lastPartOfString));
      }

      const lastTextNode: Text =
        (fragment.lastChild.firstChild as Text) || (fragment.lastChild as Text);

      this.replaceTextNodeWithBrokenString(node, fragment);

      return lastTextNode;
    }

    return node;
  };

  private replaceTextNodeWithBrokenString(textNode: Text, fragment: DocumentFragment): void {
    const parentNode: Node = textNode.parentNode;

    parentNode.insertBefore(fragment, textNode);
    parentNode.removeChild(textNode);
  }

  private breakTextContent(node: Text, startOffset: int, endOffset: int): H74_H.BrokenString {
    const content: string = node.textContent;

    startOffset = startOffset || 0;
    endOffset = endOffset || content.length;

    return [
      content.slice(0, startOffset),
      content.slice(startOffset, endOffset),
      content.slice(endOffset, content.length)
    ];
  }
}
