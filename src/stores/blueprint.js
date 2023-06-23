import { defineStore } from "pinia";

export const useBlueprintStore = defineStore("blueprint", {
  state: () => {
    return {
      blueprint: {},
      options: []
    };
  },
  getters: {
    getEndPrice(state) {
      return state.blueprint.endPrice;
    },
    getEndWorkTime(state) {
      return state.blueprint.workTime;
    }
  },
  actions: {
    async fetchBlueprint(name) {
      let data = await fetch(`http://localhost:5000/${name}`).then((res) => res.json());
      data.default.entries = setDefaultEntries(data);
      data.optional.entries = new Map(data.optional.entries.map((item) => [item.id, item]));
      this.blueprint = data;

      this.setSectionProps("default");
      this.setSectionProps("optional");
    },
    async fetchOptions() {
      this.options = await fetch("http://localhost:5000/optionals").then((res) => res.json());
    },
    async fetchOptionById(id) {
      if (this.blueprint.optional.entries.has(id)) {
        return Promise.reject("Данная опция уже добавлена в список");
      }

      let data = await fetch(`http://localhost:5000/optionals/${id}`).then((res) => res.json());

      this.blueprint.optional.entries.set(data.id, data);
    },
    setField(sectionName, blockId, ItemId, newValue) {
      this.blueprint[sectionName].entries
        .get(blockId)
        .children.set(
          ItemId,
          Object.assign(
            this.blueprint[sectionName].entries.get(blockId).children.get(ItemId),
            newValue
          )
        );
      this.setBlockProps(sectionName, blockId);
    },
    setBlockProps(sectionName, blockId) {
      let endPrice = 0;
      let workTime = 0;
      let defaultIn = true;

      this.blueprint[sectionName].entries.get(blockId).children.forEach((value) => {
        if (value.defaultIn) {
          workTime += value.workTime;
          endPrice += value.hourPrice * value.workTime;
        } else {
          defaultIn = false;
        }
      });

      this.blueprint[sectionName].entries.set(
        blockId,
        Object.assign(this.blueprint[sectionName].entries.get(blockId), {
          endPrice: endPrice,
          workTime: workTime,
          defaultIn: defaultIn
        })
      );
      this.setSectionProps(sectionName);
    },
    setSectionProps(sectionName) {
      let endPrice = 0;
      let workTime = 0;
      this.blueprint[sectionName].entries.forEach((value) => {
        endPrice += value.endPrice;
        workTime += value.workTime;
      });

      this.blueprint[sectionName].endPrice = endPrice;
      this.blueprint[sectionName].workTime = workTime;

      this.setGlobalProps();
    },
    setGlobalProps() {
      this.blueprint.endPrice = this.blueprint.default.endPrice + this.blueprint.optional.endPrice;
      this.blueprint.workTime = this.blueprint.default.workTime + this.blueprint.optional.workTime;
    },
    checkBlock(sectionName, blockId, newValue) {
      for (const key of this.blueprint[sectionName].entries.get(blockId).children.keys()) {
        this.blueprint[sectionName].entries.get(blockId).children.set(
          key,
          Object.assign(this.blueprint[sectionName].entries.get(blockId).children.get(key), {
            defaultIn: newValue
          })
        );
      }

      this.setBlockProps(sectionName, blockId);
    },
    setOptionalBlockField(blockId, newVal) {
      const tmp = {
        ...this.blueprint.optional.entries.get(blockId),
        ...newVal
      };
      tmp.endPrice = tmp.workTime * tmp.hourPrice;
      this.blueprint.optional.entries.set(blockId, tmp);

      this.setSectionProps("optional");
    }
  }
});

function setDefaultEntries(data) {
  return new Map(
    data.default.entries.map((item) => {
      return [
        item.id,
        {
          ...item,
          workTime: item.children.reduce(
            (accumulator, currentValue) =>
              currentValue.defaultIn ? accumulator + currentValue.workTime : accumulator,
            0
          ),
          endPrice: item.children.reduce(
            (accumulator, currentValue) =>
              currentValue.defaultIn
                ? accumulator + currentValue.workTime * currentValue.hourPrice
                : accumulator,
            0
          ),
          defaultIn: !(item.children.findIndex((item) => !item.defaultIn) + 1),
          children: new Map(item.children.map((child) => [child.id, child]))
        }
      ];
    })
  );
}
