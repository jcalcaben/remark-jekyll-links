module.exports = jekyllLinks;

function jekyllLinks() {
  let Compiler = this.Compiler;
  
  //Define parser
  
  let Parser = this.Parser;
  let tokenizers = Parser.prototype.inlineTokenizers;
  let methods = Parser.prototype.inlineMethods;
  
  tokenizers.jekyllLink = tokenizeJekyllLink;
  
  methods.splice(methods.indexOf('link'), 0, 'jekyllLink');
  
  tokenizeJekyllLink.locator = locateJekyllLink;
  
  function tokenizeJekyllLink(eat, value, silent) {
    let match = /^\[(.*?)\]\(\s?{{\s?page.baseurl\s?}}(.*?)\s?\)/.exec(value)
    
    if(match){
      if(silent){
        return true;
      }
      
      return eat(match[0])({
        type: 'jekyllLink',
        title: match[1],
        url: "{{ page.baseurl }}" + match[2],
        children: [{type: "text", value: match[1]}]
      })

    }
  }
  
  
  function locateJekyllLink(value, fromIndex) {
    return value.indexOf('[', fromIndex);
  }
  
  //Define Compiler
  
  let visitors = Compiler.prototype.visitors;

  visitors.jekyllLink = (node) => {
    return "["+node.children[0].value+"]("+node.url+")"
  }
}
