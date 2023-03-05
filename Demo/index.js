class CustomElement extends HTMLElement {
};

window.customElements.define('custom-element',  CustomElement);

const header = document.createElement('header');
const shadowRoot = header.attachShadow({mode: 'open'});
shadowRoot.innerHTML = '<h1>Hello Shadow DOM</h1>';

const body = document.getElementById('body');
body.prepend(header);

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