import { test, expect } from '@playwright/test'
import {
    startTestEnv,
    startTestInBefore,
    setBodyContent,
} from './utils/_startTestEnv'

test.describe('Select', () => {
    startTestEnv()
    test('it renders', async ({ page }) => {
        await setBodyContent(
            page,
            `
            <rux-select></rux-select>
        `
        )
        const el = page.locator('rux-select')
        await expect(el).toBeVisible()
        await expect(el).toHaveClass('hydrated')
    })
    test('it syncs value to select element', async ({ page }) => {
        await setBodyContent(
            page,
            `
        <rux-select id="ruxSelect" label="Best Thing?" name="bestThing">
            <rux-option label="Select an option" value=""></rux-option>
            <rux-option label="Red" value="red"></rux-option>
            <rux-option value="blue" label="Blue"></rux-option>
            <rux-option value="green" label="Green"></rux-option>
        </rux-select>
        `
        )
        const el = page.locator('rux-select')
        await el.evaluate((e) => e.setAttribute('value', 'blue'))
        await expect(el.locator('select')).toHaveValue('blue')
    })
    test('it syncs value from select element', async ({ page }) => {
        await setBodyContent(
            page,
            `
        <rux-select id="ruxSelect" label="Best Thing?" name="bestThing">
            <rux-option label="Select an option" value=""></rux-option>
            <rux-option label="Red" value="red"></rux-option>
            <rux-option value="blue" label="Blue"></rux-option>
            <rux-option value="green" label="Green"></rux-option>
        </rux-select>
        `
        )
        const el = page.locator('rux-select')
        await el.locator('select').selectOption('green')
        await expect(el.locator('select')).toHaveValue('green')
    })
})
test.describe('Select in a form', () => {
    test.beforeEach(async ({ page }) => {
        await startTestInBefore(page)
        await setBodyContent(
            page,
            `
        <form id="form" method="POST" action="/form">
            <rux-select id="ruxSelect" label="Best Thing?" name="bestThing">
                <rux-option label="Select an option" value=""></rux-option>
                <rux-option label="Red" value="red"></rux-option>
                <rux-option value="blue" label="Blue"></rux-option>
                <rux-option value="green" label="Green"></rux-option>
            </rux-select>
            <rux-select disabled id="disabledSelect" label="Best Thing?" name="disabled" value="red">
                <rux-option label="Select an option" value=""></rux-option>
                <rux-option label="Red" value="red"></rux-option>
                <rux-option value="blue" label="Blue"></rux-option>
                <rux-option value="green" label="Green"></rux-option>
            </rux-select>
            <!--- Multi Select ---> 
            <rux-select
                id="ruxMultiSelect"
                label="Best Thing?"
                name="multBestThing"
                multiple
            >
                <rux-option value="red" label="Red"></rux-option>
                <rux-option value="blue" label="Blue"></rux-option>
                <rux-option value="green" label="Green"></rux-option>
                <rux-option value="purple" label="Purple"></rux-option>
                <rux-option value="yellow" label="Yellow"></rux-option>
            </rux-select>
            <button id="formSubmitBtn" type="submit">submit</button>
        </form>
        <ul id="log"></ul>
        `
        )
        await page.addScriptTag({
            path: './tests/utils/formScript.js',
        })
    })
    test('it should not submit a value if disabled', async ({ page }) => {
        const log = page.locator('#log')
        const submit = page.locator('button')
        await submit.click()
        await expect(log).not.toContainText('disabled')
    })
    test('it should defalut to the option with no value', async ({ page }) => {
        const el = page.locator('#ruxSelect')
        await expect(el.locator('select')).toHaveValue('')
    })
    // Single Select in a form
    test('it should submit the correct value in a form', async ({ page }) => {
        const el = page.locator('#ruxSelect')
        const log = page.locator('#log')
        const submit = page.locator('button')
        await el.locator('select').selectOption('red')
        await submit.click()
        await expect(log).toContainText('bestThing:red')
    })
    test('it should submit correct value when typing an option after focus', async ({
        page,
    }) => {
        const el = page.locator('#ruxSelect')
        const log = page.locator('#log')
        const submit = page.locator('button')
        await el.locator('select').press('Tab')
        await el.locator('select').type('r')
        await submit.click()
        await expect(log).toContainText('bestThing:red')
    })
    test('it should submit the correct value when selecting by arrow keys after focus', async ({
        page,
    }) => {
        const el = page.locator('#ruxSelect')
        const log = page.locator('#log')
        const submit = page.locator('button')
        await el.locator('select').press('Tab')
        await el.locator('select').press('ArrowDown', { delay: 200 })
        await el.locator('select').type('b')
        await submit.click()
        await expect(log).toContainText('bestThing:blue')
    })
    // Multi Select
    test('it syncs multiple values from select element', async ({ page }) => {
        const multi = page.locator('#ruxMultiSelect')
        await multi.locator('select').selectOption(['red', 'green'])
        await expect(multi.locator('select')).toHaveValues(['red', 'green'])
    })
    test('it syncs multiple values to select element', async ({ page }) => {
        const multi = page.locator('#ruxMultiSelect')
        await multi.locator('select').selectOption(['red', 'blue'])
        await expect(multi.locator('select')).toHaveValues(['red', 'blue'])
    })
    test('it should submit correct values when selecting multiple options', async ({
        page,
    }) => {
        const multi = page.locator('#ruxMultiSelect')
        const submit = page.locator('button')
        const log = page.locator('#log')

        await multi.locator('select').selectOption(['red', 'blue'])
        await submit.click()
        await expect(log).toContainText('multBestThing:redmultBestThing:blue')
    })
})
