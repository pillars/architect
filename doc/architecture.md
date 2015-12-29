# Architecture of the project

## Vocabulary

- A `flexContainer` is a component that will hold rows or columns. It has many
`flexItems`.
- A `flexItem` is either a row or a column. It always belongs to a
`flexContainer`. It can contain a `flexContent` or another `flexContainer`.
- A `flexContent` is a div in which you can input content: text, images, or
whatever you feel like.

## Dimensions

- `usedSpace`: The space used by fixed elements.
- `freeSpace`: The available space in a container.

## Known limitations

Models for `flexContainer` and `flexItem` have information both about how they
are defined and how they are rendered. For instance, you can define a
width of `100%` which will render as `1900px`.

Because of this design decision, it means that `flexContainers` and `flexItems`
can only be rendered once. I can't honestly think of why you would wend multiple
instances at the moment. I'd rather keep the code simple and refactor later
than overcomplicate the architecture just yet.
