import React from 'react';
// import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
// import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import { RichUtils, Editor, EditorState, convertFromRaw, convertToRaw, ContentState, genKey, ContentBlock } from 'draft-js';
import './ScriptEditor.css';
import '../../node_modules/draft-js-side-toolbar-plugin/lib/plugin.css'; // eslint-disable-line import/no-unresolved
import DeepstreamMixin from 'deepstream.io-tools-react';

// const sideToolbarPlugin = createSideToolbarPlugin();
// const { SideToolbar } = sideToolbarPlugin;
// const plugins = [sideToolbarPlugin];

// Custom overrides for "code" style.
// const styleMap = {
//   CODE: {
//     backgroundColor: 'rgba(0, 0, 0, 0.05)',
//     fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
//     fontSize: 12,
//     padding: 6,
//   },
// };

function getDataOffsetKeys(editorState) {
  const contentState = editorState.getCurrentContent();
  const dataOffsetKeys = contentState.getBlocksAsArray().map(contentBlock => {
    return contentBlock.getKey();
  });
  return dataOffsetKeys;
}

function removePageBreaks(editorState) {
  const contentState = editorState.getCurrentContent();
  const blocks = contentState.getBlocksAsArray();
  const blockTypes = blocks.map(block => {
    return block.getType();
  })
  for (let i = 0; i < blockTypes.length; i++) {
    if (blockTypes[i] === 'atomic') {
      blocks.splice(i, 1);
    }
  }
  const newContentState = ContentState.createFromBlockArray(blocks);
  const newEditorState = EditorState.createWithContent(newContentState);
  return newEditorState;
}

function addPageBreaks(editorState) {
  let newEditorState = removePageBreaks(editorState);
  let blockHeight = 0;
  let pageCount = 1;
  const pageLength = 1056;
  const dataOffsetKeys = getDataOffsetKeys(newEditorState);
  const elements = dataOffsetKeys.map(key => {
    return document.querySelector(`div[data-offset-key="${key}-0-0"]`);
  });

  for (let i = 0; i < elements.length; i++) {
    if (elements[i] === null) {
      blockHeight += 0;
    }
    else {
      if (elements[i].parentElement.className === 'RichEditor-transition') {
        blockHeight += 32 + elements[i].clientHeight;
      }
      else if (elements[i].parentElement.className === 'RichEditor-shotHeading') {
        blockHeight += 48 + elements[i].clientHeight;
      }
      else if (elements[i].parentElement.className === 'RichEditor-direction') {
        blockHeight += 32 + elements[i].clientHeight;
      }
      else if (elements[i].parentElement.className === 'RichEditor-fadeIn') {
        blockHeight += 112 + elements[i].clientHeight;
      }
      else if (elements[i].parentElement.className === 'RichEditor-dialogue') {
        blockHeight += 16 + elements[i].clientHeight;
      }
      else {
        blockHeight += 16;
      }
    }
    if (blockHeight > pageCount * pageLength) {
      const pageBreakBlock = new ContentBlock({
        key: genKey(),
        type: 'atomic',
        text: '',
        // characterList: List()
      })
      const contentState = newEditorState.getCurrentContent();
      const blocks = contentState.getBlocksAsArray();
      const leftHalfBlocks = blocks.slice(0, i).concat(pageBreakBlock);
      const rightHalfBlocks = blocks.slice(i);
      const blocksWithPageBreaks = leftHalfBlocks.concat(rightHalfBlocks);
      const newContentState = ContentState.createFromBlockArray(blocksWithPageBreaks);
      newEditorState = EditorState.createWithContent(newContentState);
      pageCount += 1;
    }
  }
  return newEditorState;
}

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-direction';
    case 'header-one': return 'RichEditor-shotHeading';
    case 'header-two': return 'RichEditor-fadeIn';
    case 'header-three': return 'RichEditor-transition';
    case 'header-four': return 'RichEditor-dialogue';
    case 'header-five': return 'RichEditor-characterName';
    case 'header-six': return 'RichEditor-parenthetical';
    case 'code-block': return 'RichEditor-pageNumber';
    case 'atomic': return 'RichEditor-pageBreak'
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

// const INLINE_STYLES = [
//   {label: 'Bold', style: 'BOLD'},
//   {label: 'Italic', style: 'ITALIC'},
//   {label: 'Underline', style: 'UNDERLINE'},
//   {label: 'Monospace', style: 'CODE'},
// ];

// const InlineStyleControls = (props) => {
//   const { editorState } = props;
//   const selectionKey = editorState.getSelection().getStartKey();
//   const hasBlockType = editorState
//     .getCurrentContent()
//     .getBlockForKey(selectionKey)
//   const currentStyle = hasBlockType ? editorState.getCurrentInlineStyle() : null;
//   return (
//     <div className="RichEditor-controls">
//       {INLINE_STYLES.map(type =>
//         <StyleButton
//           key={type.label}
//           active={currentStyle ? currentStyle.has(type.style) : false}
//           label={type.label}
//           onToggle={props.onToggle}
//           style={type.style}
//         />
//       )}
//     </div>
//   );
// };

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
    const sel = newEditorState.getSelection()
    const newEditorStateWithBreaks = addPageBreaks(newEditorState);

    this.setState({
      raw: convertToRaw(newEditorStateWithBreaks.getCurrentContent()),
      local: {
        selection: sel
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
          <div className="controls">
            <BlockStyleControls
              editorState={withSelection}
              onToggle={this.toggleBlockType.bind(null, withSelection)}
            />
          </div>
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
              // customStyleMap={styleMap}
              blockStyleFn={getBlockStyle}
              className="Editor"
              id="editor"
              // plugins={plugins}
            />
            {/* <SideToolbar /> */}
          </div>
        </div>
      </div>
    )
  }
})

export default ScriptEditor;
