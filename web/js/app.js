// This file bootstraps the entire application.

var SurveyApp = require('./components/SurveyApp.react');
var React = require('react');
var ReactDOM = require('react-dom');

window.React = React; // export for http://fb.me/react-devtools
window.ReactDOM = ReactDOM;

ReactDOM.render(
    <SurveyApp />,
    document.getElementById('react')
);
