let markdown = `# Welcome to my jQuery Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Here's some code, \`<div></div>\`, between 2 backticks.

\`\`\`
\/\/ this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

We also have [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![jQuery Logo w/ Text](https://upload.wikimedia.org/wikipedia/commons/8/81/JQuery_logo_text.svg)`;
const editor = $("#editor");
editor.val(markdown); 
  
const editCallback = () => {
  try {
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code, language) {
      const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
      return hljs.highlight(validLanguage, code).value;
    },
    pedantic: false,
    gfm: true,
    breaks: true,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  });
 } catch (err) {
    console.log(`Error ${err} occurred when using marked.Renderer() contructor`);
}
const cleanHTML = DOMPurify.sanitize(marked(markdown));

$("#preview").html(cleanHTML);
}

window.onload = editCallback;
editor.on("keyup keypress blur change", () => {
  markdown = edior.val();
  editCallback();
});
