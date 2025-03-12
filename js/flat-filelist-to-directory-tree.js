class TreeNode {
  constructor(name) {
    this.name = name;
    this.children = {};
  }
}

function buildTree(paths) {
  const root = new TreeNode('');

  for (const path of paths) {
    // Split path into components and filter out empty parts
    const parts = path.split('/').filter(part => part !== '');
    let currentNode = root;

    for (const part of parts) {
      if (!currentNode.children[part]) {
        currentNode.children[part] = new TreeNode(part);
      }
      currentNode = currentNode.children[part];
    }
  }

  return root;
}

// Helper function to print the tree in a readable format
function prettyPrint(node, prefix = '', isLast = true, isRoot = true) {
  if (!isRoot) {
    console.log(prefix + (isLast ? '└── ' : '├── ') + node.name);
    prefix += isLast ? '    ' : '│   ';
  }

  const children = Object.values(node.children);
  children.forEach((child, index) => {
    const isLastChild = index === children.length - 1;
    prettyPrint(child, prefix, isLastChild, false);
  });
}

function normalizeSeparator(oldSeparator,oldString) {
  return oldString.split(oldSeparator).join('/');
}
// Example usage
const paths = [
  normalizeSeparator('|',"C:|Users|Hp|Documents|Current Project|Scenarios|Diplomatic-Caution.txt"),
  normalizeSeparator('\\',"C:\\Users\\Hp\\Documents\\Current Project\\Scenarios\\Dystopia.txt"), // Backslash must always be double backslash!
  '/home/user/documents/file1.txt',
  '/home/user/documents/file2.txt',
  '/home/user/images/photo.jpg',
  '/var/log',
  '/tmp'
];

const tree = buildTree(paths);
console.log('Directory Tree Structure:');
prettyPrint(tree, '', true, true);
