jekyllDefinitions = require('./lib/jekyll-definitions');
jekyllLinks = require('./lib/jekyll-links')
unified = require('unified');
markdown = require('remark-parse')
stringify = require('remark-stringify')
reader = require('read-file')
visit = require('unist-util-visit')

let input = reader.sync('example.md','utf8')

let result = unified()
              .use(markdown)
              .use(stringify)
              .use(jekyllLinks)
              .use(jekyllDefinitions)
              
let nodes = result.parse(input)

visit(nodes,'paragraph',(node)=>{
  console.log(node);
})

let output = result.processSync(input);

console.log(output.contents);