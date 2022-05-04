
const {Builder, Capabilities, By} = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()


beforeAll(async () => {
    await driver.get('http://127.0.0.1:5500/movieList/index.html')
})


afterAll(async () => {
    await driver.quit()
})

test('cross off a movie', async () => {
    await driver.findElement(By.xpath('//input')).sendKeys('Joker');
    await driver.findElement(By.xpath('//button')).click();
    await driver.findElement(By.xpath('//span')).click();
    const span = await driver.findElement(By.xpath('//span'));
    const spanClass = await span.getAttribute('class');
    expect(spanClass).toBe('checked')
})

test('delete a movie', async () => {
    const spanText = await driver.findElement(By.xpath('//span')).getText();
    expect(spanText).toBe('Joker')
    await driver.findElement(By.id('Joker')).click();
    const spans = await driver.findElements(By.xpath('//span'));
    expect(spans.length).toBe(0);
})

test('press enter adds movie', async () => {
    await driver.findElement(By.xpath('//input')).sendKeys('Harry Potter\n');
    await driver.sleep(2000)
    const spanText = await driver.findElement(By.xpath('//span')).getText();
    await driver.sleep(2000)
    expect(spanText).toBe('Harry Potter')
})
