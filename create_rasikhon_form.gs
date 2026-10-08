/**
 * Creates the "Rasikhon Merchant Questionnaire" Google Form.
 * Usage: script.google.com -> New project -> paste this file -> Run createRasikhonForm
 * (authorise when prompted). The form's edit and share links appear in the Logs.
 */
function createRasikhonForm() {
  var form = FormApp.create('Rasikhon Merchant Questionnaire');
  form.setDescription('For owners of micro and small businesses in France. Select one answer per question unless stated otherwise.');
  form.setProgressBar(true);

  function single(title, choices) {
    form.addMultipleChoiceItem().setTitle(title).setChoiceValues(choices).setRequired(true);
  }
  function multi(title, help, choices, other, max) {
    var it = form.addCheckboxItem().setTitle(title).setHelpText(help).setChoiceValues(choices).setRequired(true);
    if (other) it.showOtherOption(true);
    if (max) {
      it.setValidation(FormApp.createCheckboxValidation()
        .requireSelectAtMost(max)
        .setHelpText('Select up to ' + max + '.').build());
    }
  }

  // Section 1
  form.addPageBreakItem().setTitle('Section 1  Your financing experience');
  multi('1. How did you pay for your last major business purchase?', 'Select all that apply.',
    ['Business cash.', 'Personal savings.', 'Bank loan.', 'Leasing or equipment rental.',
     'Payments spread by the supplier.', 'Family or friends.', 'Have not made a major purchase.'], true, 0);
  single('2. What happened the last time you requested financing from a French bank?',
    ['Received the full amount.', 'Received less than requested.', 'The bank refused.',
     'I abandoned the application.', 'Still waiting for an answer.', 'Never applied.']);
  single('3. How long did the bank take to give you a final answer?',
    ['Less than one week.', '1–2 weeks.', '3–4 weeks.', 'More than one month.',
     'Still waiting.', 'Cannot remember.', 'Never applied.']);
  multi('4. What caused the most difficulty when seeking bank financing?', 'Select up to two.',
    ['Too many documents.', 'Long waiting time.', 'Financing cost.', 'Required upfront contribution.',
     'Personal guarantee or collateral.', 'Bank offered too little or refused.',
     'No significant difficulty.', 'Never applied.'], true, 2);

  // Section 2
  form.addPageBreakItem().setTitle('Section 2  What your business needs');
  var q5 = form.addMultipleChoiceItem().setTitle('5. What is the main purchase or project you need financing for next?')
    .setChoiceValues(['Replace broken or outdated equipment.', 'Buy additional equipment.',
      'Renovate or fit out the premises.', 'Buy stock.', 'Open or expand a location.',
      'Cover everyday business expenses.', 'No financing need currently.']).setRequired(true);
  q5.showOtherOption(true);
  single('6. Approximately how much would that purchase or project cost?',
    ['Below €5,000.', '€5,000–€14,999.', '€15,000–€29,999.', '€30,000–€49,999.',
     '€50,000 or more.', 'Do not know yet.', 'Not applicable.']);
  single('7. How much of that cost could you pay upfront while keeping enough cash for normal business expenses?',
    ['Nothing upfront.', 'Up to 10%.', 'More than 10%, up to 25%.', 'More than 25%, up to 50%.',
     'More than 50%, but not the full amount.', 'The full amount.', 'Unsure / Not applicable.']);
  single('8. Without financing, what would you most likely do?',
    ['Pay from business cash.', 'Use personal savings or family support.', 'Buy cheaper or used equipment.',
     'Rent the equipment.', 'Delay the purchase or project.', 'Cancel it.', 'Unsure / Not applicable.']);

  // Section 3
  form.addPageBreakItem().setTitle('Section 3  Your reaction to Rasikhon')
    .setHelpText('Read this before answering\n\nRasikhon is developing a service that would buy equipment from your supplier and sell it to your business at an agreed higher total price. You would pay over time. The full price and payment schedule would be clear before you accept. Approval would depend on an assessment.');
  single('9. For your equipment purchase, what payment period would suit your business best?',
    ['Up to 3 months.', '4–6 months.', '7–12 months.', '13–24 months.', 'More than 24 months.',
     'Prefer to pay immediately.', 'Unsure / No equipment purchase planned.']);
  form.addMultipleChoiceItem()
    .setTitle('10. For every €10,000 of equipment, what is the maximum extra amount you would consider paying over your preferred period?')
    .setHelpText('Include all fees in the extra amount.')
    .setChoiceValues(['Nothing extra.', 'Up to €500.', '€501–€1,000.', '€1,001–€1,500.',
      '€1,501–€2,000.', 'More than €2,000.', 'Need an exact offer before deciding.']).setRequired(true);
  multi('11. What would you need most before trusting Rasikhon?', 'Select up to two.',
    ['A clear contract showing the full cost.', 'Clear ownership and equipment responsibilities.',
     'Clear rules for missed payments.', 'Details of any required guarantees.',
     'Evidence that the provider is legitimate.', 'Recommendations from other business owners.',
     'Confidence in the supplier and equipment.'], true, 2);
  single('12. If Rasikhon offered acceptable terms for your purchase, what would you be willing to do?',
    ['Submit a supplier quote for assessment.', 'Discuss a pilot purchase.', 'Request more information first.',
     'Wait until other businesses have used it.', 'Stay with my current financing option.',
     'Would not consider using it.']);

  Logger.log('Edit: ' + form.getEditUrl());
  Logger.log('Share: ' + form.getPublishedUrl());
}
