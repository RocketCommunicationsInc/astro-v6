import { test, expect } from '@playwright/test'
import { startTestEnv, setBodyContent } from './utils/_startTestEnv'

test.describe('Clock', () => {
    startTestEnv()

    test('it renders', async ({ page }) => {
        await setBodyContent(
            page,
            `
            <rux-clock></rux-clock>
        `
        )
        const el = page.locator('rux-clock')
        await expect(el).toBeVisible()
        await expect(el).toHaveClass('hydrated')
    })
    test('it handles attributes', async ({ page }) => {
        await setBodyContent(
            page,
            `
        <rux-clock hide-date hide-labels></rux-clock>
    `
        )
        const el = page.locator('rux-clock')
        await expect(el).toHaveAttribute('hide-date', '')
        await expect(el).toHaveAttribute('hide-labels', '')
    })
    /*
        Need to test: 
        - timein
        - timezone changes
    */
})
