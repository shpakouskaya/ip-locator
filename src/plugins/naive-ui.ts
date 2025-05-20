import {
  create,
  NButton,
  NCard,
  NDivider,
  NIcon,
  NInput,
  NSpin,
  NText,
  NMessageProvider
} from 'naive-ui'

export const naiveUi = create({
  components: [NButton, NCard, NDivider, NIcon, NInput, NSpin, NText, NMessageProvider]
})

export const themeOverrides = {
  common: {
    primaryColor: '#2080f0',
    primaryColorHover: '#4098fc',
    primaryColorPressed: '#3730a3'
  }
}
