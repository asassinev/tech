<template>
  <div @click="addProductListParams">
    <div class="item-card shadow-sm p-3 bg-white rounded user-select-none">
      <div class="item-card__img">
        <img :src="item.src" :alt="item.title" class="item-card__img-margin" />
      </div>
      <p class="item-card__text fw-bold fs-5 mb-2">
        {{ item.title }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    addProductListParams () {
      localStorage.setItem('product-list-title', this.item.title)
      this.$router.push({
        name: 'productList',
        params: { id: this.item.id },
        query: { search: '', page: 1, filter: '' }
      })
    }
  }
}
</script>

<style lang="scss">
.item-card {
  display: flex;
  flex-direction: column;
  height: 255px;
  text-align: center;
  justify-content: space-between;
  margin-bottom: 28px;
  text-decoration: none !important;
  transition: 0.5s;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    p {
      color: #007bff !important;
      transition: 0.25s;
    }
  }
  &__img {
    position: relative;
    flex-grow: 1;

    &-margin {
      max-height: 170px;
      position: absolute;
      margin: auto;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }

  &__text {
    color: #6c757d;
    margin-bottom: 20px;
  }
}
</style>
