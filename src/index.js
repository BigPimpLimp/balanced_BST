// import { node } from 'webpack';
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
		console.log('yee')
		root.data = null;
      
    }
    if (value < root.data) {
	  console.log('left');
      root.left = this.deleteItem(value, root.left)
    }
    if (value > root.data) {
	  console.log('right')
      root.right = this.deleteItem(value, root.right)
    }
	return root;
  }

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

const test = new Tree([1, 1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(test.arr)
// console.log(test.buildTree(test.arr, 0, test.arr.length - 1))
console.log(test)
test.buildTree(test.arr, 0, test.arr.length - 1)
console.log(test.insert(22))
test.insert(45)
test.insert(44)
test.insert(43)
test.deleteItem(22)
console.log(test.root)
prettyPrint(test.root)