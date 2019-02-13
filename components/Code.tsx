import { Fragment, FunctionComponent } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/styles/hljs";
import juice from "juice";
import declassify from "declassify";
import { html } from "js-beautify";
import { ReactElementLike } from "prop-types";
import emailTemplate from "../components/emailTemplate";
// @ts-ignore
import { __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS as scSecrets } from "styled-components";

// @ts-ignore
juice.nonVisualElements = ["P", "UL", "LI"];

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

interface Props {
  children: ReactElementLike;
}

const { StyleSheet } = scSecrets;
const syntaxStyle = {
  background: "transparent",
  height: "100%",
  margin: 0,
  padding: 0,
  whiteSpace: "pre-wrap"
};

const Code: FunctionComponent<Props> = props => {
  StyleSheet.reset(true);
  const code: string = renderToStaticMarkup(props.children);
  const styleTags: string = StyleSheet.master.toHTML();
  StyleSheet.reset(false);
  return (
    <Fragment>
      <SyntaxHighlighter
        language="html"
        style={monokai}
        customStyle={syntaxStyle}
        wrapLines={true}
      >
        {pipe(
          emailTemplate,
          juice,
          declassify.process,
          html
        )({ styles: styleTags, html: code })}
      </SyntaxHighlighter>
    </Fragment>
  );
};

export default Code;
