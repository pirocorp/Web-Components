// Wrap CollapsiblePanelInReact component inside a custom HTML element we need to take care of a few things:
// - Pass the title and children props
// - Re-render when the title prop is changing
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import retargetEvents from 'react-shadow-dom-retarget-events';
import CollapsibleReact from './CollapsiblePanelReact';

// Our class will include 2 members the title and mount point, 
// which will be responsible to hold the mounting point in the DOM:
export default class CollapsiblePanel extends HTMLElement {
    // A span which is going to be our mounting point.
    mountPoint: HTMLSpanElement = document.createElement('span');
    title: string = this.hasAttribute("title")
        ? this.getAttribute("title") ?? '' 
        : 'No Title';
    
    // Observed attributes for the attributeChangedCallback custom element life cycle event. 
    static get observedAttributes() {
        return ['title'];
    }

    // The function is getting the title which will be used by the React component.
    // Then, the function uses React’s createElement function to create 
    // the CollapsibleReact component instance. 
    // The createElement also receives the props object as a second argument 
    // and the children prop as third argument.
    createCollapsed(title: string) {
        return React.createElement(CollapsibleReact, { title }, React.createElement('slot'));
    }

    // Mounting the React component.
    // We will use the custom element’s connectedCallback life cycle event to do that:
    connectedCallback() {
        // Use the attachShadow function to create a shadow root which will be 
        // our boundary between the app and the React component. 
        const shadowRoot = this.attachShadow({ mode: 'open' });
        // Append the mounting point to the shadow root. 
        shadowRoot.appendChild(this.mountPoint);    
    
        this.title = this.getAttribute('title') ?? '';
        // Use ReactDOM to render the React component (ReactElement, Container)
        ReactDOM.render(this.createCollapsed(this.title), this.mountPoint);
        // Re-targeting React Events
        // React event system is relying on synthetic events, which are wrappers on top of the browser native events.
        // All the events in React are pooled and will be registered on the document itself.
        // That behavior can be very problematic when you use shadow DOM. In shadow DOM, the shadowed DOM fragment exists in its own DOM fragment.
        // That means that React events won’t work inside the shadowed part.
        // retargetEvents function helps to register the events inside the shadow DOM and to make them work as expected.
        retargetEvents(shadowRoot);
    }

    // Re-render the component if the title changes. Custom element life cycle event.
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === 'title') {
            // When the title changes we use ReactDOM render function again.
            // Since we saved the mounting point, ReactDOM will do all the re-rendering 
            // heavy lifting and will calculate the diffs for us.    
            ReactDOM.render(this.createCollapsed(newValue), this.mountPoint);
        }
    }
}

//window.customElements.define('collapsible-panel', CollapsiblePanel);
