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

## Slot Element

Shadow DOM composes different DOM trees together using the <slot> element. Slots are placeholders inside your component that users can fill with their own markup. By defining one or more slots, you invite outside markup to render in your component's shadow DOM. Essentially, you're saying "Render the user's markup over here".

Note: Slots are a way of creating a "declarative API" for a web component. They mix-in the user's DOM to help render the overall component, thus, composing different DOM trees together.

### Light DOM

Light DOM - The markup a user of your component writes. This DOM lives outside the component's shadow DOM. It is the element's actual children 
```js
<custom-button>
    <span slot="button-name">Custom Button</span>
</custom-button>
```

Shadow DOM - The DOM a component author writes. Shadow DOM is local to the component and defines its internal structure, scoped CSS, and encapsulates your implementation details. It can also define how to render markup that's authored by the consumer of your component. 

```html
<button id="custom-button">
    <img src="button.svg" width="160" height="32" />
    &nbsp;
    <span>${name}</span>
</button>
```

Flattened DOM tree - The result of the browser distributing the user's light DOM into your shadow DOM, rendering the final product. The flattened tree is what you ultimately see in the DevTools and what's rendered on the page.


Slot Example:

Elements are allowed to "cross" the shadow DOM boundary when a \<slot\> invites them in. These elements are called **distributed nodes**. Conceptually, distributed nodes can seem a bit bizarre. Slots don't physically move DOM; they render it at another location inside the shadow DOM.

A component can define zero or more slots in its shadow DOM. Slots can be empty or provide fallback content. If the user doesn't provide light DOM content, the slot renders its fallback content.

You can also create named slots. Named slots are specific holes in your shadow DOM that users reference by name.

```js
class CustomButtonElement extends HTMLElement{
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: "open"});
        shadowRoot.innerHTML = this.template();
        shadowRoot.appendChild(this.style());
    }

    template() {
        return `
<button id="custom-button">
    <img src="button.svg" width="160" height="32" />
    &nbsp;
    <div>
        <slot name="button-name"></slot>
    </div>
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

div {
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
<custom-button>
    <span slot="button-name">Custom Button</span>
</custom-button>
```


## Resources

- [Shadow DOM v1 - Self-Contained Web Components](https://web.dev/shadowdom-v1/)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)




