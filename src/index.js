import { node } from 'webpack';
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
	constructor() {
		this.root;
	}
}

const buildTree = function x(arr, start, end) {
	if (start > end) return null;

	let mid = math.floor(start + end) / 2;
	const root = new Node(arr[mid]);

	root.left = buildTree(arr, start, mid - 1);
	root.right = buildTree(arr, mid + 1, end)

	return root;
}