function get(document: Document, selector: string): HTMLElement {
  const element: HTMLElement = document.querySelector(selector);

  Cypress.log({
    name: "GET",
    message: selector as any
  })
    .set({ $el: element as any })
    .snapshot()
    .end();

  return element;
}

function click(element: HTMLElement): void {
  element.click();
  Cypress.log({
    name: "CLICK",
    message: `${element.id}` as any
  })
    .set({ $el: element as any })
    .snapshot()
    .end();
}

function selectRange(
  selection: Selection,
  fromNode: Node,
  fromIndex: int,
  toNode: Node,
  toIndex: int
): void {
  const range: Range = new Range();

  range.setStart(fromNode, fromIndex);
  range.setEnd(toNode, toIndex);

  selection.removeAllRanges();
  selection.addRange(range);

  Cypress.log({
    name: "SELECT",
    message: `${selection.toString()}` as any
  })
    .set({ $el: range as any })
    .snapshot()
    .end();
}

describe("Highlight", () => {
  beforeEach(() => {
    cy.visit("/iframe.html?id=text-highlighting--highlight-from-selection");
  });

  it("Content should be the same before highlighting and its removal and after", () => {
    cy.window().then((win: Window) => {
      const selection: Selection = win.getSelection();

      return cy.get("#content").then((content: JQuery) => {
        const document: Document = win.document;
        const initialHTML: string = content.html();
        const b1: HTMLElement = get(document, "#b1");
        const b2: HTMLElement = get(document, "#b2");
        const random: HTMLElement = get(document, "#random");

        let fromNode: Node = get(
          document,
          "body > div:nth-of-type(3) > div > div > p:nth-of-type(1) > b:nth-of-type(1)"
        ).childNodes[0];
        let toNode: Node = get(
          document,
          "body > div:nth-of-type(3) > div > div > p:nth-of-type(2) > i"
        ).childNodes[0];
        selectRange(selection, fromNode, 1, toNode, toNode.textContent.length - 3);
        click(b1); // highlight in green
        click(b2); // highlight in brown

        fromNode = get(
          document,
          "body > div:nth-of-type(3) > div > div > p:nth-of-type(1) > b:nth-of-type(1)"
        );
        selectRange(selection, fromNode, 0, fromNode, fromNode.childNodes.length);
        click(b1);

        fromNode = get(
          document,
          "body > div:nth-of-type(3) > div > div > p:nth-of-type(1) > span:nth-of-type(3) > span > span"
        ).childNodes[0];
        selectRange(selection, fromNode, 21, fromNode, 44);
        click(b1);

        fromNode = get(
          document,
          "body > div:nth-of-type(3) > div > div > p:nth-of-type(1) > span:nth-of-type(4) > span"
        ).childNodes[0];
        toNode = get(
          document,
          "body > div:nth-of-type(3) > div > div > p:nth-of-type(1) > i > span > span"
        ).childNodes[0];
        selectRange(selection, fromNode, 21, toNode, 7);
        click(b1);

        click(random);
        click(random);
        click(random);
        click(random);
        click(random);

        cy.get("#content").should("have.html", initialHTML);
      });
    });
  });
});

export default {};
