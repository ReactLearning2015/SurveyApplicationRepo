/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var SurveyConstants = require('../constants/SurveyConstants');

var SurveyActions = {

  /**
   * @param  {string} text
   */
  qtnAnswered: function(qnda) {
        AppDispatcher.dispatch({
          actionType: SurveyConstants.SAVE_ANSWER,
          data: qnda //{question: , answer: }
        });
  },
  
  surveyCompleted: function(surveyCompletedTime){
        AppDispatcher.dispatch({
          actionType: SurveyConstants.SAVE_SURVEY,
          data: surveyCompletedTime //{time: }
        });
  },
  
  viewCompletedSurvey: function(surveyID){
        AppDispatcher.dispatch({
          actionType: SurveyConstants.VIEW_COMPLETED_SURVEY,
          data: surveyID //{id: }
        });
  },
  
  clearQuestionnaire: function(){
        AppDispatcher.dispatch({
            actionType: SurveyConstants.CLEAR_QUESTIONNAIRE,
            data: ''
        });
  },
  
  loadQndAinCurrentSurvey: function(qnda){
        AppDispatcher.dispatch({
            actionType: SurveyConstants.LOAD_QNDA,
            data: qnda //{question: , answer: }
        });
  }
  
};

module.exports = SurveyActions;


