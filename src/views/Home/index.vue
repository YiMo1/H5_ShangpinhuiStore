<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
    <Bramd></Bramd>
  </div>
</template>

<script>

import TypeNav from '@/components/TypeNav'
import ListContainer from '@/views/Home/ListContainer'
import Recommend from '@/views/Home/Recommend'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/Like'
import Floor from '@/views/Home/Floor'
import Bramd from '@/views/Home/Bramd'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    TypeNav,
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Bramd
  },
  async mounted() {
    this.$store.dispatch('getFloorList')
    try {
      await this.$store.dispatch('getUserInfo')
    } catch (error) {
      await this.$store.dispatch('userLoguot')
    }
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  }
}
</script>

<style lang="less" scoped></style>
