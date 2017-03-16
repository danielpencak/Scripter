import React from 'react';
import { RichUtils, Editor, EditorState, convertFromRaw, convertToRaw, ContentState, convertFromHTML, convertToHTML, genKey, ContentBlock, List, BlockMapBuilder } from 'draft-js';
import './ScriptEditor.css';
import DeepstreamMixin from 'deepstream.io-tools-react';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { ReactPageDiv } from 'react-page-div';

// let pageCount = 1;
// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 12,
    padding: 6,
  },
};

function getDataOffsetKeys(editorState) {
  const contentState = editorState.getCurrentContent();
  const dataOffsetKeys = contentState.getBlocksAsArray().map(contentBlock => {
    // console.log(contentBlock);
    return contentBlock.getKey();
  });
  return dataOffsetKeys;
}

function removePageBreaks(editorState) {
  const contentState = editorState.getCurrentContent();
  // const dataOffsetKeys = getDataOffsetKeys(editorState);
  const blocks = contentState.getBlocksAsArray();
  const blockTypes = blocks.map(block => {
    return block.getType();
  })
  console.log(blocks.length);
  for (let i = 0; i < blockTypes.length; i++) {
    if (blockTypes[i] === 'atomic') {
      blocks.splice(i, 1);
      // const pageBreakOffsetKey = dataOffsetKeys[i];
      // const pageBreakBlock = contentState.getBlockForKey(pageBreakOffsetKey);
      // const pageBreakLength = pageBreakBlock.getLength();
      // const pageBreakText = pageBreakBlock.getText().slice(0);
      // const pageBreakBlockRemoved = contentState.getBlockForKey(pageBreakOffsetKey);
      // console.log(pageBreakBlockRemoved.getText());
    }
  }
  const newContentState = ContentState.createFromBlockArray(blocks);
  const newEditorState = EditorState.createWithContent(newContentState);
  console.log(blocks.length);
  return newEditorState;
}

function addPageBreaks(editorState) {
  let newEditorState = removePageBreaks(editorState);
  // let newEditorState = editorState
  let blockHeight = 0;
  // let i = 1
  let pageCount = 1;
  const pageLength = 1056;
  const dataOffsetKeys = getDataOffsetKeys(newEditorState);
  // console.log(dataOffsetKeys);
  const elements = dataOffsetKeys.map(key => {
    return document.querySelector(`div[data-offset-key="${key}-0-0"]`);
  });

  // console.log(elements);
  // while (i <= pageCount) {
    for (let i = 0; i < elements.length; i++) {
      // if (element.parentElement.className === 'RichEditor-pageBreak') {
      //   console.log('page break');
      // }
      // console.log(pageCount);
      if (elements[i] === null) {
        blockHeight += 0;
      }
      else {
        if (elements[i].parentElement.className === 'RichEditor-transition') {
          blockHeight += 48;
        }
        else if (elements[i].parentElement.className === 'RichEditor-shotHeading') {
          blockHeight += 64;
        }
        else if (elements[i].parentElement.className === 'RichEditor-direction') {
          blockHeight += 48;
        }
        else if (elements[i].parentElement.className === 'RichEditor-fadeIn') {
          blockHeight += 128;
        }
        else if (elements[i].parentElement.className === 'RichEditor-dialogue') {
          blockHeight += 32;
        }
        else {
          blockHeight += 16;
        }
        //TODO: if parent className is RichEditor-pageBreak remove block
      }
      // console.log(blockHeight);
      // TODO: check if total block height is greater than a page; if so insert a page break
      // console.log(pageCount);
      if (blockHeight > pageCount * pageLength) {
        const pageBreakBlock = new ContentBlock({
          key: genKey(),
          type: 'atomic',
          text: '__________________________',
          // characterList: List()
        })
        const contentState = newEditorState.getCurrentContent();
        const blocks = contentState.getBlocksAsArray();
        const leftHalfBlocks = blocks.slice(0, i).concat(pageBreakBlock);
        // console.log(leftHalfBlocks);
        const rightHalfBlocks = blocks.slice(i);
        const blocksWithPageBreaks = leftHalfBlocks.concat(rightHalfBlocks);
        console.log('pageCount', pageCount);
        // console.log(blocks);
        const newContentState = ContentState.createFromBlockArray(blocksWithPageBreaks);
        newEditorState = EditorState.createWithContent(newContentState);

        // const newContentState = ContentState.createFromBlockArray([pageBreakBlock]);
        // const pageBreakBlockMap = contentState.getBlockMap().set(pageBreakBlock.key, pageBreakBlock);
        // editorState = EditorState.push(editorState, ContentState.createFromBlockArray(pageBreakBlockMap.toArray()))
        // console.log(editorState);
        pageCount += 1;
      }
    }
  // }
  return newEditorState;
}

