// tslint:disable:no-console
import { addDecorator, addParameters, configure } from "@storybook/html";
import { create, ThemeVars } from "@storybook/theming";
import { version } from "../package.json";
import GlobalStylesDecorator from "./decorators/global-styles";

const theme: ThemeVars = create({
  brandName: "highlight",
  brandUrl: "https://github.com/Hooked74/highlight"
} as any);

addParameters({
  options: {
    // currently not using any addons
    showPanel: false,
    theme
  }
});

// Using theme would be good for this, but it looks like theme is just for the chrome around the story
addDecorator(GlobalStylesDecorator);

// automatically import all files ending in *.stories.ts
const req: __WebpackModuleApi.RequireContext = require.context(
  "../stories/",
  true,
  /.stories.tsx?$/
);

function loadStories(): void {
  req.keys().forEach((filename: string) => req(filename));
}

configure(loadStories, module);

// Doing this more complex check as console.table || console.log makes CI cry
const table: any = Object.prototype.hasOwnProperty.call(console, "table")
  ? console.table
  : console.log;

console.log("environment");
table([["highlight version", version], ["process.env.NODE_ENV", process.env.NODE_ENV]]);
