'use strict';

class Logic{
  constructor (elements){
    this.elements = elements;
  }

  generateOutput () {
    return `${this.elements.chorus} chorus`;
  }
}

export default Logic;