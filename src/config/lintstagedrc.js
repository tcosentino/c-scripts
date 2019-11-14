const {resolveCScripts, resolveBin, isOptedOut} = require('../utils')

const cScripts = resolveCScripts()
const doctoc = resolveBin('doctoc')

module.exports = {
  'README.md': [`${doctoc} --maxlevel 3 --notitle`, 'git add'],
  '*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx|vue)': [
    isOptedOut('autoformat', null, `${cScripts} format`),
    `${cScripts} lint`,
    `${cScripts} test --findRelatedTests`,
    isOptedOut('autoformat', null, 'git add'),
  ].filter(Boolean),
}
