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
            node.left.root = node;
            return node.left;
        } else {
            return this.#find(node.left, data);
        }
    } else if (data > node.data) {
        if (node.right == null) {
            return null;
        } else if (node.right.data === data) {
            node.right.root = node;
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
            if (node.root.left) {
                node.root.left = null;
            }
            if (node.root.right) {
                node.root.right = null;
            }
        } else if (node.left != null && node.right == null) {
            if (node.root.left) {
                node.root.left = node.left;
            }
        } else if (node.left == null && node.right != null) {
            if (node.root.right) {
                node.root.right = node.right;
            }
        } else {
            if (node.root == null) {
                let min = this.#min(node.right);
                let minNode = this.find(min);
                minNode.left = this.rootNode.left;
                this.rootNode = this.rootNode.right;
            }
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