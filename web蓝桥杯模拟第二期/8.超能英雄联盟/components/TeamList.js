// TODO:补全代码，实现目标效果
const TeamList = {
  template: `
  <div class="team-list">
      <h2>我的队伍</h2>
      <ul>
        <li class="team-item" v-for="(item,index) in store.team" :key="item.id">
          <span>{{item.name}}</span>
          <span>{{item.strength}}</span>
          <button @click=store.removeHero(item.id)>移除</button>
        </li>
      </ul>
      <button class="sort-button" @click=store.sort>按实力排序</button>
      <p class="total-strength">当前队伍战斗力：{{store.totalStrength}} </p>
  </div>
  `,
  setup() {
    const store = useHeroStore()
    return {
      store
    }
  }
}
// TODOEnd
