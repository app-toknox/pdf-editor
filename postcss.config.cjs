const tailwindcss = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

// Plugin PostCSS personalizzato per rimuovere le direttive @layer
const removeLayersPlugin = () => ({
  postcssPlugin: 'remove-layers',
  AtRule: {
    layer: atRule => {
      if (atRule.nodes && atRule.nodes.length) {
        atRule.replaceWith(...atRule.nodes);
      } else {
        atRule.remove();
      }
    }
  }
});
removeLayersPlugin.postcss = true;

module.exports = {
  plugins: [
    tailwindcss(),
    autoprefixer,
    removeLayersPlugin()
  ]
};
