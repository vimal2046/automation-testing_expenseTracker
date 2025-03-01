const {test,expect} = require("@playwright/test");
import testData from './testData.json';

test('Should load the home page and match the URL',async ({page}) =>{
    await page.goto("http://127.0.0.1:3000/");
    await expect(page).toHaveURL("http://127.0.0.1:3000/")
});


test("to check all necessary elements are present on the same page ",async ({page}) => {
    await page.goto("http://127.0.0.1:3000/");
    //checking all elements is available or not
    const elements = ['#outer-box','#title',"#amount","#category",'#description','#date',
        '#submit-button','#filter-category','#sort-option','#total-amount','.table-responsive.mt-2']
    for (const selector of elements){
        await expect(page.locator(selector)).toBeVisible();
    }
})


test("input validations",async ({page}) => {
    const today = new Date().toISOString().split('T')[0];//to get current date
    await page.goto("http://127.0.0.1:3000/")
    //input number between 1 to 500
    await page.fill('#amount','500');
    await page.selectOption('#category','Food');
    await page.fill("#description","first description");
    await expect(page.locator("#description")).toHaveValue("first description");
    await expect(page.locator('#date')).toHaveValue(today);
    await page.click('#submit-button');
    //check toast msg is showing or not
    //await page.locator("div[aria-live='polite']");

    await page.fill('#amount','10');
     //checking category with 'travel' is choosing
    await page.selectOption('#category','Travel');
    await page.fill("#description","");

    //checking with old dates
    await page.fill('#date', '2025-01-15')
    await expect(page.locator('#date')).toHaveValue('2025-01-15');
    await page.click('#submit-button');

    //checking category with "Bills"
    await page.fill('#amount','10000');
    await page.selectOption('#category','Bills');
    await page.fill("#description","3rdd description");
    await expect(page.locator("#description")).toHaveValue("3rdd description");
    //check with futture dates
    await page.fill('#date', '2025-03-15')
    await expect(page.locator('#date')).toHaveValue('2025-03-15');
    await page.click('#submit-button');

    //checking category with "Entertainment"
    await page.fill('#amount','250');
    await page.selectOption('#category','Entertainment');
    await page.fill("#description","4th description");
    await expect(page.locator("#description")).toHaveValue("4th description");
    await expect(page.locator('#date')).toHaveValue(today);
    await page.click('#submit-button');
    
    //checking category with "others"
    await page.fill('#amount','1');
    await page.selectOption('#category','Others');
    await page.fill("#description","4th description");
    await expect(page.locator("#description")).toHaveValue("4th description");
    await expect(page.locator('#date')).toHaveValue(today);
    await page.click('#submit-button');
    
    //total-10761 // sum of expense is correct or not
    const totalAmount = await page.locator("#total-amount").textContent();
    const totalNumber = parseFloat(totalAmount.replace(/[$,]/g, ''));
    expect(totalNumber).toBe(10761)
    await page.pause()

})

test("verify the toggle button is working or not",async ({page}) => {
    await page.goto("http://127.0.0.1:3000/");
    const toggleButton = page.locator('#dark-mode-toggle');
    const body = page.locator('body');

    await expect(body).not.toHaveClass(/dark-mode/)
    await toggleButton.click();
    await expect(body).toHaveClass(/dark-mode/);

    await toggleButton.click();

    await expect(body).not.toHaveClass(/dark-mode/);

});

// Loop through multiple values from JSON file
test("loop through multiple values from JSON file",async ({page}) => {
    
    await page.goto('http://127.0.0.1:3000/');
    //fill the form with dynammic data
    for (const data of testData){
        await page.fill('#amount', data.amount);
        await page.selectOption('#category', {label: data.category});
        await page.fill('#description',data.description);
        await page.fill('#date',data.date)
        
    }
})






