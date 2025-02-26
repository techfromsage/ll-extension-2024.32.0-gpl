const isTextNode = (node: Node): node is Text => node instanceof Text;

export default isTextNode;
