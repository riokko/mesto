class Section {
    constructor({ items, renderer }, containerSelector){
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItem = () => {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }

    addItem = (element, shouldPrepend = false) => {
        if (shouldPrepend) {
            this._container.append(element);
        } else {
            this._container.prepend(element);
        }
    }
}

export default Section;
