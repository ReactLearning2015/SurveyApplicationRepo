/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var QndA = require('./QndA.react');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var SurveyActions = require('../actions/SurveyActions');
var React = require('react');

var SaveBtn = React.createClass({
    render: function(){
        return (
                    <input type='button' value='save' 
                            onClick= {this.props.saveSurvey} 
                    />
                );
    }
});

var CurrentSurvey = React.createClass({
    
    _onClick: function(){
        var timestamp = Date.now();
        var surveyCompletedTime = {time: timestamp};
        SurveyActions.surveyCompleted(surveyCompletedTime);
    },
    
    render: function(){
        
        var save_btn = [];
        
        if(this.props.question == '' && this.props.islastQuestion === "true"){
            save_btn.push(<SaveBtn key= 'saveBtn' saveSurvey = {this._onClick} />);
        }
        
        return(
                <div className = "currentSurvey">
                    {this.props.question == ''?<br/>:
                                    <QndA question= {this.props.question}
                                            answer= {this.props.answer} />}
                    <br />
                    {save_btn}
                </div>
            ); 
            
    }
    
});

module.exports = CurrentSurvey;
