import { useState, useEffect } from "react";
import './Calculator.scss';
import StackCalculator from "./StackCalculator";
const keys =[
    '(',')','%', 'CE',
     '7','8','9','/',
     '4','5', '6', '*',
      '1', '2','3', '-',
      '0', '.', '=', '+',
];

const Calculator = (props) => {
    const [infix, setInfix]= useState('');
    const [answer, setAnswer]= useState('');
    const [result, setResult]= useState('');
    const [isFocus, setIsFocus]= useState(false);
  const handleSetPosFix =(item)=>{
    switch(item){
        case 'CE':
            handleRemove();
            return;
        case '=':
            handleCalculator(infix);
            return;
            default:
                break;
    }
        handleSetNumber(item);
  }
  const handleSetNumber =(item)=>{
    if((item>='0'&& item<=9) || item==='.'){
        setInfix(infix+item);
        return;
    }
    if(item ==='('){
        setInfix(infix+item+ ' ');
        return;
    }
    if(item ===')'){
        setInfix(infix+' '+item);
        return;
    }
    if(item ==='%'){
        setInfix(infix+' '+item);
        return;
    }
    setInfix(infix+' '+item+' ');
  }
  const handleRemove=()=>{
    let key = infix.at(infix.length-1);
    if(key>='0' && key<='9'){
        setInfix(infix.slice(0, -1));
    }else{
        setInfix(infix.slice(0, -2));
    }
  }
  const handleCalculator =(infix)=>{
    setAnswer(infix+ ' =')
    // tinh toan
    StackCalculator(infix, setAnswer, setInfix);
    //hien thi ket qua
  }
    return (
        <div className="calculator-container"
        >
            <div className="calculator-header">
                Hello from calculator
            </div>
            <div className="calculator-body">
                <div 
                className={isFocus ?'display focus':'display'}
                onClick={()=>setIsFocus(!isFocus)}
                >
                    <div className="answer">
                        <span>{answer}</span>
                    </div>
                    <div className="result">
                      <span>{infix}</span>
                    </div>
                </div>
                <div className="keys">

                   {
                    keys && keys.length>0 &&
                    keys.map((item, index)=>{
                        return <button 
                        className="key"
                        onClick={()=>handleSetPosFix(item)}
                        key={index}
                        >{item}</button>
                    })
                   } 
                </div>
                <div>

                </div>

            </div>
            <div className="calculator-footer">

            </div>
        </div>
    )
}
export default Calculator;