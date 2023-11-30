const { defineStore } = Pinia
const { ref } = Vue

const useHeroStore = defineStore('hero', {
  state: () => ({
    heroes: [], //英雄列表
    team: [] // 队伍列表
  }),
  // TODO:补全代码，实现目标效果
  getters: {
    //计算出战力总和strength
    totalStrength() {
      return this.team.reduce((total, hero) => {
        return total + hero.strength
      }, 0)
    }
  },
  actions: {
    add(id) {
      this.heroes[id - 1].btn = true
      this.team.push(this.heroes[id - 1])
    },
    removeHero(id) {
      this.heroes[id - 1].btn = false
      //移出team中的元素
      this.team = this.team.filter((hero) => hero.id !== id)
    },
    sort() {
      //按照实力排序strength
      this.team.sort((a, b) => {
        return b.strength - a.strength
      })
    }
  }
  // TODOEnd
})
