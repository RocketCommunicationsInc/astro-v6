import { test, expect } from '@playwright/test'
import {
    startTestInBefore,
    setBodyContent,
    startTestEnv,
} from './utils/_startTestEnv'

test.describe('Tabs', () => {
    test.beforeEach(async ({ page }) => {
        await startTestInBefore(page)

        await setBodyContent(
            page,
            `
            <div style="display: flex; flex-flow: column">
                <rux-tabs id="tab-set-id-1">
                    <rux-tab id="tab-id-1">Tab 1</rux-tab>
                    <rux-tab id="tab-id-2">Tab 2</rux-tab>
                    <rux-tab id="tab-id-3">Tab 3</rux-tab>
                </rux-tabs>
                <rux-tab-panels aria-labelledby="tab-set-id-1">
                    <rux-tab-panel aria-labelledby="tab-id-1">
                        <div
                            style="
                                padding: 1vw;
                                border: rgba(255, 255, 255, 0.15) dashed 1px;
                                font-family: monospace;
                            "
                        >
                            <pre><<span>!-- Tab 1 HTML content --</span>></pre>
                        </div>
                    </rux-tab-panel>
                    <rux-tab-panel aria-labelledby="tab-id-2">
                        <div
                            style="
                                padding: 1vw;
                                border: rgba(255, 255, 255, 0.15) dashed 1px;
                                font-family: monospace;
                            "
                        >
                            <pre><<span>!-- Tab 2 HTML content --</span>></pre>
                        </div>
                    </rux-tab-panel>
                    <rux-tab-panel aria-labelledby="tab-id-3">
                        <div
                            style="
                                padding: 1vw;
                                border: rgba(255, 255, 255, 0.15) dashed 1px;
                                font-family: monospace;
                            "
                        >
                            <pre><<span>!-- Tab 3 HTML content --</span>></pre>
                        </div>
                    </rux-tab-panel>
                </rux-tab-panels>
            </div>
        `
        )
    })

    test('it renders', async ({ page }) => {
        const el = page.locator('rux-tabs').first()
        await expect(el).toBeVisible()
        await expect(el).toHaveClass('hydrated')
    })
    test('first tab is selected by default', async ({ page }) => {
        //Arrange
        const tab1 = page.locator('#tab-id-1')
        const tab2 = page.locator('#tab-id-2')

        // Assert
        await expect(tab1).toHaveAttribute('selected', '')
        await tab2
            .evaluate((e) => {
                return e.hasAttribute('selected')
            })
            .then((e) => {
                expect(e).toBeFalsy()
            })
    })
    test('selects tab when user clicks', async ({ page }) => {
        //Arrange
        const tab1 = page.locator('#tab-id-1')
        const tab2 = page.locator('#tab-id-2')
        const tab1Child = tab1.locator('.rux-tab')
        const tab2Child = tab2.locator('.rux-tab')

        //Act
        await tab2Child.click({ force: true })

        //Assert
        await expect(tab2).toHaveAttribute('selected', '')
        await tab1
            .evaluate((e) => {
                return e.hasAttribute('selected')
            })
            .then((e) => {
                expect(e).toBeFalsy()
            })

        //Act
        await tab1Child.click({ force: true })

        //Assert
        await expect(tab1).toHaveAttribute('selected', '')
    })
    test('shows correct panel when its tab is clicked', async ({ page }) => {
        //Arrange
        const ruxTabPanel1 = page.locator('rux-tab-panel').nth(0)
        const ruxTabPanel2 = page.locator('rux-tab-panel').nth(1)
        const ruxTabPanel3 = page.locator('rux-tab-panel').nth(2)
        const tabId2 = page.locator('#tab-id-2')
        const tab2Child = tabId2.locator('.rux-tab')

        //Assert
        await expect(ruxTabPanel1).not.toHaveClass('hydrated hidden')
        await expect(ruxTabPanel2).toHaveClass('hydrated hidden')
        await expect(ruxTabPanel3).toHaveClass('hydrated hidden')

        //Act
        await tab2Child.click({ force: true })

        //Assert
        await expect(ruxTabPanel1).toHaveClass('hydrated hidden')
        await expect(ruxTabPanel2).not.toHaveClass('hydrated hidden')
        await expect(ruxTabPanel3).toHaveClass('hydrated hidden')
    })
})
test.describe('Multiple tabs on same page', () => {
    test.beforeEach(async ({ page }) => {
        await startTestInBefore(page)

        await setBodyContent(
            page,
            `
        <div class="mydiv">
        <rux-tabs id="tab-set-id-1">
            <rux-tab id="tab-id-1">Top 1 title</rux-tab>
            <rux-tab id="tab-id-2">Top 2 title</rux-tab>
            <rux-tab id="tab-id-3">Top 3 title</rux-tab>
        </rux-tabs>

        <rux-tab-panels aria-labelledby="tab-set-id-1">
            <rux-tab-panel id="t1content" aria-labelledby="tab-id-1">Top Tab 1 content</rux-tab-panel>
            <rux-tab-panel id="t2content" aria-labelledby="tab-id-2">Top Tab 2 content</rux-tab-panel>
            <rux-tab-panel id="t3content" aria-labelledby="tab-id-3">Top Tab 3 content</rux-tab-panel>
        </rux-tab-panels>
    </div>

    <div class="mydiv">
        <rux-tabs id="tab-set-id-2">
            <rux-tab id="tab-id-11">Middle 1 title</rux-tab>
            <rux-tab id="tab-id-22">Middle 2 title</rux-tab>
            <rux-tab id="tab-id-33">Middle 3 title</rux-tab>
        </rux-tabs>

        <rux-tab-panels aria-labelledby="tab-set-id-2">
            <rux-tab-panel id="b1content" aria-labelledby="tab-id-11">Middle Tab 1 content</rux-tab-panel>
            <rux-tab-panel id="b2content" aria-labelledby="tab-id-22">Middle Tab 2 content</rux-tab-panel>
            <rux-tab-panel id="b3content" aria-labelledby="tab-id-33">Middle Tab 3 content</rux-tab-panel>
        </rux-tab-panels>
    </div>
    <div class="mydiv">
        <rux-tabs id="tab-set-id-3">
            <rux-tab id="tab-id-111">Bottom 1 title</rux-tab>
            <rux-tab id="tab-id-222">Bottom 2 title</rux-tab>
            <rux-tab id="tab-id-333">Bottom 3 title</rux-tab>
        </rux-tabs>

        <rux-tab-panels aria-labelledby="tab-set-id-3">
            <rux-tab-panel id="b1content" aria-labelledby="tab-id-111">Bottom Tab 1 content</rux-tab-panel>
            <rux-tab-panel id="b2content" aria-labelledby="tab-id-222">Bottom Tab 2 content</rux-tab-panel>
            <rux-tab-panel id="b3content" aria-labelledby="tab-id-333">Bottom Tab 3 content</rux-tab-panel>
        </rux-tab-panels>
    </div>
        `
        )
    })

    test('it should have the first tab of each rux-tabs visible', async ({
        page,
    }) => {
        const topContent = page
            .locator('rux-tab-panels')
            .first()
            .locator('rux-tab-panel')
            .first()
        await expect(topContent).toBeVisible()
        //Should only see the first rux-tab-panel
        const topContent2 = page
            .locator('rux-tab-panels')
            .first()
            .locator('rux-tab-panel')
            .nth(1)
        await expect(topContent2).not.toBeVisible()

        const middleContent = page
            .locator('rux-tab-panels')
            .nth(1)
            .locator('rux-tab-panel')
            .first()
        await expect(middleContent).toBeVisible()

        const bottomContent = page
            .locator('rux-tab-panels')
            .nth(2)
            .locator('rux-tab-panel')
            .first()
        await expect(bottomContent).toBeVisible()
    })
    test('it should not hide other rux-tabs content when a different rux-tab is clicked', async ({
        page,
    }) => {
        const toClick = page
            .locator('rux-tabs')
            .first()
            .locator('rux-tab')
            .nth(1)

        //This should not be visible until it's tab is clicked.
        const topContent2 = page
            .locator('rux-tab-panels')
            .first()
            .locator('rux-tab-panel')
            .nth(1)
        await expect(topContent2).not.toBeVisible()

        //This should remain visible throughout the test.
        const bottomContent = page
            .locator('rux-tab-panels')
            .nth(2)
            .locator('rux-tab-panel')
            .first()
        await expect(bottomContent).toBeVisible()

        //click the top middle tab
        await toClick.click()

        //That tab should be visible now, and the other tabs that were visible should still be visible.
        await expect(topContent2).toBeVisible()
        await expect(bottomContent).toBeVisible()
    })
    test('it can dynamically add tabs that behave correctly', async ({
        page,
    }) => {
        await setBodyContent(
            page,
            `
        <rux-tabs id="tab-set-id-1">
        <rux-tab id="tab-id-1">Tab 1 title</rux-tab>
        <rux-tab id="tab-id-2">Tab 2 title</rux-tab>
        <rux-tab id="tab-id-3">Tab 3 title</rux-tab>
    </rux-tabs>
    <rux-tab-panels aria-labelledby="tab-set-id-1">
        <rux-tab-panel aria-labelledby="tab-id-1">Tab 1 HTML content</rux-tab-panel>
        <rux-tab-panel aria-labelledby="tab-id-2">Tab 2 HTML content</rux-tab-panel>
        <rux-tab-panel aria-labelledby="tab-id-3">Tab 3 HTML content</rux-tab-panel>
    </rux-tab-panels>
    <rux-button id="add">Add Tab</rux-button>
        `
        )
        await page.addScriptTag({
            content: `
    let tabs = document.querySelector('rux-tabs')
    let panels = document.querySelector('rux-tab-panels')
    let btn = document.getElementById('add')
    let count = document.querySelectorAll('rux-tab').length
    btn.addEventListener('click', () => {
        let newTab = document.createElement('rux-tab')
        count++
        newTab.id = 'tab-id-' + count
        newTab.textContent = 'Tab' + count + ' title'
        let newPanel = document.createElement('rux-tab-panel')
        let str = 'tab-id-' + count
        newPanel.setAttribute('aria-labelledby', str)
        newPanel.textContent = 'Tab ' + count + ' HTML content'
        tabs.appendChild(newTab)
        panels.appendChild(newPanel)
    })
    `,
        })

        //Add new tab by pressing button, select new tab, select diff tab. Check selected at each stage
        const btn = page.locator('#add')
        await btn.click()
        const newTab = page.locator('#tab-id-4')
        await newTab
            .evaluate((e) => {
                return e.hasAttribute('selected')
            })
            .then((e) => {
                expect(e).toBeFalsy()
            })
        await newTab.click()
        await page.waitForTimeout(100)
        await newTab
            .evaluate((e) => {
                return e.hasAttribute('selected')
            })
            .then((e) => {
                expect(e).toBeTruthy()
            })
        // click again on first tab, make sure newTab becomes un-selected
        const firstTab = page.locator('#tab-id-1')
        await firstTab.click()
        await page.waitForTimeout(100)
        await firstTab
            .evaluate((e) => {
                return e.hasAttribute('selected')
            })
            .then((e) => {
                expect(e).toBeTruthy
            })
        await newTab
            .evaluate((e) => {
                return e.hasAttribute('selected')
            })
            .then((e) => {
                expect(e).toBeFalsy()
            })
    })
})
/*
    Need to test: 
    
*/
