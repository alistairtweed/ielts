<script setup>
import { computed } from 'vue'

// Choose N answers. Covers the numbers group.from..group.to.
const props = defineProps({ group: Object, session: Object, skin: String })
const selected = computed(() => props.session.state.answers[props.group.from] || [])
const max = computed(() => props.group.to - props.group.from + 1)
const isCurrent = computed(() => props.session.state.current >= props.group.from && props.session.state.current <= props.group.to)
</script>

<template>
  <div :id="`q-${group.from}`" class="group-multi" :class="{ current: isCurrent }">
    <span v-for="n in max - 1" :id="`q-${group.from + n}`" :key="n" class="anchor" />
    <div class="q-stem" @click="session.goTo(group.from)">
      <span class="q-num">{{ group.from }}–{{ group.to }}</span>
      <span data-annotatable v-html="group.stem" />
    </div>
    <div class="q-options">
      <label v-for="o in group.options" :key="o.value" class="q-option">
        <input
          type="checkbox"
          :checked="selected.includes(o.value)"
          :disabled="!selected.includes(o.value) && selected.length >= max"
          @change="session.toggleMulti(group, o.value)"
          @focus="session.goTo(group.from)"
        />
        <span class="q-option-letter">{{ o.value }}</span>
        <span>{{ o.label }}</span>
      </label>
    </div>
  </div>
</template>
