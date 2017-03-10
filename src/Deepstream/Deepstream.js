import React from 'react';
import DeepstreamMixin from 'deepstream.io-tools-react';
import { EditorState, ContentState, convertFromRaw, convertToRaw } from 'draft-js';
// var EditorState = require('Draft.EditorState');
// var Editor = require('Draft.Editor');
import ScriptEditor from '../ScriptEditor/ScriptEditor'

const Deepstream = React.createClass({
  getInitialState() {
    return {
      // value: '',
      value: convertToRaw(ContentState.createFromText('hello world'))
    }
  },
	mixins: [ DeepstreamMixin ],
  onChangeDeep: function(editorState) {
    console.log('ed',convertToRaw(editorState));
    this.setState({ value: convertToRaw(editorState) });
  },
	render: function() {
    // console.log('--',this.state.value);
    // console.log('render editor', this.state.value);
		return (
      <ScriptEditor value={this.state.value} onChangeDeep={this.onChangeDeep} />

		)
	}
});

export default Deepstream;
