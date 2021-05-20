export default {
  created: function () {
    const title = getTitle(this);
    if (title) {
      const titlePrefix = this.$store.state.titlePrefix;
      document.title = `${titlePrefix} - ${title}`;
    }
  }
}

function getTitle(vm) {
  const { title } = vm.$options;
  if (title) {
    return typeof title == 'function' ? title.call(vm) : title
  }
}