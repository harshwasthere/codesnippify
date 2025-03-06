export const homeFeatureSectionCode = `// Create and save a snippet
const snippet = {
  title: "Hello World",
  language: "JavaScript",
  code: "console.log('Hello, World!');",
};

// Save snippet
saveSnippet(snippet);

function saveSnippet(snippet) {
  console.log(\`Snippet saved!\`);
}
`;

export const fuseOptions = {
  threshold: 0.1,
  ignoreLocation: true,
  distance: 100,
  keys: ["title", "description", "language", "code", "tags"],
};
