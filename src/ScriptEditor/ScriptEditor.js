import React from 'react';
import { RichUtils, Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';

const ScriptEditor = React.createClass({
  propTypes: {
    onChangeDeep: React.PropTypes.func
  },
  getInitialState() {
    return {
      editorState: EditorState.createWithContent(convertFromRaw(this.props.value))
    }
  },
  focus: () => this.refs.editor.focus(),
  handleKeyCommand: function(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  },
  onTab: function(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  },
  toggleBlockType: function(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  },
  toggleInlineStyle: function(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    )
  },
  componentWillReceiveProps(nextProps){
    this.setState({
      editorState: EditorState.createWithContent(convertFromRaw(nextProps.value))
    })
  },
  onChange: function(editorState) {
    this.setState({ editorState: editorState });
    this.props.onChangeDeep(editorState.getCurrentContent())
  },
	render: function() {
    console.log('render editor', this.state.editorState);
		return (
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        placeholder="Enter some text..."
        ref="editor"
      />
		)
	}
});

export default ScriptEditor;
