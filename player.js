class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.element = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");

    this.line1.setAttribute("x1", 10);
    this.line1.setAttribute("y1", 10);
    this.line1.setAttribute("x2", 40);
    this.line1.setAttribute("y2", 40);
    this.line1.setAttribute("stroke", "blue");
    this.line1.setAttribute("stroke-width", 2);

    this.line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");

    this.line2.setAttribute("x1", 40);
    this.line2.setAttribute("y1", 10);
    this.line2.setAttribute("x2", 10);
    this.line2.setAttribute("y2", 40);
    this.line2.setAttribute("stroke", "blue");
    this.line2.setAttribute("stroke-width", 2);

    this.element.appendChild(this.line1);
    this.element.appendChild(this.line2);
  }

  teleport(x, y) {
    this.x = x;
    this.y = y;
    this.element.setAttribute(
      "transform",
      `translate(${this.x * 50}, ${this.y * 50})`
    );
  }

  move(i, j) {
    const newX = this.x + i;
    const newY = this.y + j;

    // Check if the new position is within the boundaries of the board
    if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize) {
      this.x = newX;
      this.y = newY;
      this.element.setAttribute(
        "transform",
        `translate(${this.x * 50}, ${this.y * 50})`
      );
      this.updateSquareColor();
    } else {
      document.querySelector("svg").classList.add("show-bounds");
      setTimeout(() => {
        document.querySelector("svg").classList.remove("show-bounds");
      }, 1000);
    }
  }

  addToBoard(board) {
    board.appendChild(this.element);
    this.element.setAttribute("x", this.x);
    this.element.setAttribute("y", this.y);
  }

  updateSquareColor() {
    const board = document.querySelector("svg");
    const existingSquare = document.querySelector(
      `.overlay[x="${this.x * 50}"][y="${this.y * 50}"]`
    );
    if (existingSquare) {
      existingSquare.remove();
    } else {
      addOverlaySquare(this.x, this.y);
    }
  }
}
