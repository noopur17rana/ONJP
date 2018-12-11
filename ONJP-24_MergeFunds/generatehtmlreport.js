const report = require('cucumber-html-report');
report.create({
  source:       './reports/cucumber-json-report.json',      // source json
  dest:         './reports/cucumber-html-report',                   // target directory (will create if not exists)
  name:         'testreport.html',                 // report file name (will be index.html if not exists)
 // template:     'mytemplate.html',             // your custom mustache template (uses default if not specified)
 // partialsDir:  './partials',                  // your custom mustache partials directory (uses default if no custom template is specified, or empty when there is template but no partials)
  title:        'Cucumber Report',             // Title for default template. (default is Cucumber Report)
  component:    'My Component',                // Subtitle for default template. (default is empty)
 // logo:         './logos/cucumber-logo.svg',   // Path to the displayed logo.
 // screenshots:  './screenshots',               // Path to the directory of screenshots. Optional.
  dateformat:   'YYYY MM DD',                  // default is YYYY-MM-DD hh:mm:ss
 // maxScreenshots: 10                           // Max number of screenshots to save (default is 1000)
})
.then(console.log)
.catch(console.error);