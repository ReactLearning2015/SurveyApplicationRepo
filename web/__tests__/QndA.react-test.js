/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

jest.dontMock('../js/dispatcher/AppDispatcher');
jest.dontMock('../js/actions/SurveyActions');
jest.dontMock('../js/stores/SurveyStore');
jest.dontMock('../js/constants/SurveyConstants');
jest.dontMock('object-assign');
jest.dontMock('../js/components/QndA.react');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const QndA = require('../js/components/QndA.react');

var AppDispatcher = require('../js/dispatcher/AppDispatcher');
var SurveyStore = require('../js/stores/SurveyStore');

describe('QndA', () => {

  it('To check whether enter key press on textarea will save the value in store.', () => {

        // render QndA component
        var qnda = TestUtils.renderIntoDocument(<QndA question= "1. Please enter your name" answer= "Arun" />);

        var qndaNode = ReactDOM.findDOMNode(qnda);
        
        var textarea = qndaNode.getElementsByTagName("textarea")[0];
        
        //expect(textarea.textContent).toEqual('Arun');
        
        textarea.textContent = 'Nat';
        
        TestUtils.Simulate.change(textarea);
        //expect(textarea.textContent).toEqual('Nat');
        
        TestUtils.Simulate.keyDown(textarea, {key: "Enter", keyCode: 13});
        
        //textarea = qndaNode.getElementsByTagName("textarea")[0];
        
        for(var prop in SurveyStore.getSurveyData().current_survey){
            if(prop == "1. Please enter your name"){
                expect(SurveyStore.getSurveyData().current_survey[prop]).toEqual('Nat');
            }
        }
        
        expect(SurveyStore.getSurveyData().current_question).toEqual('2. Please enter your age')

      });

});