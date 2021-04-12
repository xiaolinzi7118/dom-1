window.dom = {
    //增
    create(string) {
        const container = document.createElement("template");
        container.innerHTML = string.trim();//去除空格
        return container.content.firstChild
    },
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    before(node, node2) {
        node.parentNode.insertBefore(node, node2);
    },
    append(parent, node) {
        parent.appendChild(node);
    },
    wrap(node, parent) {
        //先把parent加到node的前面或者后面
        dom.before(node, parent);
        //再把node移到parent里面
        dom.append(parent, node);
    },
    //删
    remove(node) {
        node.parentNode.removeChild(node);
        return node
    },
    empty(node) {
        // const { childNodes } = node;
        //等于const childNodes=node.childNodes
        const array = [];
        // for (let i = 0; i < childNodes.length; i++) {
        //     dom.remove(childNodes[i]);
        //     array.push(childNodes[i]);
        // }
        //for循环不可以，因为length长度实时在变化
        let x = node.firstChild;
        while (x) {
            array.push(dom.remove(x));
            x = node.firstChild;
        }
        return array
    },
    //改
    attr(node, name, value) {//重载
        if (arguments.length === 3) {
            node.setAttribute(name, value);
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    text(node, string) {//适配
        if ('innerText' in node) {
            node.innerText = string;
        } else {
            node.textContent = string;
        }
    },
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string;
        } else {
            return node.innerHTML
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            //dom.style(div,'color','red')
            node.style[name] = value;
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                //dom.style(div,'color')
                return node.style[name]
            } else if (name instanceof Object) {
                //dom.style(div,{color:'red'})
                const object = name;
                for (let key in object) {
                    node.style[key] = object[key];
                }
            }
        }
    },
    class: {
        add(node, className) {
            node.classList.add(className);
        },
        remove(node, className) {
            node.classList.remove(className);
        },
        has(node, className) {
            return node.classList.contains(className);
        }
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    //查
    find(selector, scope) {
        //找scope下的还是全局的
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.children
    },
    siblings(node) {
        return Array.from(node.parentNode.children)
            .filter(n => n !== node)
    },
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }
}