'use strict';

class Base{
  constructor (elements) {
    console.log(elements);
    this.elements = elements || {};
  }

  generateOutput () {
    let compose = [];

    for (let i of Object.keys(this.elements)) {
      let name = Number.parseInt(this.elements[i]) > 1 ? i : i.replace(/(?!g)(e)s$/i, '$1');

      compose.push(`${this.elements[i]} ${name}.`);
    }

    return compose.join('<br />');
  }
}

export default Base;