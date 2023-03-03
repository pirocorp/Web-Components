# Web Components

Web Components are standard for creating reusable, encapsulated HTML tags for web pages and web apps.

- Set of Web standards available across all major browsers
- Sharing UI elements across solutions
- Run on different frameworks, application programming models, and technology stacks
- Broad community support
- Maintain code readability, reduce app size, and simplify debugging
- Accomplish consistency across current and future technologies

Web Components consist of 4 standards:

- Custom Elements
- Shadow DOM
- HTML Template
- HTML Imports

## Custom Elements

Define custom element:

```js
class CustomElement extends HTMLElement {
};

window.customElements.define('custom-element',  CustomElement);
```

Usage:

```html
<custom-element>My Custom Element</custom-element>
```

## Rules for creating custom elements

- The name of a custom element must contain a dash (-). So `<x-tags>`, `<my-element>`, and `<my-awesome-app>` are all valid names, while `<tabs>` and `<foo-bar>` are not. This requirement is so the HTML parser can distinguish custom elements from regular elements. It also ensures forward compatibility when new tags are added to HTML.

- You can only register the same tag once. Attempting to do so will throw DOMException. Once you've told the browser about a new tag, there are no takebacks.

- Custom Elements cannot be self-closing because HTML only allows a few elements to be self-closing. Always write a closing tag(`<custom-element></custom-element>`).

## Shadow DOM

**Shadow DOM** is just normal **DOM** with two differences:
- how it's created/used
- how it behaves with the rest of the page

**Shadow host** is the element that **shadow DOM** is attached to.












