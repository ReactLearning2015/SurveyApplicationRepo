/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var SurveyActions = require('../actions/SurveyActions');
var React = require('react');

var SurveyTab = React.createClass({
    render: function(){
        return (
                <div>
                    <input type='button' 
                            value={this.props.survey.id} 
                            onClick= {this._onClick} 
                    />
                    <br />
                    <div className= 'clear' />
                </div>
            );
    },
    
    _onClick: function(event){
        //this.props.view(this.props.survey.id);
        if(event){
            event.preventDefault();
        }
        SurveyActions.viewCompletedSurvey({id: this.props.survey.id});
    },
    
    _clear: function(){
        SurveyActions.clearQuestionnaire();
    }
});

var CompletedSurvey = React.createClass({
    
    render: function(){
        
        var surveyList = [];
        
        for(var i in this.props.surveyList){
            surveyList.push(<SurveyTab 
                                key= {this.props.surveyList[i].id}
                                survey= {this.props.surveyList[i]} 
                                view={this._onClick} />);
        }
        
        return(
                <div className="completedSurvey">
                    {surveyList}
                </div>
            );
    },
    
    _onClick: function(surveyID){
        //todo: call action to load the questionaire panel with clicked survey
        SurveyActions.viewCompletedSurvey({id: surveyID});
    }
});

module.exports = CompletedSurvey;
