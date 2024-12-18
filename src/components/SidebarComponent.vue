<script setup lang="ts">
import { defineEmits, defineModel, ref } from 'vue'
import SettingForm from '@/components/SettingForm.vue'
import SettingExamples from '@/components/SettingExamples.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tabs from 'primevue/tabs'
import Tab from 'primevue/tab'
import TabList from 'primevue/tablist'
import Checkbox from 'primevue/checkbox'

import type { constCssType } from '@/types'
import { useAdaptive } from '@/composable/useAdaptive'

const { isMobile } = useAdaptive()

const constCss = defineModel<constCssType>('constCss')
const isTransparent = defineModel<boolean>('isTransparent')

const prop = defineProps({ examples: Object })
const emit = defineEmits(['change-example', 'save-setting'])

enum TAB_NAMES {
  EXAMPLES = 'Примеры',
  SETTINGS = 'Настройка'
}

const TABS = [
  { label: TAB_NAMES.EXAMPLES, icon: 'pi pi-spinner-dotted' },
  { label: TAB_NAMES.SETTINGS, icon: 'pi pi-cog' }
]

const currentTab = ref(TAB_NAMES.EXAMPLES)

function saveSetting() {
  emit('save-setting')
}
</script>

<template>
  <div class="form">
    <Tabs :value="currentTab" class="tabs">
      <TabList>
        <Tab
          v-for="tab in TABS"
          :key="tab.label"
          @click="currentTab = tab.label"
          :value="tab.label"
          class="tab"
        >
          <i :class="tab.icon" />
          <span>{{ tab.label }}</span>
        </Tab>
      </TabList>
    </Tabs>
    <div v-if="isMobile" class="flex items-center gap-2 field">
      <Checkbox v-model="isTransparent" binary />
      <label for="opacity">Прозрачность</label>
    </div>
    <template v-if="currentTab === TAB_NAMES.EXAMPLES">
      <SettingExamples :examples="prop.examples" @change-example="emit('change-example', $event)" />
    </template>
    <template v-if="currentTab === TAB_NAMES.SETTINGS">
      <SettingForm v-model:const-css="constCss" />
    </template>
    <!--    TODO: сохранить в конечный вид-->
    <Card class="save">
      <template #content>
        <Button label="Сохранить" severity="success" variant="outlined" @click="saveSetting" />
      </template>
    </Card>
  </div>
</template>

<style scoped lang="scss">
.form {
  height: 100%;
  .tabs {
    .tab {
      i {
        margin-right: 8px;
      }
    }
  }
}
</style>
