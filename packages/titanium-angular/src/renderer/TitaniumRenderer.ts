import {
    Renderer2,
    RendererStyleFlags2
} from '@angular/core'

import {
    Logger
} from '../log';

import {
    CommentNode,
    ElementNode,
    EmulatedRootNode,
    NodeInterface,
    TitaniumElementNode,
    TitaniumElementRegistry,
    TextNode
} from '../vdom';

export class TitaniumRenderer extends Renderer2 {
    private elementRegistry: TitaniumElementRegistry;

    private logger: Logger;

    constructor(elementRegistry: TitaniumElementRegistry, logger: Logger) {
        super();

        this.logger = logger;
        this.elementRegistry = elementRegistry;

        this.logger.trace('Created a new TitaniumRenderer instance');
    }

    get data(): { [key: string]: any } {
        return Object.create(null);
    }

    destroy(): void {
        this.logger.trace('TitaniumRenderer.destroy');
    }

    createElement(name: string, namespace?: string | null): NodeInterface {
        this.logger.debug(`TitaniumRenderer.createElement ${name}`);
        if (this.elementRegistry.isTitaniumView(name)) {
            let createView = this.elementRegistry.getViewFactory(name);
            const node = new TitaniumElementNode(name, createView(), this.logger);
            node.meta = this.elementRegistry.getViewMetadata(name);
            return node;
        } else {
            return new ElementNode(name);
        }
    }

    createComment(value: string): CommentNode {
        this.logger.debug(`TitaniumRenderer.createComment: ${value}`);
        return new CommentNode(value);
    }

    createText(value: string): TextNode {
        this.logger.debug(`TitaniumRenderer.createText: ${value}`);
        return new TextNode(value);
    }

    appendChild(parent: NodeInterface, newChild: NodeInterface): void {
        this.logger.debug(`TitaniumRenderer.appendChild ${newChild} -> ${parent}`);
        if (!parent) {
            this.logger.debug('Parent is not available, skipping.');
            return;
        }

        parent.appendChild(newChild);
    }

    insertBefore(parent: NodeInterface, newChild: NodeInterface, refChild: NodeInterface): void {
        this.logger.debug(`TitaniumRenderer.insertBefore ${newChild} before ${refChild} in ${parent}`);
        parent.insertBefore(newChild, refChild);
    }

    removeChild(parent: NodeInterface, oldChild: NodeInterface): void {
        this.logger.debug(`TitaniumRenderer.removeChild ${oldChild} from ${parent}`);
        parent.removeChild(oldChild);
    }

    selectRootElement(selectorOrNode: string | any): ElementNode {
        this.logger.debug(`TitaniumRenderer.selectRootElement ${selectorOrNode}`);
        return new EmulatedRootNode();
    }

    parentNode(node: NodeInterface): any {
        this.logger.debug(`TitaniumRenderer.parentNode(${node}) -> ${node.parentNode}`);
        return node.parentNode;
    }

    nextSibling(node: NodeInterface): any {
        this.logger.debug(`TitaniumRenderer.nextSibling(${node}) -> ${node.nextSibling}`);
        return node.nextSibling;
    }

    setAttribute(el: ElementNode, name: string, value: string, namespace?: string | null): void {
        this.logger.debug(`TitaniumRenderer.setAttribute(${el}, ${name}, ${value})`);
        // @todo consider namespace
        el.setAttribute(name, value);
    }

    removeAttribute(el: ElementNode, name: string, namespace?: string | null): void {
        this.logger.debug(`TitaniumRenderer.removeAttribute`);
    }

    addClass(el: any, name: string): void {
        this.logger.debug(`TitaniumRenderer.addClass`);
    }

    removeClass(el: any, name: string): void {
        this.logger.debug(`TitaniumRenderer.removeClass`);
    }

    setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void {
        this.logger.debug(`TitaniumRenderer.setStyle`);
    }

    removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void {
        this.logger.debug(`TitaniumRenderer.removeStyle`);
    }

    setProperty(el: any, name: string, value: any): void {
        this.logger.debug(`TitaniumRenderer.setProperty`);
    }

    setValue(node: NodeInterface, value: string): void {
        this.logger.debug(`TitaniumRenderer.setValue(${node}, ${value})`);
    }

    listen(target: ElementNode, eventName: string, callback: (event: any) => boolean | void): () => void {
        this.logger.debug(`TitaniumRenderer.listen ${eventName}`);

        target.on(eventName, callback);

        return () => target.off(eventName, callback);
    }
}