<template>
  <div id="observer"></div>
</template>

<script>
export default {
  name: 'observer',
  data() {
    return {
      observer: null,
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit('intersect');
        // console.log(entry);
      }
    });
    this.observer.observe(this.$el);
  },
};
</script>

<style>
#observer {
  height: 1px;
}
</style>
