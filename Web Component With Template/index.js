class CustomButtonElement extends HTMLElement{
    constructor(){
        super();

        const template = document.getElementById('custom-button');
        const templateContent = template.content;

        const shadowRoot = this.attachShadow({mode: "open"});
        shadowRoot.appendChild(templateContent.cloneNode(true));

        this.addEventListener('click', () => alert('The button was clicked'));
    }
}

(function() {
    window.customElements.define("custom-button", CustomButtonElement);
})();

document.getElementsByTagName('custom-button')[0].addEventListener('click', () => console.log('Outside from the component!'));

