import { print } from "./print.js";
import { Node } from "./node.js";

export class Tree {
  constructor(arr) {
    this.arr = [...new Set(arr)].sort((a, b) => a - b);
    this.root = null;
  }

  buildTree(arr, start, end) {
    //this function is causing issues with pretty print
    if (start > end) return null; //left and right are sometimes undefined instead of null

    const mid = Math.floor((start + end) / 2);

    const root = new Node(this.arr[mid]);
    if (!this.root) {
      this.root = root;
    }
    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);

    return root;
  }

  insert(value, root = this.root) {
    //is not rebuilding tree correclty.
    if (root === null) {
      console.log(value); //some left and right values are undefined an not null
      return new Node(value); //WHEN VALUE IS ALREADY IN TREE IT CAUSES ISSUES
    }
    if (value < root.data) {
      root.left = this.insert(value, root.left);
    }
    if (value > root.data) {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  deleteItem(value, root = this.root) {
    if (root === null) {
      console.log("value not found");
      return null;
    }
    if (root.data === value && !root.left && !root.right) {
      return null;
    }
    if (
      root.data === value &&
      ((root.left && !root.right) || (root.right && !root.left))
    ) {
      if (root.left) return root.left;
      if (root.right) return root.right;
    }
    if (root.data === value && root.left && root.right) {
      //find right node, then find closest left node with no child.
      let successor = root.right;
      while (successor.left) {
        successor = successor.left;
      }
      root.data = successor.data;
      root.right = this.deleteItem(successor.data, root.right);
    }
    if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
    }
    if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
    }
    return root;
  }

  findValue(value, root = this.root) {
    if (root === null) return null;
    if (root.data === value) return root;

    if (value < root.data) {
      return this.findValue(value, root.left);
    }
    if (value > root.data) {
      return this.findValue(value, root.right);
    }
  }

  levelOrder(callback, string, root = this.root, queue = [root]) {
    if (!callback) throw new Error("Please provide callback");
    let current;

    while (queue.length > 0) {
      current = queue[0];
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
      string += `${callback(current.data)}, `;
      queue.shift();
    }
    return string;
  }

  preOrder(root = this.root, string, callback = print) {
    if (root === null) return string;
    console.log(root.data);
    string += `${callback(root.data)}, `;

    string = this.preOrder(root.left, string);
    string = this.preOrder(root.right, string);

    return string;
  }

  inOrder(root = this.root, string, callback = print) {
    if (root === null) return string;

    string = this.inOrder(root.left, string);
    string += `${callback(root.data)}, `;
    string = this.inOrder(root.right, string);

    return string;
  }

  postOrder(root = this.root, string, callback = print) {
    if (root === null) return string;

    string = this.postOrder(root.left, string);
    string = this.postOrder(root.right, string);
    string += `${callback(root.data)}, `;

    return string;
  }

  treeHeight(node = this.root) {
    if (node === null) {
      return -1; // Height of an empty tree is -1
    }

    const leftHeight = this.treeHeight(node.left);
    const rightHeight = this.treeHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  nodeHeight(value) {
    console.log(value);
    let currentNode = this.root;

    while (currentNode) {
      if (value === currentNode.data) {
        return this.treeHeight(currentNode);
      } else if (value < currentNode.data && currentNode) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  depth(value, root = this.root, count = 0) {
    if (root === null) return null;
    if (root.data === value) return count;
    count++;

    if (value < root.data) {
      return this.depth(value, root.left, count);
    }
    if (value > root.data) {
      return this.depth(value, root.right, count);
    }
  }

  isBalanced(root = this.root) {
    //may not be getting updated root after insert statements

    if (root === null) return true;
    let left = root.left ? this.nodeHeight(root.left.data) : -1;
    let right = root.right ? this.nodeHeight(root.right.data) : -1;

    if (Math.abs(left - right) > 1) {
      console.log(left);
      console.log(right);
      return false;
    }
    return this.isBalanced(root.left) && this.isBalanced(root.right);
  }

  rebalance(root = this.root, newArr = []) {
    if (root === null) return newArr;

    newArr.push(root.data);
    this.rebalance(root.left, newArr);
    this.rebalance(root.right, newArr);

    this.arr = [...new Set(newArr)].sort((a, b) => a - b);
    this.root = null;
    this.buildTree(this.arr, 0, this.arr.length - 1);
  }
}
