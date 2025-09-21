// Show Dialog Elements
const triggers = [
    {trigger: "reviewTrigger", dialog: "reviewDialog"},
    {trigger: "feedbackTrigger", dialog: "feedbackDialog"},
    {trigger: "mailingListTrigger", dialog: "mailingListDialog"},
    {trigger: "applicationTrigger", dialog: "applicationDialog"},
    {trigger: "partnershipTrigger", dialog: "partnershipDialog"},
    {trigger: "giftCardTrigger", dialog: "giftCardDialog"},
    {trigger: "websiteIssueTrigger", dialog: "websiteIssueDialog"}
];
triggers.forEach(({
    trigger,
    dialog
}) => {
    const triggerElement = document.getElementById(trigger);
    const dialogElement = document.getElementById(dialog);
    if (triggerElement && dialogElement) {
        triggerElement.addEventListener("click", function(event) {
            event.preventDefault();
            dialogElement.showModal();
        });
        // Close the dialog when clicking outside of the form
        dialogElement.addEventListener("click", function(event) {
            if (event.target === dialogElement) {
                dialogElement.close();
            }
        });
    }
});