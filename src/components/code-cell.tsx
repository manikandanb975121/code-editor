import { useState, useEffect, useRef } from 'react';
import './code-cell.css';
import * as esbuild from 'esbuild-wasm';
import Preview from './preview';
import CodeEditor from './code-editor';
import bundler from '../bundler';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useCumulativeCode } from '../hooks/use-cumulative-code';

interface CodeCellProps {
  cell: Cell
}


const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    // const [input, setInput] = useState('');
    // const [error, setError] = useState('');
    // const [code, setCode] = useState('');

    const { updateCell, createBundle } = useActions();
    const bundle = useTypedSelector((state) => state.bundles && state.bundles[cell.id] ? state.bundles[cell.id] : '' )
    console.log({bundle})
    const cumulativeCode = useCumulativeCode(cell.id)
    // const cumulativeCode = useTypedSelector((state) => {
    //   const showFunc = `
    //   import _React from 'react'
    //   import _ReactDOM from 'react-dom'

    //   var show = (value) => {
    //     const root = document.querySelector('#root')
    //     if (typeof(value) === 'object') {
    //       if (value.$$typeof && value.props) {
    //         _ReactDOM.render(value, root)
    //       } else {
    //         root.innerHTML = JSON.stringify(value);
    //       }
    //     } else {
    //       root.innerHTML = value;
    //     }
    //   }`
    //   const showFuncNoop = 'var show = () => {}'
    //   const cumulativeCode = [];
    //   if (state.cells) {
    //     const { data, order } = state.cells
    //     const orderedCells = order.map(id => data[id]);
    //     for(let c of orderedCells) {
    //       if (c.type === 'code') {
    //         if (c.id === cell.id) {
    //           cumulativeCode.push(showFunc)
    //         } else {
    //           cumulativeCode.push(showFuncNoop)
    //         }
    //         cumulativeCode.push(c.content)
    //       }
    //       if (c.id === cell.id) {
    //         break;
    //       }
    //     }
    //   }
    //   return cumulativeCode;
    // })

    console.log({cumulativeCode});

    useEffect(() => {

      if (!bundle) {
        createBundle(cell.id, cumulativeCode);
        return;
      }
      setTimeout(async () => {
        // const output = await bundler(cell.content);
        // setCode(output.code)
        // setError(output.err);
        createBundle(cell.id, cumulativeCode)
      }, 1000)
    }, [cumulativeCode, cell.id, createBundle])

    // useEffect(() => {
    //   setTimeout(async () => {
    //     const output = await bundler(cell.content);
    //     setCode(output.code)
    //     setError(output.err);
    //   }, 1000)
    // }, [cell.content])


//     useEffect(() => {
//     // This ugly code is to avoid calling initialize() more than once
//     try {
//       esbuild.build({});
//     } catch (error) {
//       if (error instanceof Error && error.message.includes('initialize')) {
//         esbuild.initialize({
//           worker: false,
//           // wasmURL: '/esbuild.wasm',
//           wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.48/esbuild.wasm',
//         });
//       } else {
//         throw error;
//       }
//     }
//   }, []);


    // const onClick = async () => {

    //     let output = await bundler(input)
    //     console.log({output});
    //     if (!output.length) {
    //       console.log(output);
    //       output = await bundler(input)
    //     }
    //     setCode(output)
    //     // esbuild
    //     //   .transform(input, {
    //     //     loader: 'jsx',
    //     //     target: 'es2015',
    //     //   })
    //     //   .then((result) => {
    //     //     setCode(result.code);
    //     //   });
    
    
    //     // iframe.current.srcDoc = html
    
    //     // esbuild.build({
    //     //   entryPoints: ['index.js'],
    //     //   bundle: true,
    //     //   write: false,
    //     //   plugins: [
    //     //     unpkgPathPlugin(), fetchPlugin(input)
    //     //   ],
    //     //   define: {
    //     //     'process.env.NODE_ENV': '"production"',
    //     //     global: 'window'
    //     //   }
    //     // }).then((result) => {
    //     //   console.log({result});
    //     //   setCode(result.outputFiles[0].text);
    //     //   // iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*')
    
    //     // })
    //   };


    return (
      <Resizable direction='vertical'>
        <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
          <Resizable direction='horizontal'>
          {/* <CodeEditor initialValue='const a = 1' onChange={(value) => setInput(value)} /> */}
            <CodeEditor initialValue={cell.content} onChange={(value) => updateCell(cell.id, value)} />
          {/* <textarea
            value={input}
            onChange={(e) =>
             { 
             setInput(e.target.value)
             }}></textarea> */}
          {/* <div>
            <button onClick={onClick}>Submit</button>
          </div> */}
          {/* <pre>{code}</pre> */}

    
          {/* <iframe title='priview' ref={iframe} sandbox='allow-scripts allow-modals' srcDoc={html} /> */}
          </Resizable>
          {/* <Preview code={code} err={error}/> */}
          <div className='progress-wrapper'>
          {!bundle || bundle.loading 
            ? <div className='progress-cover'>
                <progress className='progress is-small is-primary' max='100'>
                  Loading...
                </progress>
            </div> : <Preview code={bundle.code} err={bundle.err}/>
          }
          </div>
          {/* {bundle &&  <Preview code={bundle.code} err={bundle.err}/>} */}
        </div>

        

        

      </Resizable>
        
      );
}


export default CodeCell;