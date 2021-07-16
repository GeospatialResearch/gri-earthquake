export default {
  created: function () {
    const pageTitle = getPageTitle(this);
    if (pageTitle) {
      const titlePrefix = this.$store.state.titlePrefix;
      document.title = `${titlePrefix} - ${pageTitle}`;
    }
  }
}

function getPageTitle(vm) {
  const { title } = vm.$options;
  if (title) {
    return typeof title == 'function' ? title.call(vm) : title
  }
}