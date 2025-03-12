/**
 * Transforms a list of file paths into a nested tree structure and provides visualization.
 *
 * Features:
 * - Converts flat paths to hierarchical tree nodes
 * - Handles duplicate path segments efficiently
 * - Provides ASCII-formatted tree visualization
 * - Processes various path formats (absolute, relative, with slashes)
 *
 * Usage:
 * const tree = buildTree(['/path/to/file', 'another/path']);
 * prettyPrint(tree);
 */

class TreeNode {
  /**
   * @param {string} name - Node name (path segment)
   */
  constructor(name) {
    this.name = name;
    this.children = {};
  }
}

/**
 * Builds a tree structure from an array of paths
 * @param {string[]} paths - Array of file paths
 * @returns {TreeNode} Root node of the constructed tree
 */
function buildTree(paths) {
  const root = new TreeNode('');

  for (const path of paths) {
    const parts = path.split('/').filter(part => part !== '');
    let currentNode = root;

    for (const part of parts) {
      currentNode.children[part] = currentNode.children[part] || new TreeNode(part);
      currentNode = currentNode.children[part];
    }
  }

  return root;
}

/**
 * Prints tree structure in a human-readable format
 * @param {TreeNode} node - Root node to start printing from
 * @param {string} prefix - Internal formatting prefix
 * @param {boolean} isLast - If node is last child in its level
 * @param {boolean} isRoot - If node is the tree root
 */
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
