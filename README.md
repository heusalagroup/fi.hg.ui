# @sendanor/ui

For now this repository is only for [issue tracking](https://github.com/sendanor/ui/issues) and demo purposes.

We will possibly release our UI components as a library later -- once we have a first stable release.

Builder demo available at [lomake.app](https://www.lomake.app/builder).

### The iframe demo

Here's a iframe POC how to use the frame:

```html
<div id="iframe-container"></div>

<script src="https://www.lomake.app/libs/nor-ui-frame.min.js"></script>

<script>
(function() {

    const iframe = window.nor.uiFrame.init('iframe-container');

    iframe.on("submit", (data) => {
        console.log('SUBMIT: ', data)
    });

    iframe.on("cancel", () => {
        console.log('CANCEL')
    });

    iframe.setModel({
        "title": "Test form",
        "items": [
            {
                "type": "text-field",
                "key": "customer.firstName",
                "label": "First name"
            },
            {
                "type": "text-field",
                "label": "Last name",
                "key": "customer.lastName"
            },
            {
                "type": "text-field",
                "label": "Email",
                "key": "customer.email"
            },
            {
                "type": "text-area-field",
                "key": "order.summary",
                "placeholder": "Summary of order"
            }
        ]
    });

})();
</script>

```

Although it may already work, ***this is just a POC***. We may change the API any time!

The model for `iframe.setModel()` can be created using [lomake.app/builder](https://www.lomake.app/builder).

This example is also available at [lomake.app/test-iframe.html](https://www.lomake.app/test-iframe.html).

### Commercial release

For commercial interests like *tailored commercial release*, you may contact [our sales](mailto:info@sendanor.fi).
