import MonacoEditor from '@monaco-editor/react';
import { useRef, useState } from 'react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './code-editor.css'
import codeShift from 'jscodeshift';
import MonacoJSXHighlighter from 'monaco-jsx-highlighter';
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";


interface CodeEditorProps {
    initialValue: string
    onChange(value: string): void
}






const CodeEditor : React.FC<CodeEditorProps> = ({initialValue, onChange}) => {

    const editorRef = useRef<any>();
    const [initialValues, setInitialValue] = useState(initialValue)



    const onEditorDidMount = (e: any) => {
        editorRef.current = e;
        console.log({e});
        onChange(e)
    }


    const onFormateClick = () => {
        console.log(editorRef.current);
        const unformatted = editorRef.current;
        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        }).replace(/\n$/, '')
        setInitialValue(formatted);
        // initialValue = formatted;
        console.log({initialValues});
    }
    
    return ( 

        <div className='editor-wrapper'>

            <button className='button button-format is-primary is-small' onClick={onFormateClick}>Format</button>

            <MonacoEditor
                onChange={onEditorDidMount}
                value={initialValues}
                theme={'vs-dark'} 
                language='javascript' 
                height="100%" 
                options={{
                    wordWrap: 'on',
                    minimap: { enabled: false},
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />

        </div>
    )
}


//     // Instantiate the highlighter
//     const monacoJSXHighlighter = new MonacoJSXHighlighter(
//         MonacoEditor, parse, traverse, CodeEditor
//     );

//     // Activate highlighting (debounceTime default: 100ms)
// monacoJSXHighlighter.highlightOnDidChangeModelContent(100);
// // Activate JSX commenting
// monacoJSXHighlighter.addJSXCommentCommand();

export default CodeEditor