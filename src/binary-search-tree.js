const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  rootNode = null;

  root() {
      return this.rootNode;
  }

  add(data) {
      if (this.rootNode == null) {
          this.rootNode = new Node(data);
      } else {
          this.#addChild(this.rootNode, data);
      }
  }

  #addChild(node, data) {
      if (data < node.data) {
          if (node.left == null) {
              node.left = new Node(data);
          } else {
              this.#addChild(node.left, data);
          }
      } else if (data > node.data) {
          if (node.right == null) {
              node.right = new Node(data);
          } else {
              this.#addChild(node.right, data);
          }
      }
  }

  has(data) {
      if (this.rootNode == null) {
          return false;
      }

      if (this.rootNode.data === data) {
          return true;
      } else {
          return this.#has(this.rootNode, data);
      }
  }

  #has(node, data) {
      if (data < node.data) {
          if (node.left == null) {
              return false;
          } else if (node.left.data === data) {
              return true;
          } else {
              return this.#has(node.left, data);
          }
      } else if (data > node.data) {
          if (node.right == null) {
              return false;
          } else if (node.right.data === data) {
              return true;
          } else {
              return this.#has(node.right, data);
          }
      }
  }

  find(data) {
      if (this.rootNode == null) {
          return null;
      }

      if (this.rootNode.data === data) {
          return this.rootNode;
      } else {
          return this.#find(this.rootNode, data);
      }
  }

  #find(node, data) {
      if (data < node.data) {
          if (node.left == null) {
              return null;
          } else if (node.left.data === data) {
              return node.left;
          } else {
              return this.#find(node.left, data);
          }
      } else if (data > node.data) {
          if (node.right == null) {
              return null;
          } else if (node.right.data === data) {
              return node.right;
          } else {
              return this.#find(node.right, data);
          }
      }
  }

  remove(data) {
      let node = this.find(data);
      if (node != null) {
          if (node.left == null && node.right == null) {
              node = null;
          } else if (node.left != null && node.right == null) {
              node = node.left;
          } else if (node.left == null && node.right != null) {
              node = node.right;
          } else {
              node = this.#max(node);
          }
      }
  }

  min() {
      if (this.rootNode == null) {
          return null;
      }

      if (this.rootNode.left == null) {
          return this.rootNode.data;
      } else {
          return this.#min(this.rootNode.left);
      }
  }

  #min(node) {
      if (node.left == null) {
          return node.data;
      } else {
          return this.#min(node.left);
      }
  }

  max() {
      if (this.rootNode == null) {
          return null;
      }

      if (this.rootNode.right == null) {
          return this.rootNode.data;
      } else {
          return this.#max(this.rootNode.right);
      }
  }

  #max(node) {
      if (node.right == null) {
          return node.data;
      } else {
          return this.#max(node.right);
      }
  }
}

module.exports = {
  BinarySearchTree
};