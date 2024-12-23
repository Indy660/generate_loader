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

const constCss = defineModel<constCssType>('constCss')
const isTransparent = defineModel<boolean>('isTransparent')

interface Props {
  examples: constCssType[]
}

const prop = defineProps<Props>()
const emit = defineEmits(['change-example', 'save-setting', 'copy-setting'])

const { isMobile } = useAdaptive()

enum TAB_NAMES {
  EXAMPLES = 'Examples',
  SETTINGS = 'Setting'
}

const TABS = [
  { label: TAB_NAMES.EXAMPLES, icon: 'pi pi-spinner-dotted' },
  { label: TAB_NAMES.SETTINGS, icon: 'pi pi-cog' }
]

const currentTab = ref(TAB_NAMES.EXAMPLES)

function saveSetting() {
  emit('save-setting')
}

function copySetting() {
  emit('copy-setting')
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
    <div v-if="isMobile" class="transparent">
      <Checkbox v-model="isTransparent" binary />
      <label>Прозрачность</label>
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
        <!--        <Button label="Сохранить" severity="success" variant="outlined" @click="saveSetting" />-->
        <Button label="Copy to clipboard" severity="info" variant="outlined" @click="copySetting" />
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

  .transparent {
    padding: 20px;

    label {
      margin-left: 8px;
    }
  }
}
</style>
