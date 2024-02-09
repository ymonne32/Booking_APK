import * as assert from "assert";

describe('Booking App automation', () => {
    it('should make a reservation', async () => {

        const destination: string = "CUSCO";
        const initDate: string = "14 February 2024";

        try
        {
            let element = await $('//android.widget.ImageButton[@content-desc="Navigate up"]');

            if (element)
                await element.click();
        }
        catch (err)
        { }
        
        let citySearch = await $('//android.widget.LinearLayout[@resource-id="com.booking:id/facet_search_box_accommodation_destination"]');
        await citySearch.click();

        let citySearchMap = await $('//android.widget.EditText[@resource-id="com.booking:id/facet_with_bui_free_search_booking_header_toolbar_content"]');
        await citySearchMap.setValue(destination);

        let itemsList = await $$('.android.view.ViewGroup');

        for (let i = 0; i < itemsList.length; i++)
        {
            const text  = await itemsList[i].$$('.android.widget.TextView')[0].getText();
            if (text.toUpperCase() === destination)
            {
                await itemsList[i].click();
                i = itemsList.length;
            }
        }

        let viewCalendar = await $(`android=new UiSelector().className("androidx.recyclerview.widget.RecyclerView")`);

        await viewCalendar.waitUntil(async() => {
            let groupMonthContainer = (await viewCalendar.$('~com.booking:id/month_custom_view')).$$('.android.view.View');
            let itemDayMonthIndex = await groupMonthContainer.findIndex(async (ix) => await ix.getProperty("content-desc") === initDate);
            await groupMonthContainer[itemDayMonthIndex].click();
        }, {
            timeout: 5000,
            timeoutMsg: "not found month selector"
        })

        const citySearchValue = await citySearch.getText();
        assert.strictEqual(citySearchValue, destination, "Destination OK");
    })
});

