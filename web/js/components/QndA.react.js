/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var SurveyActions = require("../actions/SurveyActions");
var React = require('react');
var ENTER_KEY_CODE = 13;

/**
 *className = question is used to decide whether the 
 *question is displayed at CurrentSurvey panel(where question is being answered)
 *or whether the question is displayed in questionnaire panel(along with user entry). 
 **/
var Question = React.createClass({
    render: function(){
        return (<p 
                    className= {this.props.type=='questionnaire'?'question':''} >
                    {this.props.question}
                </p>
            );
    }
});

var Answer = React.createClass({
    
    getInitialState: function() {
        return {
          text: this.props.answer
        };
    },
    
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            text: nextProps.answer
        });
    },
    
    render: function(){
        var inputbox = (<textarea 
                    name="answer-box"
                    value={this.state.text}
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                />);
        var para = (<p className= ' answer'>{this.state.text}</p>);
        var textarea
        
        /**
         * to decide whether the answer tab should be a input area or label
         * */
        if(this.props.type === "questionnaire"){
            textarea= para;
        }
        else{
            textarea= inputbox;
        }
        
        return textarea;
    },
    
    _onChange: function(event, value){
        this.setState({text: event.target.value});
    },
    
    _onKeyDown: function(event){
        if (event.keyCode === ENTER_KEY_CODE) {
            event.preventDefault();
            var text= this.state.text.trim();
            if (text) {
              this.props.save(text);
            }
        this.setState({text: ""});
        }
    }
    
});

var QndA = React.createClass({
    
    _save: function(text){
        var qnda = {question: this.props.question, answer: text};
        SurveyActions.qtnAnswered(qnda);
    },
    
    _onClick: function(){
        //todo:call action to load these question and answer in currentSurvey
        if(this.props.answer!=''){
            SurveyActions.loadQndAinCurrentSurvey({
                                    question: this.props.question,
                                    answer: this.props.answer
            });
        }
    },
    
    render:function(){
        return(
            <div className= "qnda" onClick= {this._onClick} >
                <Question 
                    question={this.props.question}
                    type = {this.props.type?this.props.type:''}
                />
                <Answer 
                    save={this._save} 
                    answer = {this.props.answer?this.props.answer:''}
                    type = {this.props.type?this.props.type:''}
                />
            </div>
        );
    }
});


module.exports = QndA;