// function addPageBreaks() {
//
// }

// function checkIfNeedNewPage(editorState) {
//   const pageLength = 1056;
//   const totalHeightOfBlocks = heightOfBlocks(editorState);
//   console.log(totalHeightOfBlocks);
//   if (totalHeightOfBlocks > pageCount * pageLength) {
//     console.log('need new page');
//     const dataOffsetKeys = getDataOffsetKeys(editorState);
//     // console.log(dataOffsetKeys[dataOffsetKeys.length - 1]);
//     // console.log(editorState.getCurrentContent().getLastBlock().getKey());
//     const pageBreakArray = [new ContentBlock({
//       key: genKey(),
//       type: 'unstyled',
//       text: 'hello',
//       // characterList: List()
//     })]
//     const pageBreak = BlockMapBuilder.createFromArray(pageBreakArray);
//     console.log(pageBreak);
//     // EditorState.moveFocusToEnd(editorState);
//     // let currentHTML = stateToHTML(editorState.getCurrentContent());
//     // currentHTML = currentHTML + '<p class="pageBreak"></p>';
//     // currentHTML = currentHTML + `<div style="margin-top:48px;margin-bottom:16px;font-weight:normal;font-size:16px;color:black;margin-left:681.6px;">${pageCount + 1}</div>`;
//     // const contentState = stateFromHTML(currentHTML);
//     // editorState = EditorState.push(editorState, contentState, 'insert-fragment');
//     pageCount += 1;
//     // return editorState;
//   }
//   else if (totalHeightOfBlocks < (pageCount - 1) * pageLength ){
//     console.log('remove page');
//     pageCount -= 1;
//     // return editorState;
//   }
//   return editorState;
// }

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
    const page = 1056;
    const measure = document.getElementsByClassName('public-DraftEditor-content')[0].clientHeight;
    // console.log(measure);
    // const pageBreak = convertFromHTML('<p>Hello</p>');
    // const pageBreakContentState = stateFromHTML('<hr>');
    // const pageBreakBlock = ContentState.createFromBlockArray(
    //   pageBreak.contentBlocks,
    //   pageBreak.entityMap
    // );
    // console.log(pageBreakBlock);
    // pageCount = 1;
    // console.log(pageCount);
    const sel = newEditorState.getSelection()
    const newEditorStateWithBreaks = addPageBreaks(newEditorState);

    // if (measure > pageCount * page) {
    //   // console.log(pageCount);
    //   const endKey = newEditorState.getSelection().getEndKey();
    //   EditorState.moveFocusToEnd(newEditorState);
    //   let currentHTML = stateToHTML(newEditorState.getCurrentContent());
    //   currentHTML = currentHTML + '<p>PAGE BREAK</p><p>PAGE BREAK</p><p>PAGE BREAK</p><p>PAGE BREAK</p><p>PAGE BREAK</p><p>PAGE BREAK</p>';
    //   const contentState = stateFromHTML(currentHTML);
    //   newEditorState = EditorState.push(newEditorState, contentState, 'insert-fragment');
    //   const rawState = convertToRaw(newEditorState.getCurrentContent())
    //   console.log(pageCount);
    //   pageCount += 1;
    //   // this.setState({
    //   //   raw: convertToRaw(editorStateWithBreak.getCurrentContent()),
    //   //   local: {
    //   //     selection: editorStateWithBreak.getSelection()
    //   //   }
    //   // })
    //   // console.log(pageCount);
    // }
    // else if (pageCount > 0) {
      // else if (measure < page * pageCount - 1) {
      //   pageCount -= 1;
      //   console.log(pageCount);
      // }
    // }
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
          <BlockStyleControls
            editorState={withSelection}
            onToggle={this.toggleBlockType.bind(null, withSelection)}
          />
          {/* <InlineStyleControls
            editorState={withSelection}
            onToggle={this.toggleInlineStyle.bind(null, withSelection)}
          /> */}
          {/* <ReactPageDiv /> */}
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
