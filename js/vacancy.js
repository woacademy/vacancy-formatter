const pageLoad = page => {
    $('body').on('input', 'input[id*="Field"],textarea[id*="Field"]', updateFormatPreview);
    updateFormatPreview();
};

const nth = d => {
    if (d > 3 && d < 21)
        return 'th';

    switch (d % 10) {
      case 1:
          return "st";
      case 2:
          return "nd";
      case 3:
          return "rd";
      default:
          return "th";
    }
};

const formatDate = d => {
    return (d instanceof Date && !isNaN(d)) ?
        d.getDate() + nth(d.getDate()) + ' ' +
        d.toLocaleString('default', { month: 'short' }) + ' ' +
        d.getFullYear() :
        '';
};

const updateFormatPreview = () => {
    // Store input contents in variables.
    let vacancyName = $('#vacancyNameField').val();
    let vacancyPath = $('#vacancyPathField').val();
    let vacancyDeadline = formatDate(new Date($('#vacancyDeadlineField').val()));
    let vacancyInterviews = formatDate(new Date($('#vacancyInterviewsField').val()));
    let vacancyVisits = formatDate(new Date($('#vacancyVisitsField').val()));
    let vacancyStartDate = $('#vacancyStartDateField').val();
    let vacancySalary = $('#vacancySalaryField').val();
    let vacancyHours = $('#vacancyHoursField').val();
    let vacancyBody = $('#vacancyBodyField').val();
    let vacancyJobDescriptionURL = $('#vacancyJobDescriptionURLField').val();
    let vacancyPersonSpecificationURL = $('#vacancyPersonSpecificationURLField').val();
    let vacancyApplicationFormURL = $('#vacancyApplicationFormURLField').val();

    // The first shortcode is used to style the page and display the deadline on the vacancies page.
    let formattedBody = '[wbcr_text_snippet id="8245"]' + vacancyDeadline + ' Deadline .........................[/wbcr_text_snippet]\n';
    formattedBody += '[wbcr_php_snippet id="7863"';

    // Add deadline.
    if (vacancyDeadline)
        formattedBody += ' deadline="' + vacancyDeadline + '"';

    // Add interviews.
    if (vacancyInterviews)
        formattedBody += ' interviews="Week Commencing ' + vacancyInterviews + '"';
    
    // Add visits & tours.
    if (vacancyVisits)
        formattedBody += ' tours="Week Commencing ' + vacancyVisits + '"';

    // Add start date.
    if (vacancyStartDate)
        formattedBody += ' start_date="' + vacancyStartDate + '"';

    // Add salary.
    if (vacancySalary)
        formattedBody += ' salary="' + vacancySalary + '"';

    // Add hours.
    if (vacancyHours)
        formattedBody += ' hours="' + vacancyHours + '"';


    // Close key information.
    formattedBody += ']\n[wbcr_text_snippet id="7876"]\n';

    // Turn bulleted lists into HTML ones.
    vacancyBody = vacancyBody.replace(/^[•·]\s*(.+)$/gm, function(match, p1) { return '<li>' + p1 + '</li>'; });

    // Add <p> tags to non-list items. TODO: Fix "<p></p>" when no content.
    let bodyParagraphs = [];
    vacancyBody.split(/\n+/).forEach(paragraph => {
            bodyParagraphs.push(paragraph.includes('<li>') ? paragraph : '<p>' + paragraph + '</p>\n');
    });

    // Support multiple lists in one context.
    formattedBody = formattedBody + bodyParagraphs.join('\n');
    formattedBody = formattedBody.replace(/(?<!<\/li>\n*)(<li>.+?<\/li>(?=\n+(?!<li>)))/gs, '\n<ul>\n$1\n</ul>\n');

    // Connect previous paragraph to top of list and trim body.
    formattedBody = formattedBody.replace(/(?<=<\/p>)(\n{1,3})(?=<ul>)/g, '\n').trim();

    // The final shortcode deals with resources.
    formattedBody += '\n[wbcr_php_snippet id="7872"';

    // Job description.
    if (vacancyJobDescriptionURL)
        formattedBody += ' job_description="' + vacancyJobDescriptionURL + '"';

    if (vacancyPersonSpecificationURL)
        formattedBody += ' person_specification="' + vacancyPersonSpecificationURL + '"';

    if (vacancyApplicationFormURL)
        formattedBody += ' application_form="' + vacancyApplicationFormURL + '"';

    // Close resources.
    formattedBody += ']\n[wbcr_text_snippet id="7869"]';

    if (vacancyName && vacancyPath && vacancyBody)
        $('#formatResults').show();
    else
        $('#formatResults').hide();

    // Format the inputs and update the preview.
    $('#formatPreviewName').text(vacancyName);
    $('#formatPreviewPath').text(vacancyPath);
    $('#formatPreviewBody').text(formattedBody);
};
