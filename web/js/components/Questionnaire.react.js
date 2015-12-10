/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var SurveyStore = require('../stores/SurveyStore');
var Survey = require('./Survey.react');
var React = require('react');


function getSurveyState() {
  return SurveyStore.getSurveyData();
}

var Questionnaire = React.createClass({
    
    render: function(){
        
        return(
                <div className="questionnaire">
                    <Survey qnda_list = {this.props.qnda_list} />
                </div>
            );
    }
});

module.exports = Questionnaire;
