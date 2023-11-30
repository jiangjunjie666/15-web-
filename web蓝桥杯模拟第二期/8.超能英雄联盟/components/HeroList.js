// TODO:补全代码，实现目标效果
const HeroList = {
  template: `
  <div class="hero-list">
    <h2>可选英雄</h2>
    <ul>
      <li class="hero-item" v-for="(item,index) in store.heroes" :key="item.id">
        <span>{{item.name}}</span>
        <span>{{item.ability}}</span>
        <span>{{item.strength}}</span>
        <button @click=store.add(item.id) :disabled="item.btn">{{ item.btn ?  '已添加' : '添加至队伍' }}</button>
      </li>
    </ul>
  </div>
  `,
  setup() {
    //第一步获取数据
    const store = useHeroStore()
    axios
      .get('./js/heroes.json')
      .then((res) => {
        store.heroes = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    return {
      store
    }
  }
}
// TODOEnd
