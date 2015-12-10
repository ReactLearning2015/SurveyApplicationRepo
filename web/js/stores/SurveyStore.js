/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var SurveyConstants = require('../constants/SurveyConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _list_of_questions = {
    "1":    "1. Please enter your name",
    "2":    "2. Please enter your age",
    "3":    "3. Gender",
    "4":    "4. Current work location.",
    "5":    "5. Are you aware of ___"
};
/** current survey the user is currently taking part, this will be a list of 
 * (question, answer) pairs.*/
var _current_survey = {};
var _current_question = _list_of_questions["1"];
var _current_answer = '';
var _current_question_index = 0;
var _last_question = "false";
var _current_survey_id = '';
//list of completed surveys.
var _survey_list = [];

var QtnAnswered_EVENT = 'QtnAnswered_EVENT';
var CHANGE_EVENT = 'change';

var SurveyStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  
  getSurveyData: function(){
      return {
        list_of_questions:_list_of_questions,
        current_survey: _current_survey,
        current_question: _current_question,
        current_answer: _current_answer,
        current_question_index: _current_question_index,
        last_question: _last_question,
        current_survey_id: _current_survey_id,
        survey_list: _survey_list
      };
  },
  
  findSurvey:   function(surveyID){
      for(var i in _survey_list){
          if(_survey_list[i].id == surveyID){
              return _survey_list[i].survey;
          }
      }
  }

});

SurveyStore.dispatchToken = AppDispatcher.register(function(action) {
  
  var len = 0;
  for(n in _list_of_questions){len++;}
    
  switch(action.actionType) {

    case SurveyConstants.SAVE_ANSWER:
      //save the current answer and add the next question
      _current_survey[action.data.question] = action.data.answer;
      if(_last_question==="true"){
        _current_question = '';
      }
      else if(_current_survey_id != ''){
        //this condition arise when a completed survey list is edited.
        _current_question = '';
      }
      else{
            var i = 1;
            for(prop in _list_of_questions){
                if(_list_of_questions[prop] === action.data.question){
                    if(i < len){
                        _current_question = _list_of_questions[i+1];
                        if((i+1) == len){
                            _current_question_index = i + 1;
                            _last_question = "true";
                          }
                    }
                    //return; //Since this is commented, exception occur on duplicate questions.
                }
                i = i+1;
            }
        }
      SurveyStore.emitChange();
      break;
    
    case SurveyConstants.SAVE_SURVEY:
        
        //save the current survey and add it to survey list
        _current_survey_id = action.data.time;
        _survey_list.push(
                    {
                        id: _current_survey_id,
                        survey: _current_survey
                    }
                    );
        _current_survey = {};
        _current_question = _list_of_questions["1"];
        _current_question_index = 0;
        _last_question = "false";
        
        _current_survey_id = '';
        
        SurveyStore.emitChange();
        break;
    
    case SurveyConstants.VIEW_COMPLETED_SURVEY:
        
        _current_survey_id = action.data.id;
        _current_survey = SurveyStore.findSurvey(_current_survey_id);
        _current_question = '';
        _current_question_index = 0;
        _last_question = "false";
        
        SurveyStore.emitChange();
        break;
    
    case SurveyConstants.CLEAR_QUESTIONNAIRE:
        
        _current_survey= {};
        _current_question = _list_of_questions["1"];
        _current_answer = '';
        _current_question_index = 0;
        _last_question = "false";
        _current_survey_id = '';
        
        SurveyStore.emitChange();
        break;
    
    case SurveyConstants.LOAD_QNDA:

        _current_question= action.data.question;
        _current_answer= action.data.answer;
        
        SurveyStore.emitChange();
        break;
    default:
      // do nothing
  }

});


module.exports = SurveyStore;


