/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var QndA = require('./QndA.react');
var React = require('react');

var Survey = React.createClass({
    
    render: function(){
        
        var qndaList = [];
        
        for(prop in this.props.qnda_list){
            qndaList.push(
                            <QndA 
                                key = {prop}
                                question= {prop} 
                                answer= {this.props.qnda_list[prop]} 
                                type= 'questionnaire' 
                            />
                        );
        }
        
        return (
                <ul>
                    {qndaList}
                </ul>
        );
    }
});


module.exports = Survey;