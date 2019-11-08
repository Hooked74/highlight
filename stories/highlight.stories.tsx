import { storiesOf } from "@storybook/html";
import Highlight from "../src";

function createButton(id: string, content: string, onclick: Handler): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement("button");
  button.id = id;
  button.innerHTML = content;
  button.onclick = onclick;

  return button;
}

storiesOf("Text highlighting", module).add("Highlight from selection", () => {
  const ids: string[] = [];
  const hl: Highlight = new Highlight();
  const fragment: DocumentFragment = document.createDocumentFragment();
  fragment.appendChild(
    createButton("b1", 'Highlight <div class="highlight square"></div>', () =>
      ids.push(hl.fromSelection())
    )
  );
  fragment.appendChild(
    createButton("b2", 'Highlight <div class="highlight2 square"></div>', () =>
      ids.push(hl.fromSelection({ className: "highlight2" }))
    )
  );
  fragment.appendChild(createButton("front", "Remove front", () => hl.remove(ids.splice(0, 1)[0])));
  fragment.appendChild(
    createButton("back", "Remove back", () => hl.remove(ids.splice(ids.length - 1, 1)[0]))
  );
  fragment.appendChild(
    createButton("random", "Random remove", () =>
      hl.remove(ids.splice(Math.floor(Math.random() * ids.length), 1)[0])
    )
  );

  return fragment;
});
