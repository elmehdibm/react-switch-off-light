import React, { Component, Fragment } from 'react';

const id = "react-switch-off-component-by-mdx";

const holderStyle = "position: absolute;" +
    "width: 100%;" +
    "height: 100%;" +
    "left: 0;" +
    "top: 0;" +
    "margin: 0;" +
    "z-index: 1999999999;" +
    "background-color: black;" +
    "opacity: 0.9";

const lightHolderStyle = (width, height, left, top) => ("width: " + width + "px;" +
    "height: " + height + "px;" + "z-index: 1999999999;" +
    "left: " + left + "px;" +
    "top: " + top + "px;" +
    "background-color: black;" + "position: absolute;" +
    "opacity: 0.9");

const lightedContentStyle = "z-index: 2000000000;" +
    "position: absolute;" +
    "background-color : white";

class LightComponent extends Component {
    render() {
        const { children, keyId } = this.props;
        console.log("Light Zone " + keyId + " Rendered");
        return (
            <Fragment>
                <div id={id + "__light-holder" + keyId} />
                <div id={id + "__register-values" + keyId}>
                    {children}
                </div>
            </Fragment>
        )
    }
};

class ContentComponent extends Component {
    render() {
        const { children, keyId } = this.props;
        console.log("Component " + keyId + " Rendered");
        return (
            <Fragment>
                <div id={id + "__global-holder" + keyId} />
                <div id={id + "__content" + keyId} >
                    {children}
                </div>
            </Fragment>
        )
    }
};

function FocusedContentClass() {
    this.Component = null;
    this.LightZone = null;
    this.switchOff = function switchOff(key = 0) {
        console.log("Will Switch Off, key is ", key);
        const lightedHolder = document.getElementById(id + "__light-holder" + key);
        const containerHolder = document.getElementById(id + "__register-values" + key);
        if (containerHolder !== null && containerHolder.childElementCount > 0) {
            lightedHolder.onclick = this.switchOn(key);
            lightedHolder.setAttribute("style", lightHolderStyle(
                containerHolder.offsetWidth,
                containerHolder.offsetHeight,
                containerHolder.offsetLeft,
                containerHolder.offsetTop
            ));
        } else {
            const holder = document.getElementById(id + "__global-holder" + key);
            holder.onclick = this.switchOn(key);
            holder.setAttribute("style", holderStyle);
        }
        const content = document.getElementById(id + "__content" + key);
        if (content !== null) {
            content.setAttribute("style", lightedContentStyle);
        }
    }

    this.switchOn = (key) => {
        return function switchOn() {
            const lightedHolder = document.getElementById(id + "__light-holder" + key);
            const containerHolder = document.getElementById(id + "__register-values" + key);
            if (containerHolder !== null && containerHolder.childElementCount > 0) {
                lightedHolder.setAttribute("style", "");
                lightedHolder.onclick = () => ({});
            } else {
                const holder = document.getElementById(id + "__global-holder" + key);
                holder.setAttribute("style", "");
                holder.onclick = () => ({});
            }

            const content = document.getElementById(id + "__content" + key);
            if (content !== null) {
                content.setAttribute("style", "");
            }
        }
    }

    this.construct = function construct() {
        this.Component = ({ children, keyId = 0 }) => (<ContentComponent
            children={children}
            keyId={keyId}
        />);
        this.LightZone = ({ children, keyId = 0 }) => (<LightComponent
            children={children}
            keyId={keyId}
        />);
    }
};

const FocusedContent = new FocusedContentClass();

console.group("Construction of the React Switch Off Core");
FocusedContent.construct();
console.log("The Instance is ", FocusedContent);
console.groupEnd();

export default FocusedContent;
