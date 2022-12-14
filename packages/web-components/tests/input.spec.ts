import { test, expect } from '@playwright/test'
import { startTestInBefore, setBodyContent } from './utils/_startTestEnv'

test.describe('Input', () => {
    const testString = 'Hello World'

    test.beforeEach(async ({ page }) => {
        await startTestInBefore(page)

        await setBodyContent(
            page,
            `
        <body class="dark-theme">
            <div style="padding: 10%; display: flex; justify-content: center">
                <form id="form">
                    <div>
                        <rux-input
                            label="Input Field"
                            id="ruxInput"
                            name="ruxInput"
                        >
                        </rux-input>
                        <input type="text" id="nativeInput" name="nativeInput" />
                    </div>

                    <div>
                        <rux-input
                            label="Disabled with value"
                            id="ruxInput2"
                            name="ruxInput2"
                            value="Hello World"
                            disabled
                        >
                        </rux-input>
                        <input
                            type="text"
                            id="nativeInput2"
                            name="nativeInput2"
                            value="Hello World"
                            disabled
                        />
                    </div>

                    <div>
                        <rux-input
                            label="Required"
                            id="ruxInput3"
                            name="ruxInput3"
                            required
                            help-text="Test Help Text"
                        >
                        </rux-input>
                        <input type="text" id="nativeInput3" name="nativeInput3" />
                    </div>

                    <div>
                        <rux-input
                            label="Password"
                            id="ruxInput4"
                            name="ruxInput4"
                            type="password"
                        >
                        </rux-input>
                    </div>
                    <div>
                        <rux-input
                            label="Read Only"
                            id="readonly"
                            name="readonly"
                            value="Should remain the same"
                            readonly
                        >
                        </rux-input>
                    </div>
                    <div>
                        <rux-input
                            label="Spellcheck"
                            id="spellcheck"
                            name="spellcheck"
                            spellcheck
                        >
                        </rux-input>
                    </div>
                    <div>
                        <rux-input
                            label="Autocomplete"
                            id="autocomplete"
                            name="autocomplete"
                            autocomplete="on"
                        >
                        </rux-input>
                    </div>
                    <div>
                        <rux-input
                            label="Autocomplete to off"
                            id="autocomplete-to-off"
                            name="autocomplete-to-off"
                            autocomplete="on"
                            type="password"
                        >
                        </rux-input>
                    </div>
                    <div>
                        <rux-input
                            label="Date type"
                            id="date-type"
                            name="date-type"
                            type="date"
                        >
                        </rux-input>
                        <input
                            type="date"
                            id="native-date"
                            value="2022-10-05"
                            name="native-date"
                        />
                    </div>
                    <div>
                        <rux-input
                            label="Datetime-local type"
                            id="datetime-local"
                            name="datetime-local"
                            type="datetime-local"
                        >
                        </rux-input>
                        <input
                            type="datetime-local"
                            id="native-datetime-local"
                            value="2022-10-05T13:25"
                            name="native-datetime-local"
                        />
                    </div>
                    <div>
                        <rux-input
                            label="Time type"
                            id="time"
                            name="time"
                            type="time"
                        >
                        </rux-input>
                        <input
                            type="time"
                            id="native-time"
                            value="01:25:00"
                            name="native-time"
                        />
                    </div>

                    <button id="formSubmitBtn" type="submit">submit</button>
                </form>
                <ul id="log"></ul>
            </div>
        </body>
        `
        )
        page.addScriptTag({
            path: './tests/utils/formScript.js',
        })
    })

    test('it renders', async ({ page }) => {
        const el = page.locator('rux-input').first()
        await expect(el).toBeVisible()
        await expect(el).toHaveClass('hydrated')
    })
    test('submits the correct value when using a form', async ({ page }) => {
        //Arrange
        const ruxInputComponent = page.locator('#ruxInput').first()
        const ruxInputChild = ruxInputComponent.locator('input').nth(1)
        const nativeInput = page.locator('#nativeInput').first()
        const formSubmitButton = page.locator('#formSubmitBtn')
        const log = page.locator('#log')

        //Act
        await ruxInputChild.type(testString)
        await nativeInput.type(testString)
        await formSubmitButton.click()

        //Assert
        await expect(log).toContainText(`ruxInput:${testString}`)
        await expect(log).toContainText(`nativeInput:${testString}`)
    })
    test('does not submit disabled even with value', async ({ page }) => {
        //Arrange
        const ruxInputComponent = page.locator('#ruxInput2').first()
        const ruxInputChild = ruxInputComponent.locator('input').nth(1)
        const nativeInput = page.locator('#nativeInput2').first()
        const formSubmitButton = page.locator('#formSubmitBtn')
        const log = page.locator('#log')

        //Assert
        await expect(ruxInputChild).toHaveValue(testString)
        await expect(nativeInput).toHaveValue(testString)
        await expect(ruxInputComponent).toHaveAttribute('disabled', '')
        await expect(ruxInputChild).toBeDisabled()
        await expect(nativeInput).toBeDisabled()

        //Act
        await formSubmitButton.click()

        //Assert
        await expect(log).not.toContainText(`ruxInput2:${testString}`)
        await expect(log).not.toContainText(`nativeInput2:${testString}`)
    })
    test('does not submit a value if input is cleared', async ({ page }) => {
        //Arrange
        const ruxInputComponent = page.locator('#ruxInput').first()
        const ruxInputChild = ruxInputComponent.locator('input').nth(1)
        const nativeInput = page.locator('#nativeInput').first()
        const formSubmitButton = page.locator('#formSubmitBtn')
        const log = page.locator('#log')

        //Act
        await ruxInputChild.type(testString)
        await nativeInput.type(testString)

        //Assert
        await expect(ruxInputChild).toHaveValue(testString)
        await expect(nativeInput).toHaveValue(testString)

        //Act
        await ruxInputChild.fill('')
        await nativeInput.fill('')
        await formSubmitButton.click()

        //Assert
        await expect(log).not.toContainText(`ruxInput:${testString}`)
        await expect(log).not.toContainText(`nativeInput:${testString}`)
    })
    test('passes correct label', async ({ page }) => {
        //Arrange
        const ruxInputComponent = page.locator('#ruxInput').first()
        const ruxInputLabel = ruxInputComponent.locator('.rux-input-label')

        //Assert
        await expect(ruxInputLabel).toContainText('Input Field')
    })
    test('prepends aesthetics to lable if required', async ({ page }) => {
        //Arrange
        const ruxInputComponent = page.locator('#ruxInput3').first()
        const ruxInputAesthetics = ruxInputComponent.locator(
            '.rux-input-label .rux-input-label__asterisk'
        )

        //Assert
        await expect(ruxInputAesthetics).toContainText('*')
    })
    test('prepends help text if attribute set', async ({ page }) => {
        //Arrange
        const ruxInputComponent = page.locator('#ruxInput3').first()
        const ruxInputHelpText = ruxInputComponent.locator('.rux-help-text')

        //Assert
        await expect(ruxInputHelpText).toContainText('Test Help Text')
    })
    test('adds rux-icon if type is password', async ({ page }) => {
        //Arrange
        const ruxInputComponent = page.locator('#ruxInput4').first()
        const ruxInputIcon = ruxInputComponent.locator('rux-icon')

        //Assert
        await expect(ruxInputIcon).toBeVisible()
    })
    test('changes icon when icon is clicked', async ({ page }) => {
        //Arrange
        const ruxInputComponent = page.locator('#ruxInput4').first()
        const ruxInputIcon = ruxInputComponent.locator('rux-icon')

        //Act
        await ruxInputIcon.click()

        //Arrange
        const ruxInputIconVisibilityOff = ruxInputIcon.locator(
            'rux-icon-visibility-off'
        )

        //Assert
        await expect(ruxInputIconVisibilityOff).toBeVisible()
    })
    test('cannot have its value changed if readonly is true', async ({
        page,
    }) => {
        //Arrange
        const readOnly = page.locator('#readonly')
        const readOnlyInput = readOnly.locator('input').nth(1)

        //Assert
        await expect(readOnlyInput).toHaveAttribute('readonly', '')
    })
    test('applies spellcheck prop to shadow input', async ({ page }) => {
        //Arrange
        const spellCheck = page.locator('#spellcheck')
        const spellCheckInput = spellCheck.locator('input').nth(1)

        //Assert
        await expect(spellCheckInput).toHaveAttribute('spellcheck', 'true')
    })
    test('applies autocomplete prop to shadow input', async ({ page }) => {
        //Arrange
        const autocomplete = page.locator('#autocomplete')
        const autocompleteInput = autocomplete.locator('input').nth(1)

        //Assert
        await expect(autocompleteInput).toHaveAttribute('autocomplete', 'on')
    })
    test('changes autocomplete to false if type is password', async ({
        page,
    }) => {
        //Arrange
        const autocomplete = page.locator('#autocomplete-to-off')
        const autocompleteInput = autocomplete.locator('input').nth(1)

        //Assert
        await expect(autocompleteInput).toHaveAttribute('autocomplete', 'off')
    })
    test('submits the correct value in type date', async ({ page }) => {
        //Arrange
        const dateType = page.locator('#date-type')
        const dateTypeInput = dateType.locator('input').nth(1)
        const formSubmitButton = page.locator('#formSubmitBtn')
        const log = page.locator('#log')

        //Act
        await dateTypeInput.fill('2022-10-05')
        await formSubmitButton.click()

        //Assert
        await expect(log).toContainText('date-type:2022-10-05')
    })
    test('submits the correct value in type datetime-local', async ({
        page,
    }) => {
        //Arrange
        const dateType = page.locator('#datetime-local')
        const dateTypeInput = dateType.locator('input').nth(1)
        const formSubmitButton = page.locator('#formSubmitBtn')
        const log = page.locator('#log')

        //Act
        await dateTypeInput.fill('2022-10-05T13:25')
        await formSubmitButton.click()

        //Assert
        await expect(log).toContainText('datetime-local:2022-10-05T13:25')
    })
    test('sumbits the correct value in type time', async ({ page }) => {
        //Arrange
        const time = page.locator('#time')
        const timeInput = time.locator('input').nth(1)
        const formSubmitButton = page.locator('#formSubmitBtn')
        const log = page.locator('#log')

        //Act
        await timeInput.fill('01:25:00')
        await formSubmitButton.click()

        //Assert
        await expect(log).toContainText('time:01:25:00')
    })
})
/*
    Need to test: 
    
*/
