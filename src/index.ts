import { AssistantPackage, RuleDefinition } from '@sketch-hq/sketch-assistant-types'

const textDisallow: RuleDefinition = {
  rule: async (context) => {
    const { utils } = context

    const pattern = utils.getOption('pattern')
    if (typeof pattern !== 'string') throw Error()
  
    for (const layer of utils.objects.text) {
      const value = layer.attributedString.string
      if (value.includes(pattern)) {
        utils.report(`Layer "${layer.name}" contains "${pattern}"`, layer)
      }
    }
  },
  name: 'first-sketch-assistant/text-disallow',
  title: (config) => `Text should not contain "${config.pattern}"`,
  description: 'Reports a violation when text layers contain a configurable text pattern',
}

const texFontName: RuleDefinition = {
  rule: async (context) => {
    const { utils } = context

    const allowed = utils.getOption('allowed')
    if (typeof allowed !== 'string') throw Error()
    
    for (const text of utils.objects.text) {
      const fontName = text.style?.textStyle?.encodedAttributes?.MSAttributedStringFontAttribute.attributes.name

      if (!fontName?.startsWith(allowed)) {
        utils.report(`Invalid font name "${fontName}"`, text)
      }
    }
  },
  name: 'first-sketch-assistant/text-font-name',
  title: (config) => `Font name should be start "${config.allowed}"`,
  description: 'Reports a violation when text layers contain a configurable text pattern',
}

const assistant: AssistantPackage = async () => {
  return {
    name: 'first-sketch-assistant',
    rules: [textDisallow, texFontName],
    config: {
      rules: {
        'first-sketch-assistant/text-disallow': { 
          active: true,
          pattern: 'lorem-ipsum',
        },
        'first-sketch-assistant/text-font-name': { 
          active: true,
          allowed: 'Hiragino',
        },
      },
    },
  }
}

export default assistant
