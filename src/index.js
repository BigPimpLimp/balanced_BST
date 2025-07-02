import './style.css';

console.log('Connected');

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr, root) {
    this.arr = [...new Set(arr)].sort((a, b) => a - b);
    this.root = null;
  }



  buildTree(arr, start, end) {
  if (start > end) return null;

  const mid = Math.floor((start + end)  / 2);

  const root = new Node(this.arr[mid]);
  if (!this.root) {
    this.root = root;
  }
  console.log(root)

  root.left = this.buildTree(arr, start, mid - 1);
  root.right = this.buildTree(arr, mid + 1, end)

  return root;
  }

  insert(value, root = this.root) { 
    if (root === null) {
      return new Node(value);
    }
    if (root.data === value) return;
    if (value < root.data) {
      root.left = this.insert(value, root.left)
    }
    if (value > root.data) {
      root.right = this.insert(value, root.right)
    }

    return root;
  }

  deleteItem(value, root = this.root) { 
    if (root === null) {
      console.log('value not found');
      return null;
    };
    if (root.data === value && !root.left && !root.right) {
      return null;
    }
    if (root.data === value && (root.left && !root.right || root.right && !root.left)) {
      if (root.left) return root.left;
      if (root.right) return root.right;
    }
    if (root.data === value && root.left && root.right) { //find right node, then find closest left node with no child.
      let successor = root.right;
      while (successor.left) {
        successor = successor.left;
      }
      root.data = successor.data;
      root.right = this.deleteItem(successor.data, root.right);
    }
    if (value < root.data) {
      root.left = this.deleteItem(value, root.left)
    }
    if (value > root.data) {
      root.right = this.deleteItem(value, root.right)
    }
    return root;
  }

  findValue(value, root = this.root) {
    if (root === null) return null;
    if (root.data === value) return root;

    if (value < root.data) {
      return this.findValue(value, root.left)
    }
    if (value > root.data) {
      return this.findValue(value, root.right)
    }
  };

  levelOrder(callback, string, root = this.root, queue = [root]) {
    if (!callback) throw new Error('Please provide callback');
    let current;
    
    while (queue.length > 0) {
      current = queue[0];
      if (current.left) {
        queue.push(current.left)
      }
      if (current.right) {
        queue.push(current.right)
      }
      string += `${callback(current.data)}, `;
      queue.shift();

    }
    return string;
  }

  preOrder(root = this.root, string, callback = print) {
    if (root === null) return string;

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
    let currentNode = this.root;

    while (currentNode) {
      if (value === currentNode.data) {
        return this.treeHeight(currentNode)
      }
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      }
      if (value > currentNode.data) {
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
    if (root === null) return true;
    let left = root.left ? this.nodeHeight(root.left.data) : -1;
    let right = root.right ? this.nodeHeight(root.right.data) : -1;

    if (Math.abs(left - right) > 1) {
      return false;      
    }
    return this.isBalanced(root.left) && this.isBalanced(root.right)
  }
  
  rebalance(root = this.root, arr = []) {
    if (root === null) return arr;

    arr.push(root.data);
    this.rebalance(root.left, arr);
    this.rebalance(root.right, arr);
    arr = [...new Set(arr)].sort((a, b) => a - b);
    return arr
  }

}

function print(num) {
  let string = num.toString();
  return string;
}





const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

// const test = new Tree([1, 1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
const test = new Tree([1, 2, 3, 4, 5, 6, 7, 8]);
console.log(test.arr)
// console.log(test.buildTree(test.arr, 0, test.arr.length - 1))
console.log(test)
test.buildTree(test.arr, 0, test.arr.length - 1)
console.log(test.insert(22))
test.insert(45)
test.insert(44)
test.insert(43)
test.deleteItem(23)

console.log(test.root)
prettyPrint(test.root)
console.log(test.findValue(111))
console.log(test.levelOrder(print, 'Level Order: '));
// console.log(test.preOrder(this.root, 'PreOrder: ', print))
// console.log(test.inOrder(this.root, 'In Order: ', print))
// console.log(test.postOrder(this.root, 'Post Order: ', print));
// console.log(test.treeHeight());
// console.log(test.nodeHeight(4))
// console.log(test.depth(67)) 
console.log(test.isBalanced())
console.log(test.rebalance())
const andNew = new Tree(test.rebalance())
andNew.buildTree(andNew.arr, 0, andNew.arr.length - 1)
prettyPrint(andNew.root)