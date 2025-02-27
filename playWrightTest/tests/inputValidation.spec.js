const {test,expect} = require("@playwright/test");


test('Should load the home page and match the URL',async ({page}) =>{
    await page.goto("http://127.0.0.1:3000/");
    await expect(page).toHaveURL("http://127.0.0.1:3000/")
    //verify elements are visible
    await expect(page.locator('#outer-box')).toBeVisible();

});

test("adding expense fully all",async ({page}) => {
    await page.goto("http://127.0.0.1:3000/")
    await page.type('#amount','500');
    await page.selectOption('#category','Food');
    await page.type('//label[normalize-space()="Description"]',"hello vimal");
    await expect(page.locator('//label[normalize-space()="Description"]')).toHaveValue("hello vimal")
    await expect(page.locator('#date')).toHaveValue('2025-02-27');
    await page.click('//button[normalize-space()="Add Expense"]');
})

test("leaving empty value",async ({page}) => {
    await page.goto("http://127.0.0.1:3000/")
    await page.type("#amount",'');
    await page.selectOption('#category','Food');
    await page.type('//label[normalize-space()="Description"]',"hello vimal");
    await expect(page.locator('//label[normalize-space()="Description"]')).toHaveValue("hello vimal")
    await expect(page.locator('#date')).toHaveValue('2025-02-27');
    await page.click('//button[normalize-space()="Add Expense"]');

})