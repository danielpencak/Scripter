import React from 'react';
import DeepstreamMixin from 'deepstream.io-tools-react';
import { Editor, EditorState } from 'draft-js';

const ScriptEditor = React.createClass({
  getInitialState() {
    return {
      value: '',
      editorState: EditorState.createEmpty()
    }
  },
	mixins: [ DeepstreamMixin ],
	setValue: function(event) {
		this.setState({ value: event.target.value });
	},
	render: function() {
		return (
			<input value={this.state.value} onChange={this.setValue} />
      // <Editor
      //   editorState={this.state.editorState}
      //   onChange={this.onChange}
      //   placeholder="Enter some text..."
      //   ref="editor"
      // />
		)
	}
});

export default ScriptEditor
