// Mixin to append name of component to name of app and makes this the webpage title

export default {
  /**
   * Changes the document title if a component has a data variable `title`
   */
  created: function () {
    const pageTitle = getPageTitle(this);
    if (pageTitle) {
      const titlePrefix = this.$store.state.titlePrefix;
      document.title = `${titlePrefix} - ${pageTitle}`;
    }
  }
}

function getPageTitle(vm) {
  const {title} = vm.$options;
  if (title) {
    return typeof title == 'function' ? title.call(vm) : title
  }
}