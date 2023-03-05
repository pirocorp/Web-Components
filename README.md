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

### Rules for creating custom elements

- The name of a custom element must contain a dash (-). So `<x-tags>`, `<my-element>`, and `<my-awesome-app>` are all valid names, while `<tabs>` and `<foo-bar>` are not. This requirement is so the HTML parser can distinguish custom elements from regular elements. It also ensures forward compatibility when new tags are added to HTML.

- You can only register the same tag once. Attempting to do so will throw DOMException. Once you've told the browser about a new tag, there are no takebacks.

- Custom Elements cannot be self-closing because HTML only allows a few elements to be self-closing. Always write a closing tag(`<custom-element></custom-element>`).

## Shadow DOM

**Shadow DOM** is just normal **DOM** with two differences:
- how it's created/used
- how it behaves with the rest of the page

**Shadow host** is the element that **shadow DOM** is attached to.

**Shadow DOM fixes CSS and DOM.** It introduces **scoped styles** to the web platform. Therefore, it brings solutions to common problems in web development:

- **Isolated DOM** - A component's DOM is self-contained (e.g., document.querySelector() won't return nodes in the component's shadow DOM).
- **Scoped CSS** - CSS defined inside shadow DOM is scoped to it. Style rules don't leak out, and page styles don't bleed in.
- **Composition** - Design a declarative, markup-based API for your component.
- **Simplifies CSS** - Scoped DOM means using simple CSS selectors, more generic id/class names, and not worrying about naming conflicts.
- **Productivity** - Think of apps in chunks of DOM rather than one large (global) page.


### Creating Shadow DOM

A **shadow root** is a document fragment attached to a "host" element.

```js
const header = document.createElement('header');
const shadowRoot = document.attachShadow({mode: 'open'});
shadowRoot.innerHTML = '<h1>Hello Shadow DOM</h1>';
```

You cannot add a shadow root element for which the browser creates a shadow DOM.

```js
document.createElement('input').attachShadow({mode: 'open'});
// Error. `<input>` cannot host shadow dom.
```

Create Custom Element with Shadow DOM

```js
class CustomButtonElement extends HTMLElement{
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: "open"});
        shadowRoot.innerHTML = this.template('Custom Button');
        shadowRoot.appendChild(this.style());
    }

    template(name) {
        return `
<button id="custom-button">
    <img src="button.svg" width="160" height="32" />
    &nbsp;
    <span>${name}</span>
</button>`
    };

    style(){
        let style = document.createElement("style");

        style.textContent = `
button {
    display: flex;
    align-items: center;
    position: relative;

    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
}

span {
    position: absolute;
    left: 30px;
    top: 7px;
}`;

        return style;
    }
};

(function() {
    window.customElements.define("custom-button", CustomButtonElement);
})();
```

Usage:

```html
<custom-button></custom-button>
```


## Resources

- [Shadow DOM v1 - Self-Contained Web Components](https://web.dev/shadowdom-v1/)




