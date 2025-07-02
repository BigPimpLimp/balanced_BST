import "./style.css";
import { print, prettyPrint } from "./print.js";
import { Tree } from "./tree.js";

console.log("Connected");

// const test = new Tree([1, 1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
const test = new Tree([99, 12, 43, 55, 61, 9, 14, 7, 19, 20, 87, 33]);
test.buildTree(test.arr, 0, test.arr.length - 1);
test.insert(22);
test.insert(45);
test.insert(44);
test.insert(43);
console.log(test)
// test.deleteItem(23);
prettyPrint(test.root);
console.log(test.findValue(111));
console.log(test.levelOrder(print, "Level Order: "));
console.log(test.preOrder(test.root, "PreOrder: ", print));
console.log(test.inOrder(test.root, "In Order: ", print));
console.log(test.postOrder(test.root, "Post Order: ", print));
console.log(test.treeHeight());
console.log(test.nodeHeight(4));
console.log(test.depth(67));
console.log(test.isBalanced());
console.log(test.rebalance());
prettyPrint(test.root);
console.log(test.isBalanced());
