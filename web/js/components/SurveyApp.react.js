/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var CompletedSurvey = require('./CompletedSurvey.react');
var CurrentSurvey = require('./CurrentSurvey.react');
var Questionnaire = require('./Questionnaire.react');
var SurveyStore = require('../stores/SurveyStore');
var SurveyActions = require('../actions/SurveyActions');
var React = require('react');

function getSurveyState() {
  return SurveyStore.getSurveyData();
}

var SurveyApp = React.createClass({
  
  getInitialState: function() {
      /*
        list_of_questions
        current_survey
        current_question
        current_answer
        current_question_index
        current_survey_id
        survey_list
        last_question
       */
    return  getSurveyState();
  },
    
  componentDidMount: function() {
    SurveyStore.addChangeListener(this._onChange);
  },
  
  componentWillUnmount: function() {
    SurveyStore.removeChangeListener(this._onChange);
  },
  
  _onChange: function() {
    this.setState(getSurveyState());
  },
  
  _onClick: function(){
    SurveyActions.clearQuestionnaire();
  },
  
  render: function() {
      
    return (
      <div className="surveyApp">
        <CompletedSurvey surveyList= {this.state.survey_list} />
        <CurrentSurvey 
                    question= {this.state.current_question} 
                    answer= {this.state.current_answer}
                    islastQuestion = {this.state.last_question}
        />
        <Questionnaire qnda_list={this.state.current_survey} />
        <input type= 'button'
                value= 'New Survey'
                onClick= {this._onClick} 
        />
      </div>
    );
  }

});

module.exports = SurveyApp;
