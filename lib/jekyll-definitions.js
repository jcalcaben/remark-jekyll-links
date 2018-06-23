module.exports = jekyllDefinitions;

function jekyllDefinitions() {
  let Compiler = this.Compiler;
  
  //Define parser
  
  let Parser = this.Parser;
  let tokenizers = Parser.prototype.blockTokenizers;
  let methods = Parser.prototype.blockMethods;
  
  tokenizers.jekyllDefinition = tokenizeJekyllDefinition;
  
  methods.splice(methods.indexOf('paragraph'), 0, 'jekyllDefinition');
  
  function tokenizeJekyllDefinition(eat, value, silent) {
    let match = /^\[(.*?)\]:\s?{{\s?page.baseurl\s?}}(.*?)$/.exec(value)
    
    if(match){
      if(silent){
        return true;
      }
      
      return eat(match[0])({
        type: 'jekyllDefinition',
        identifier: match[1],
        title: null,
        url: "{{ page.baseurl }}" + match[2],
      })
    }
  }
  
  //Define Compiler
  
  let visitors = Compiler.prototype.visitors;
  
  visitors.jekyllDefinition = (node) => {
    return "["+node.identifier+"]: "+node.url
  }
}
