import { resolve } from 'path'
import { testAssistant } from '@sketch-hq/sketch-assistant-utils'

import Assistant from '..'

test('text-font-name', async () => {
  const { violations, ruleErrors } = await testAssistant(
    resolve(__dirname, './font-name.sketch'),
    Assistant,
  )

  const textFontNameViolations = violations.filter(
    (v) => v.ruleName === 'first-sketch-assistant/text-font-name'
  )

  expect(textFontNameViolations).toHaveLength(1)
  expect(ruleErrors).toHaveLength(0)
})
