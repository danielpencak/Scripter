import React from 'react';
import { RichUtils, Editor, EditorState, convertFromRaw, convertToRaw, ContentState } from 'draft-js';
import './ScriptEditor.css';
import DeepstreamMixin from 'deepstream.io-tools-react';

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 12,
    padding: 6,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selectionKey = editorState.getSelection().getStartKey();
  const hasBlockType = editorState
    .getCurrentContent()
    .getBlockForKey(selectionKey)
  const blockType = hasBlockType ? hasBlockType.getType() : null;

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
  const { editorState } = props;
  const selectionKey = editorState.getSelection().getStartKey();
  const hasBlockType = editorState
    .getCurrentContent()
    .getBlockForKey(selectionKey)
  const currentStyle = hasBlockType ? editorState.getCurrentInlineStyle() : null;
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle ? currentStyle.has(type.style) : false}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const ScriptEditor = React.createClass({
  getInitialState() {
    const emptyRaw = convertToRaw(EditorState.createEmpty().getCurrentContent())
    return {
      raw: emptyRaw,
      local: {
        editorState: EditorState.createEmpty(),
        selection: EditorState.createEmpty().getSelection()
      }
    }
  },

  mixins: [DeepstreamMixin],

  focus() {
    this.refs.editor.focus()
  },

  handleKeyCommand(editorState, command) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  },
  onTab(editorState, e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, editorState, maxDepth));
  },
  toggleBlockType(editorState, blockType) {
    this.onChange(
      RichUtils.toggleBlockType(editorState, blockType)
    );
  },
  toggleInlineStyle(editorState, inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(editorState, inlineStyle)
    )
  },

  onChange(newEditorState) {
    // We need to persist the raw content in deepstream,
    // but save the current selection locally
    this.setState({
      raw: convertToRaw(newEditorState.getCurrentContent()),
      local: {
        selection: newEditorState.getSelection()
      }
    })
  },

  componentDidMount() {
    this.focus();
  },

  render() {

    // Create a new EditorState with the raw content saved from deepstream
    const newEditor = EditorState.createWithContent(convertFromRaw(this.state.raw))
    // Apply the locally saved SelectionState to the newly created EditorState
    const withSelection = EditorState.acceptSelection(newEditor, this.state.local.selection)

    return (
      <div>
        <BlockStyleControls
          editorState={withSelection}
          onToggle={this.toggleBlockType.bind(null, withSelection)}
        />
        <InlineStyleControls
          editorState={withSelection}
          onToggle={this.toggleInlineStyle.bind(null, withSelection)}
        />
        <div onClick={this.focus}>
          <Editor
            editorState={withSelection}
            onChange={this.onChange}
            placeholder="Enter some text..."
            ref="editor"
            spellCheck={true}
            onTab={this.onTab.bind(null, withSelection)}
            handleKeyCommand={this.handleKeyCommand.bind(null, withSelection)}
            customStyleMap={styleMap}
            blockStyleFn={getBlockStyle}
          />
        </div>
      </div>
    )
  }
})

export default ScriptEditor;
