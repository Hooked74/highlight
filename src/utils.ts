enum NodeTypes {
  Text = 3
}

export function isTextNode(node: Node): boolean {
  return node.nodeType === NodeTypes.Text;
}

export function addClassName(node: Element, className: string): void {
  node.className = `${node.className} ${className}`.trim();
}

export function removeClassName(node: Element, className: string): void {
  node.className = node.className.replace(new RegExp(`\\s*${className}\\s*`), " ").trim();
}
