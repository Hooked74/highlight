import "@atlaskit/css-reset";
import "./index.css";

export default (storyFn: (...args: any[]) => any) => {
  const root: HTMLDivElement = document.createElement("div");
  root.style.minHeight = "100vh";
  root.innerHTML = `
    <div id="content">
      <p>Lorem, ipsum <b>dolor sit amet</b> consectetur <b>adipisicing</b> elit. <span>Inventore rerum quae pariatur? Velit corporis ex consequatur</span> ipsa ab mollitia, saepe nesciunt eum nobis deserunt <i>nostrum quibusdam, repellendus impedit, animi accusamus?</i></p>
      <p>Lorem, ipsum dolor <i>sit amet</i> consectetur <span>adipisicing elit</span>. <div>Inventore rerum quae pariatur? Velit corporis ex consequatur ipsa ab mollitia, saepe nesciunt eum nobis <span>deserunt nostrum quibusdam, repellendus impedit,</span> animi accusamus?</div></p>
      <p>Lorem, ipsum dolor sit <span>amet consectetur adipisicing</span> elit. <span>Inventore rerum quae pariatur? Velit corporis ex consequatur ipsa ab</span> mollitia, saepe nesciunt <b>eum nobis deserunt</b> <i>nostrum quibusdam, repellendus impedit</i>, animi accusamus?</p>
    </div>
  `;
  root.insertBefore(storyFn(), root.firstChild);

  return root;
};
