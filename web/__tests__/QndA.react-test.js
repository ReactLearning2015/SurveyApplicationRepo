/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

jest.dontMock('../js/components/QndA.react');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const QndA = require('../js/components/QndA.react');


describe('QndA', () => {

  it('also decide whether the answer tab should be a input area or label ', () => {

        // render QndA component
        var qnda = TestUtils.renderIntoDocument(<QndA question= "Please enter your name." answer= "Arun" />);

        var qndaNode = ReactDOM.findDOMNode(qnda);
        
        var textarea = qndaNode.getElementsByTagName("textarea")[0];
        
        expect(textarea.textContent).toEqual('Arun');

      });

});