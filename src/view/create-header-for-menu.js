import { createElement } from "../util.js";

const createHeaderMenu = () => `<h2 class="visually-hidden">Switch trip view</h2>`;

class HeaderMenuView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createHeaderMenu();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default HeaderMenuView;
