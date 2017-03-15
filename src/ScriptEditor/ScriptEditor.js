import React from 'react';
import { RichUtils, Editor, EditorState, convertFromRaw, convertToRaw, ContentState, convertFromHTML, convertToHTML } from 'draft-js';
import './ScriptEditor.css';
import DeepstreamMixin from 'deepstream.io-tools-react';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

let pageCount = 1;
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
    case 'blockquote': return 'RichEditor-direction';
    case 'header-one': return 'RichEditor-shotHeading';
    case 'header-two': return 'RichEditor-fadeIn';
    case 'header-three': return 'RichEditor-transition';
    case 'header-four': return 'RichEditor-dialogue';
    case 'header-five': return 'RichEditor-characterName';
    case 'header-six': return 'RichEditor-parenthetical';
    case 'code-block': return 'RichEditor-pageNumber'
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
  {label: 'Shot Heading', style: 'header-one'},
  {label: 'FADE IN:', style: 'header-two'},
  {label: 'Transition', style: 'header-three'},
  {label: 'Dialogue', style: 'header-four'},
  {label: 'Character Name', style: 'header-five'},
  {label: 'Parenthetical', style: 'header-six'},
  {label: 'Direction', style: 'blockquote'},
  // {label: 'UL', style: 'unordered-list-item'},
  // {label: 'OL', style: 'ordered-list-item'},
  {label: 'Page Number', style: 'code-block'},
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
    const page = 1056 - 96;
    const measure = document.getElementsByClassName('public-DraftEditor-content')[0].clientHeight;
    console.log(measure);
    // const pageBreak = convertFromHTML('<p>Hello</p>');
    // const pageBreakContentState = stateFromHTML('<hr>');
    // const pageBreakBlock = ContentState.createFromBlockArray(
    //   pageBreak.contentBlocks,
    //   pageBreak.entityMap
    // );
    // console.log(pageBreakBlock);
    // pageCount = 1;
    console.log(pageCount);

    if (measure > pageCount * page) {
      // console.log(pageCount);
      const endKey = newEditorState.getSelection().getEndKey();
      EditorState.moveFocusToEnd(newEditorState);
      let currentHTML = stateToHTML(newEditorState.getCurrentContent());
      currentHTML = currentHTML + '<p>PAGE BREAK</p><p>PAGE BREAK</p><p>PAGE BREAK</p><p>PAGE BREAK</p><p>PAGE BREAK</p><p>PAGE BREAK</p>';
      const contentState = stateFromHTML(currentHTML);
      newEditorState = EditorState.push(newEditorState, contentState, 'insert-fragment');
      const rawState = convertToRaw(newEditorState.getCurrentContent())
      console.log(pageCount);
      pageCount += 1;
      // this.setState({
      //   raw: convertToRaw(editorStateWithBreak.getCurrentContent()),
      //   local: {
      //     selection: editorStateWithBreak.getSelection()
      //   }
      // })
      // console.log(pageCount);
    }
    // else if (pageCount > 0) {
      // else if (measure < page * pageCount - 1) {
      //   pageCount -= 1;
      //   console.log(pageCount);
      // }
    // }
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
      <div className="ScriptEditor">
        <div className="RichEditor-root">
          <BlockStyleControls
            editorState={withSelection}
            onToggle={this.toggleBlockType.bind(null, withSelection)}
          />
          {/* <InlineStyleControls
            editorState={withSelection}
            onToggle={this.toggleInlineStyle.bind(null, withSelection)}
          /> */}
          <div onClick={this.focus}>
            <Editor
              editorState={withSelection}
              onChange={this.onChange}
              // placeholder="Enter some text..."
              ref="editor"
              spellCheck={true}
              onTab={this.onTab.bind(null, withSelection)}
              handleKeyCommand={this.handleKeyCommand.bind(null, withSelection)}
              customStyleMap={styleMap}
              blockStyleFn={getBlockStyle}
              className="Editor"
              id="editor"
            />
          </div>
        </div>
      </div>
    )
  }
})

export default ScriptEditor;
